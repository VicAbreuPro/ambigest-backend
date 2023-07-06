import { IsNotEmpty } from "class-validator";

export class CreateWasteCollectionRequestDto{    
    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    latitude: number;
    
    @IsNotEmpty()
    longitude: number;

    @IsNotEmpty()
    pickup_at: Date;

    @IsNotEmpty()
    time_of_day: string;
}