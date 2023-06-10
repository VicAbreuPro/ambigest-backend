import { IsNumber, IsNotEmpty } from "class-validator";

export class CreateReadingRequest{
    @IsNotEmpty()
    readonly userId: string;
    
    @IsNumber()
    readonly amount: number;
}