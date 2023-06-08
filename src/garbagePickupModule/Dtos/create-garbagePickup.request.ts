import { Double } from "typeorm";

export class CreateGarbagePickupRequestDto{
    readonly type: string;
    readonly latitude: Double;
    readonly longitude: Double;
    readonly pickupDate: Date;
}