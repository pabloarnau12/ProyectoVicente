const paypal = require('paypal-rest-sdk');
const connection = require('../config/db');

// Configurar PayPal SDK
paypal.configure({
    mode: 'sandbox', // Cambiar a 'live' en producción
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET,
  });
  
  // Crear el pago
  exports.createPayment = (req, res) => {
    const { cart, user } = req.body;
  
    // Convertir carrito al formato de PayPal
    const items = cart.map((product) => ({
      name: product.Nombre,
      sku: product.ID_Producto.toString(),
      price: parseFloat(product.Precio).toFixed(2), // Asegúrate de que el precio esté en formato de cadena con 2 decimales
      currency: 'EUR',
      quantity: product.quantity,
    }));

    const totalAmount = items.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0).toFixed(2);

    const createPaymentJson = {
      intent: 'sale',
      payer: { payment_method: 'paypal' },
      redirect_urls: {
        return_url: `${process.env.BASE_URL}/api/payments/success`,
        cancel_url: `${process.env.BASE_URL}/api/payments/cancel`,
      },
      transactions: [
        {
          item_list: { items },
          amount: {
            currency: 'EUR',
            total: totalAmount,
          },
          description: 'Compra en tu tienda online',
          custom: JSON.stringify({ ID_Establecimiento: cart[0].ID_Establecimiento, ID_Usuario: user.ID_Usuario, Direccion: user.Direccion }),
        },
      ],
    };
  
    // Crear el pago en PayPal
    paypal.payment.create(createPaymentJson, (error, payment) => {
      if (error) {
        console.error('Error al crear el pago:', error.response.details);
        return res.status(500).json({ message: 'Error al crear el pago' });
      }
  
      const approvalUrl = payment.links.find((link) => link.rel === 'approval_url').href;
      res.json({ approvalUrl }); // Enviar URL de aprobación al frontend
      // console.log(cart[0].ID_Establecimiento, user.ID_Usuario)
      // console.log(createPaymentJson)
    });
  };



  exports.paymentSuccess = (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
  
    const executePaymentJson = {
      payer_id: payerId,
    };
 
    paypal.payment.execute(paymentId, executePaymentJson, async (error, payment) => {
      if (error) {
        console.error('Error al completar el pago:', error);
        // return res.status(500).send('Error al completar el pago');
        return res.redirect(`${process.env.BASE_URL_FRONTEND}/home`)
      }
      
      try {
        const { transactions } = payment;
        const carritoData = JSON.stringify(transactions[0].item_list.items || []);
        const totalAmount = parseFloat(transactions[0].amount.total);
        const customData = JSON.parse(transactions[0].custom);
        const ID_Establecimiento = customData.ID_Establecimiento;
        const ID_Usuario = customData.ID_Usuario;
        const Estado_Pedido = 'Pendiente';
        const Direccion = customData.Direccion;
        console.log(Direccion);
        try {

          await connection.execute(
            `INSERT INTO pedidos (ID_Usuario, ID_Establecimiento, Estado_Pedido, total, productos, payment_id, Direccion) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [ID_Usuario, ID_Establecimiento, Estado_Pedido, totalAmount.toFixed(2), carritoData, paymentId, Direccion]
          );
        } catch (err) {
          console.error('Error al insertar el pedido:', err);
          res.status(500).send('Error al guardar el pedido en la base de datos');
        }

        res.redirect(`${process.env.BASE_URL_FRONTEND}/perfil`);
    } catch (err) {
        console.error('Error al guardar el pedido:', err);
        res.status(500).send('Error al guardar el pedido en la base de datos');
    }
    });
  };
  
  // Manejar cancelación del pago
  exports.paymentCancel = (req, res) => {
    res.redirect(`${process.env.BASE_URL_FRONTEND}/home`);
  };
  