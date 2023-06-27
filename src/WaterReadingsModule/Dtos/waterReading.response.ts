import { ObjectId } from "mongodb";

export class WaterReadingResponse{
    readonly id: ObjectId;
    readonly userId: string;
    readonly contractId: string;
    readonly amount: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}