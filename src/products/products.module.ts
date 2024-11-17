import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { env, ProductsMicroservice } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      { 
        name: ProductsMicroservice.name, 
        transport: Transport.TCP,
        options: {
          host: env.productsMicroserviceHost,
          port: env.productsMicroservicePort
        }
      }
    ])
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
