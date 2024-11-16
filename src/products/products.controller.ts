import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { ProductsMSActions, Services } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject(Services.PRODUCTS_MS) private readonly produsctsClient: ClientProxy) {}

  @Post()
  createProduct(@Body() productsDto: CreateProductDto){
    return this.produsctsClient.send<any, CreateProductDto>(ProductsMSActions.CREATE, productsDto)
      .pipe(catchError(e => { throw new RpcException(e)}));
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto){
      return this.produsctsClient.send<any, PaginationDto>(ProductsMSActions.FIND_ALL, paginationDto)
        .pipe(catchError(e => { throw new RpcException(e)}))
  }

  @Get(':id')
  async findOne(@Param('id') id: string){
    return this.produsctsClient.send(ProductsMSActions.FIND_ONE,{id})
      .pipe(catchError(e => { throw new RpcException(e)}));
  }

  @Delete(':id')
  delete(@Param('id') id: string){
    return this.produsctsClient.send(ProductsMSActions.DELETE, {id})
      .pipe(catchError(e => { throw new RpcException(e)}));
  }

  @Patch(':id')
  patch(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProductDto){
    return this.produsctsClient.send<any>(ProductsMSActions.UPDATE, {...body, id})
      .pipe(catchError(e => { throw new RpcException(e)}));
  }
}
