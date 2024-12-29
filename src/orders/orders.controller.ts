import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, ParseUUIDPipe } from '@nestjs/common';
import { OrdersMicroservice } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { CreateOrderDto, OrderPaginationDto } from './dto';
import { StatusDto } from './dto/status.dto';
import { PaginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/transports/nats/injection-token';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(NATS_SERVICE) private readonly messageClient: ClientProxy) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.messageClient.send(OrdersMicroservice.Actions.CREATE, createOrderDto).pipe(
      catchError(e => {throw new RpcException(e)})
    );
  }

  @Get()
  findAll(@Query() paginationDto: OrderPaginationDto) {
    return this.messageClient.send(OrdersMicroservice.Actions.FIND_ALL, paginationDto).pipe(
      catchError(e => {throw new RpcException(e)})
    );
  }

  @Get('id/:id')  
  findOne(@Param('id') id: string) {
    return this.messageClient.send(OrdersMicroservice.Actions.FIND_ONE, id).pipe(
      catchError(e => {throw new RpcException(e)})
    );
  }

  @Get(':status')  
  findByStatus(@Param() statusDto: StatusDto, @Query() paginationDto: PaginationDto) {
    return this.messageClient.send(OrdersMicroservice.Actions.FIND_ALL, {
      status: statusDto.status,
      ...paginationDto,
    }).pipe(
      catchError(e => {throw new RpcException(e)})
    );
  }

  @Patch(':id')
  changeOrderStatus(@Param('id', ParseUUIDPipe) id: string, @Body() statusDto: StatusDto){
    return this.messageClient.send(OrdersMicroservice.Actions.CHANGE_STATUS, {
      id,
      status:statusDto.status
    }).pipe(
      catchError(e => {throw new RpcException(e)})
    );
  }

}
