import express from "express";

import { kafka } from "./client.js";

const consumer = kafka.consumer({
  groupId: 'consumer-group',
});

const initConsumers = async () => {
  await consumer.connect();

  await consumer.subscribe({
    topic: 'payment-topic'
  })

  await consumer.run({
    eachMessage: async ({ message, partition, topic }) => {
      console.log('\n\n')
      console.log('< =====   NEW MESSAGE RECEIVED   ===== >\n');
      console.log('Topic     : ', topic)
      console.log('Key   : ', message.key.toString());
      console.log('value   : ', JSON.parse(message.value.toString()));
      console.log('Partition : ', partition)
      console.log('\n< =====   END   ===== >');
      console.log('\n\n')
    }
  })
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello from the user service.'));

app.listen(3001, async () => {
  try {
    await initConsumers();
    console.log('User service server is running on port 3001');
  } catch (error) {
    console.log("🚀 ~ app.listen ~ error:", error)
  }
});