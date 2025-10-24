import { IsString } from 'class-validator'

export class CategoryDto {
    @IsString({
        message: 'title have to be string',
    })
    title: string

    @IsString({
        message: 'description have to be string',
    })
    description: string
}