import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateReadingRequest{    
    @IsNumber({}, {
        message: 'amount'
    })
    amount: number;

    @IsNotEmpty()
    _id: string
}