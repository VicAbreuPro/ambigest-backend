import { IsNumber } from "class-validator";

export class UpdateContractRequest{
    @IsNumber()
    value_per_m3: number;
}