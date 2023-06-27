import { IsNotEmpty } from "class-validator";

export class DeleteEventByIdDto {
    @IsNotEmpty()
    readonly eventId: string;
}