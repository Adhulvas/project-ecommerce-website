import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handlePayment = async (req,res)=>{
  try {
    const { items } = req.body

    const lineItems = items.map((item)=>({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.productDescription,
          images: [item.image]
        },
        unit_amount: parseInt(item.price.replace(/,/g, "")) * 100,
      },
      quantity:item.quantity
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`
    })


    res.json({ url: session.url })
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ error: error.message })
  }
}