import { IsNotEmpty } from "class-validator";


export class GetReadingsRequest{
    @IsNotEmpty()
    userId: string
}