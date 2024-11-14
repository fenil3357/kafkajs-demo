import express from "express";

import { kafka } from './client.js'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const producer = kafka.producer();

const initProducer = async () => {
  await producer.connect()
  console.log("Producer connected")
}

app.get('/', (req, res) => res.send('Hello from the payment service.'));

app.get('/proceed-payment', async (req, res) => {
  try {
    const { sender, receiver, amount } = req?.query;
    const timestamp = new Date().toLocaleString();
    if (!sender || !receiver || !amount) return res.status(400).json({ message: 'bad request' });

    await producer.send({
      topic: 'payment-topic',
      messages: [
        // Message for sender - amount deducted
        {
          key: sender,
          value: JSON.stringify({
            user: sender,
            transaction: 'deducted',
            amount,
            timestamp
          }),
          partition: 0 // Partition for sender
        },
        // Message for receiver - amount received
        {
          key: receiver,
          value: JSON.stringify({
            user: receiver,
            transaction: 'received',
            amount,
            timestamp
          }),
          partition: 1 // Partition for receiver
        }
      ]
    });

    return res.json({
      message: 'Payment successful.',
      data: {
        sender,
        receiver,
        amount,
        timestamp
      }
    });
  } catch (error) {
    console.log("🚀 ~ proceed payment ~ error:", error)
    return res.status(500).json({ message: 'something went wrong' });
  }
})

app.listen(3000, async () => {
  try {
    await initProducer();
    console.log('Payment service server is running on port 3000');
  } catch (error) {
    console.log("🚀 ~ app.listen ~ error:", error)
  }
});