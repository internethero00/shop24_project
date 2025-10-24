import { IsString } from 'class-validator'

export class ColorDto {
    @IsString({
        message: 'name have to be string',
    })
    name: string

    @IsString({
        message: 'value have to be string',
    })
    value: string
}