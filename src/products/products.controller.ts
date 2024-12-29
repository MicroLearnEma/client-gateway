import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { ProductsMicroservice } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NATS_SERVICE } from 'src/transports/nats/injection-token';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_SERVICE) private readonly messageClient: ClientProxy) {}

  @Post()
  createProduct(@Body() productsDto: CreateProductDto){
    return this.messageClient.send<any, CreateProductDto>(ProductsMicroservice.Actions.CREATE, productsDto)
      .pipe(catchError(e => { throw new RpcException(e)}));
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto){
      return this.messageClient.send<any, PaginationDto>(ProductsMicroservice.Actions.FIND_ALL, paginationDto)
        .pipe(catchError(e => { throw new RpcException(e)}))
  }

  @Get(':id')
  async findOne(@Param('id') id: string){
    return this.messageClient.send(ProductsMicroservice.Actions.FIND_ONE,{id})
      .pipe(catchError(e => { throw new RpcException(e)}));
  }

  @Delete(':id')
  delete(@Param('id') id: string){
    return this.messageClient.send(ProductsMicroservice.Actions.DELETE, {id})
      .pipe(catchError(e => { throw new RpcException(e)}));
  }

  @Patch(':id')
  patch(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProductDto){
    return this.messageClient.send<any>(ProductsMicroservice.Actions.UPDATE, {...body, id})
      .pipe(catchError(e => { throw new RpcException(e)}));
  }
}
