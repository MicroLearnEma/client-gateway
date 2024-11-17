import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, ParseUUIDPipe } from '@nestjs/common';
import { OrdersMicroservice } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { CreateOrderDto, OrderPaginationDto } from './dto';
import { StatusDto } from './dto/status.dto';
import { PaginationDto } from 'src/common';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(OrdersMicroservice.name) private readonly ordersClient: ClientProxy) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send(OrdersMicroservice.Actions.CREATE, createOrderDto).pipe(
      catchError(e => {throw new RpcException(e)})
    );
  }

  @Get()
  findAll(@Query() paginationDto: OrderPaginationDto) {
    return this.ordersClient.send(OrdersMicroservice.Actions.FIND_ALL, paginationDto).pipe(
      catchError(e => {throw new RpcException(e)})
    );
  }

  @Get('id/:id')  
  findOne(@Param('id') id: string) {
    return this.ordersClient.send(OrdersMicroservice.Actions.FIND_ONE, id).pipe(
      catchError(e => {throw new RpcException(e)})
    );
  }

  @Get(':status')  
  findByStatus(@Param() statusDto: StatusDto, @Query() paginationDto: PaginationDto) {
    return this.ordersClient.send(OrdersMicroservice.Actions.FIND_ALL, {
      status: statusDto.status,
      ...paginationDto,
    }).pipe(
      catchError(e => {throw new RpcException(e)})
    );
  }

  @Patch(':id')
  changeOrderStatus(@Param('id', ParseUUIDPipe) id: string, @Body() statusDto: StatusDto){
    return this.ordersClient.send(OrdersMicroservice.Actions.CHANGE_STATUS, {
      id,
      status:statusDto.status
    }).pipe(
      catchError(e => {throw new RpcException(e)})
    );
  }

}
