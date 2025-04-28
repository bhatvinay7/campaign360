import amqp from 'amqplib'
import dotenv from 'dotenv'
dotenv.config()
let connection:any=null 
let channel:any=null
async function connectToRabbitMQ() {
  try {
    if (!connection) {
        connection = await amqp.connect(process.env.URL!);
        channel = await connection.createChannel();
        const queue: string = 'notificationQueue';
        await channel.assertQueue(queue, { durable: true });
        await channel.assertExchange('notification_exchange', 'direct', { durable: true });

        await channel.bindQueue(queue, 'notification_exchange', 'message');
    }
    console.log('Connected to RabbitMQ and channel created.')
    
    // Ensure the queue exists before using it
//     const queue = 'notificationQueue';
//     await channel.assertQueue(queue, { durable: true });
// return  
return channel 

    // Example: Sending a message to the queue
    // const message = 'Hello, RabbitMQ!';
    // channel.sendToQueue(queue, Buffer.from(message));
    // console.log(`Message sent: ${message}`);

    // // Example: Consuming messages from the queue
    // channel.consume(queue, (msg) => {
    //   if (msg !== null) {
    //     console.log(`Received message: ${msg.content.toString()}`);
    //     channel.ack(msg);
    //   }
    // });
  } catch (error:any) {
    console.error('Error connecting to RabbitMQ:', error.message);
  }
}


export default connectToRabbitMQ;
