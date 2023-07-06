import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { WaterContractEntity } from "../Models/waterContract.entity";

@Injectable()
export class WaterContractsRepository {
    constructor(private dataSource: DataSource) {}

    getContractByUserId(user_id: string): Promise<WaterContractEntity>{
        return this.dataSource.manager.findOne(WaterContractEntity, {
            where: {
                user_id: user_id
            },
        });
    }

    async upsertContract(contract: WaterContractEntity): Promise<WaterContractEntity>{
        let result = await this.dataSource.manager.save(WaterContractEntity, contract);

        return await this.dataSource.manager.findOne(WaterContractEntity, {
            where: {
                _id: result._id
            }
        });
    }
}