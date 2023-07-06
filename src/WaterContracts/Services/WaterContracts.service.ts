import { Injectable } from '@nestjs/common';
import { WaterContractsRepository } from '../Repository/WaterContracts.repository';
import { CreateContractRequest } from '../Dtos/create-contract.request';
import { UpdateContractRequest } from '../Dtos/update-contract.request';
import { WaterContractEntity } from '../Models/waterContract.entity';
import { UserService } from 'src/User/services/user.service';

@Injectable()
export class WaterContractService {
    constructor(private userService: UserService, private waterContractRepository: WaterContractsRepository){}

    async getContractByUserId(email: string): Promise<any>{
        const user = await this.userService.getUser(email);

        const contract = await this.waterContractRepository.getContractByUserId(user._id.toString());

        if(!contract){
            throw new Error("User does not have a contract.");
        }

        return contract;
    }

    async createContract(email: string, request: CreateContractRequest): Promise<WaterContractEntity>{
        const user = await this.userService.getUser(email);
        const checkUserContract = await this.waterContractRepository.getContractByUserId(user._id.toString());
        
        if(checkUserContract){
            throw new Error('User already has a contract');
        }

        let newContract = new WaterContractEntity(user._id.toString(), request.value_per_m3);
        
        return await this.waterContractRepository.upsertContract(newContract);
    }

    async updateContract(user_id: string, request: UpdateContractRequest): Promise<any>{
        const waterContract = await this.waterContractRepository.getContractByUserId(user_id);

        waterContract.value_per_m3 = request.value_per_m3;
        
        return await this.waterContractRepository.upsertContract(waterContract);
    }
}