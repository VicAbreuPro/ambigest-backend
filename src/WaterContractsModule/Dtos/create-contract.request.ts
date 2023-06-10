import { IsNumber, IsNotEmpty } from "class-validator";

export class CreateContractRequest{
    @IsNotEmpty()
    readonly userId: string;
    @IsNumber()
    readonly valuePerM3: number;
}