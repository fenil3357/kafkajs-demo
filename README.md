# kafkajs-demo

## Overview

It is a simple demo project to understand the working of kafka with express servers. I have used *kafkajs* as a kafka client for nodejs and *kafdrop* to monitor kafka service.

## Set up

1) Clone the repo and install the deps.

```
git clone https://github.com/fenil3357/kafkajs-demo.git
cd kafkajs-demo

cd payment-service
npm i

cd user-service
npm i
```

2) Run the zookeeper, kafka and kafdrop using docker compose.

```
cd kafka
docker compose up
```

3) Once it is running run the *admin.js* file which will create *payment-topic* with two partitions

```
cd kafka
node admin.js
```

4) After creating the topic run the payment and user services

```
cd payment-service
npm start

cd user-service
npm start
```

5) Now trigger the api in payment service to see result

```
curl http://localhost:3000/proceed-payment?sender=Paul&receiver=Sam&amount=1000
```

You can see the event listened in the user service console. You can also monitor kafka through kafkdrop on port 9000.

```
# Kafka monitor
http://localhost:9000
```