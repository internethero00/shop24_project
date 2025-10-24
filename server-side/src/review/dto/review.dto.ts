import {IsNotEmpty, IsNumber, IsString, Max, Min} from "class-validator";

export class ReviewDto {
    @IsString({
        message: 'text have to be string',
    })
    @IsNotEmpty({
        message: 'text have to be not empty',
    })
    text: string

    @IsNumber({}, {
        message: 'rating have to be number'})
    @Min(1, {
        message: 'rating have to be more than 1'})
    @Max(5, {message: 'rating have to be less than 5'})
    @IsNotEmpty({
        message: 'rating have to be not empty',
    })
    rating: number
}