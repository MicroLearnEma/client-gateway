import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { env, Services } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      { 
        name: Services.PRODUCTS_MS, 
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
