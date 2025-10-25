import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {YooCheckout} from '@a2seven/yoo-checkout'
import process from "node:process";
import {OrderDto} from "./dto/order.dto";

const checkout = new YooCheckout({
    shopId: process.env.YOOKASSA_SHOP_ID || '',
    secretKey: process.env.YOOKASSA_SECRET_KEY || '',

})

@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService) {
    }

    async createPayment(dto: OrderDto, userId: string) {
        const orderItems = dto.items.map(item => ({
            quantity: item.quantity,
            price: item.price,
            product: {
                connect: {
                    id: item.productId
                }
            },
            store: {
                connect: {
                    id: item.storeId
                }
            },

        }))

        const total = dto.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
        const order = await this.prisma.order.create({
            data: {
                status: dto.status,
                items: {
                    create: orderItems
                },
                total,
                user: {
                    connect: {
                        id: userId
                    }
                }

            }
        })

        const payment = await checkout.createPayment({
            amount: {
                value: total.toFixed(2),
                currency: 'RUB'
            },
            payment_method_data: {
                type: 'bank_card'
            },
            confirmation: {
                type: 'redirect',
                return_url: `${process.env.CLIENT_URL}/thanks`,
            },
            description: `Payment for order #${order.id}`,
        })
        return payment

    }
}
