import { Kafka } from 'kafkajs'

export const kafka = new Kafka({
  clientId: 'payment-app',
  brokers: ['localhost:29092']
})