import { kafka } from "../payment-service/client.js"

async function initiateKafka() {
  try {
    const admin = kafka.admin();
    await admin.createTopics({
      topics: [{
        topic: 'payment-topic',
        numPartitions: 2
      }]
    })
    console.log('Topic created.')
  } catch (error) {
    console.log("🚀 ~ initiateKafka ~ error:", error)
  }
}

initiateKafka();