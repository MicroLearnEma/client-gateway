import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { env, OrdersMicroservice } from 'src/config';

@Module({
  controllers: [OrdersController],
  imports: [
    ClientsModule.register([
      { name: OrdersMicroservice.name, transport: Transport.TCP, options: { port: env.ordersMicroservicePort, host: env.ordersMicroserviceHost}}
    ])
  ]
})
export class OrdersModule {}
