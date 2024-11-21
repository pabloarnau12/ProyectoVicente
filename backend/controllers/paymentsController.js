const paypal = require('paypal-rest-sdk');


// Configurar PayPal SDK
paypal.configure({
    mode: 'sandbox', // Cambiar a 'live' en producción
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET,
  });
  
  // Crear el pago
  exports.createPayment = (req, res) => {
    const { cart } = req.body;
  
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
    });
  };



  exports.paymentSuccess = (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
  
    const executePaymentJson = {
      payer_id: payerId,
    };
  
    paypal.payment.execute(paymentId, executePaymentJson, (error, payment) => {
      if (error) {
        console.error('Error al completar el pago:', error);
        return res.status(500).send('Error al completar el pago');
      }
  
      console.log('Pago completado:', payment);
      res.json({ message: 'Pago completado con éxito', payment });
    });
  };
  
  // Manejar cancelación del pago
  exports.paymentCancel = (req, res) => {
    res.json({ message: 'El pago fue cancelado' });
  };
  