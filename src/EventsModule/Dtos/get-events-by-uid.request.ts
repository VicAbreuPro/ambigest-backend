import { IsNumber, IsNotEmpty, IsDate } from "class-validator";
import { ObjectId } from "mongodb";


export class getEventsByUserId{
    @IsNotEmpty()
    readonly userId: ObjectId
}