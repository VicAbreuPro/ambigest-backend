import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { WaterContractEntity } from "./Entities/waterContract.entity";

@Injectable()
export class WaterContractsRepository {
    constructor(private dataSource: DataSource) {}

    getContractByUserId(userId: string): Promise<WaterContractEntity>{
        return this.dataSource.manager.findOne(WaterContractEntity, {
            where: {
                userId: userId
            },
        });
    }

    async createContract(contract: WaterContractEntity): Promise<WaterContractEntity>{
        var res = await this.dataSource.manager.insert(WaterContractEntity, contract);
        return this.getContractByUserId(contract.userId);
    }
}