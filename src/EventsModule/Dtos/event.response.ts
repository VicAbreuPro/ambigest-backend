import { ObjectId } from "mongodb";

export class EventResponse{
  readonly id: ObjectId;
  readonly userId: ObjectId;
  readonly type: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly pickupAt: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}