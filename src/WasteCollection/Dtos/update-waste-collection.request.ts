import { IsNotEmpty } from "class-validator";

export class UpdateWasteCollectionRequestDto{
    @IsNotEmpty()
    id: string;
    
    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    pickup_at: Date;

    @IsNotEmpty()
    time_of_day: string;
}