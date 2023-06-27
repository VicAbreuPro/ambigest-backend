import { IsNumber, IsNotEmpty, IsDate } from "class-validator";
import { ObjectId } from "mongodb";

export class UpdateEventRequestDto{
    @IsNotEmpty()
    readonly eventId: string;
    
    @IsNotEmpty()
    readonly type: string;

    @IsNumber()
    readonly latitude: number;
    
    @IsNumber()
    readonly longitude: number;

    @IsNotEmpty()
    readonly pickupAt: Date;
}