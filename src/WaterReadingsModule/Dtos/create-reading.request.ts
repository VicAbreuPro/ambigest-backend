import { IsNumber, IsDate } from "class-validator";
import { Type } from 'class-transformer';

export class CreateReadingRequest{    
    @IsNumber()
    amount: number;

    @Type(() => Date)
    @IsDate({
        message: 'reading_date must be a valid date and must be in YYYY-MM-DD format!'
    })
    reading_date: Date;
}