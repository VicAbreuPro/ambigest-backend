import { IsNumber } from "class-validator";

export class CreateContractRequest{
    @IsNumber()
    value_per_m3: number;
}