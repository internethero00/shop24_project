import {Body, Controller, HttpCode, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import { OrderService } from './order.service';
import {Auth} from "../auth/decorators/auth.decorator";
import {OrderDto} from "./dto/order.dto";
import {CurrentUser} from "../user/decorators/user.decorator";
import {PaymentStatusDto} from "./dto/payment-status.dto";

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post('place')
  async checkout(
      @CurrentUser('id') userId: string,
      @Body() dto: OrderDto
  ) {
    return this.orderService.createPayment(dto, userId)
  }


  @HttpCode(200)
  @Post('status')
  async updateStatus(
      @Body() dto: PaymentStatusDto,
  ) {
    return this.orderService.updateStatus(dto)
  }
}
