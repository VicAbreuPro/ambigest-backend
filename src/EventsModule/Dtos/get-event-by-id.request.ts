import { IsNotEmpty } from "class-validator";
import { ObjectId } from "mongodb";

export class GetEventById {

    @IsNotEmpty()
    readonly eventId: string
}