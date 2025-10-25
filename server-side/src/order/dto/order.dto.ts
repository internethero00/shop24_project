import {IsOptional, IsEnum, IsArray, ValidateNested, IsNumber, IsString} from "class-validator";

import {Type} from "class-transformer";
import {$Enums} from "../../../generated/prisma";
import EnumOrderStatus = $Enums.EnumOrderStatus;

export class OrderDto {
    @IsOptional()
    @IsEnum(EnumOrderStatus, {message: 'Status is required'})
    status: EnumOrderStatus;

    @IsArray({
        message: 'there is no products',
    })
    @ValidateNested({each: true})
    @Type(() => OrderItemDto)
    items: OrderItemDto[]
}

export class OrderItemDto {
    @IsNumber({}, {
        message: 'quantity have to be number',
    })
    quantity: number;

    @IsNumber({}, {
        message: 'price have to be number',
    })
    price: number;

    @IsString({
        message: 'productId have to be string',
    })
    productId: string;

    @IsString({
        message: 'storeId have to be string',
    })
    storeId: string;
}