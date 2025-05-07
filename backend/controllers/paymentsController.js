const paypal = require("paypal-rest-sdk");
const connection = require("../config/db");

paypal.configure({
  mode: "sandbox",
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

exports.createPayment = (req, res) => {
  const { cart, user } = req.body;

  const items = cart.map((product) => ({
    name: product.Nombre,
    sku: product.ID_Producto.toString(),
    price: parseFloat(product.Precio).toFixed(2),
    currency: "EUR",
    quantity: product.quantity,
  }));

  const totalAmount = items
    .reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2);

  const createPaymentJson = {
    intent: "sale",
    payer: { payment_method: "paypal" },
    redirect_urls: {
      return_url: `${process.env.BASE_URL}/api/payments/success`,
      cancel_url: `${process.env.BASE_URL}/api/payments/cancel`,
    },
    transactions: [
      {
        item_list: { items },
        amount: {
          currency: "EUR",
          total: totalAmount,
        },
        description: "Compra en tu tienda online",
        custom: JSON.stringify({
          ID_Establecimiento: cart[0].ID_Establecimiento,
          ID_Usuario: user.ID_Usuario,
          Direccion: user.Direccion,
        }),
      },
    ],
  };

  paypal.payment.create(createPaymentJson, (error, payment) => {
    if (error) {
      console.error("Error al crear el pago:", error.response.details);
      return res.status(500).json({ message: "Error al crear el pago" });
    }

    const approvalUrl = payment.links.find(
      (link) => link.rel === "approval_url"
    ).href;
    res.json({ approvalUrl });
  });
};

exports.paymentSuccess = (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const executePaymentJson = {
    payer_id: payerId,
  };

  paypal.payment.execute(
    paymentId,
    executePaymentJson,
    async (error, payment) => {
      if (error) {
        console.error("Error al completar el pago:", error);
        return res.redirect(`${process.env.BASE_URL_FRONTEND}/home`);
      }

      try {
        const { transactions } = payment;
        const carritoData = transactions[0].item_list.items || [];
        const totalAmount = parseFloat(transactions[0].amount.total);
        const customData = JSON.parse(transactions[0].custom);
        const ID_Establecimiento = customData.ID_Establecimiento;
        const ID_Usuario = customData.ID_Usuario;
        const Estado_Pedido = "Pendiente";
        const Direccion = customData.Direccion;
        try {
          await connection.execute(
            `INSERT INTO pedidos (ID_Usuario, ID_Establecimiento, Estado_Pedido, total, productos, payment_id, Direccion) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
              ID_Usuario,
              ID_Establecimiento,
              Estado_Pedido,
              totalAmount.toFixed(2),
              JSON.stringify(carritoData),
              paymentId,
              Direccion,
            ]
          );
          for (const producto of carritoData) {
            const { sku, quantity } = producto;
            if (!sku || !quantity) {
              console.error("Producto inválido:", producto);
              continue;
            }
            await connection.execute(
              `UPDATE productos SET Disponibilidad = Disponibilidad - ? WHERE ID_Producto = ?`,
              [quantity, sku]
            );
          }
        } catch (err) {
          console.error("Error al insertar el pedido:", err);
          res
            .status(500)
            .send("Error al guardar el pedido en la base de datos");
        }

        res.redirect(`${process.env.BASE_URL_FRONTEND}/perfil`);
      } catch (err) {
        console.error("Error al guardar el pedido:", err);
        res.status(500).send("Error al guardar el pedido en la base de datos");
      }
    }
  );
};

exports.paymentCancel = (req, res) => {
  res.redirect(`${process.env.BASE_URL_FRONTEND}/home`);
};
