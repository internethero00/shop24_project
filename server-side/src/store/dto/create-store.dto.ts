import { IsString } from 'class-validator'

export class CreateStoreDto {
    @IsString({
        message: 'name have to be string',
    })
    title: string
}