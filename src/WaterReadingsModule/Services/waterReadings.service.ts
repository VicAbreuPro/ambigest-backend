import { Inject, Injectable } from '@nestjs/common';
import { WaterReadingsRepository } from '../Repository/waterReadings.repository';
import { UserService } from 'src/User/services/user.service';
import { WaterReadingEntity } from '../Models/WaterReading.entity';
import { WaterContractService } from 'src/WaterContracts/Services/WaterContracts.service';
import { WaterBillInvoiceEntity } from '../Models/water-bill-invoice.entity';
import { WaterBillInvoiceRepository } from '../Repository/water-bill-invoice.repository';

@Injectable()
export class WaterReadingsService {
    constructor(private waterBillInvoiceRepository: WaterBillInvoiceRepository,private waterReadingsRepository: WaterReadingsRepository){}

    @Inject()
    private readonly userService: UserService;

    @Inject()
    private readonly waterContractService: WaterContractService;

    async getWaterReadingsByUserFirebaseId(user_firebase_id: string): Promise<WaterReadingEntity[]>{
        const user = await this.userService.getUserByFirebaseId(user_firebase_id);

        return await this.getWaterReadingsByUserId(user._id.toString());
    }

    async getWaterReadingsByUserId(user_id: string): Promise<WaterReadingEntity[]>{
        return await this.waterReadingsRepository.getAllReadingsByUserId(user_id);
    }

    async createReading(user_firebase_id: string, amount: number, date: Date): Promise<any>{
        const user = await this.userService.getUserByFirebaseId(user_firebase_id);
        const checkWaterReadings = await this.waterReadingsRepository.getAllReadingsByUserId(user._id.toString());
        const lastReading = checkWaterReadings[checkWaterReadings.length - 1];

        let dateOfLasteReading = new Date(lastReading.reading_date);
        let inputDate = new Date(date);

        if(dateOfLasteReading.getFullYear() > inputDate.getFullYear() || dateOfLasteReading.getFullYear() == inputDate.getFullYear() && dateOfLasteReading.getMonth() + 1 > inputDate.getMonth() +1 ){
            throw new Error("The new water reading date must be after than the last water reading.");
        }

        if(checkWaterReadings){            
            checkWaterReadings.forEach(reading => {
                let readingDate = new Date(reading.reading_date);

                if(readingDate.getFullYear() == inputDate.getFullYear() && readingDate.getMonth() + 1 == inputDate.getMonth() + 1){
                    throw new Error("User already registered a reading this month.");
                }
            });
        }

        const invoice = await this.createInvoice(user._id.toString(), amount, date);
        
        if( ! invoice ){
            throw new Error('Error on creating invoice from this water-reading');
        }

        const waterReading = new WaterReadingEntity(user._id.toString(), amount, date);

        return await this.waterReadingsRepository.upsertWaterReading(waterReading);
    }

    async deleteReading(reading_id: string, user_firebase_id: string): Promise<any>{
        const user = await this.userService.getUserByFirebaseId(user_firebase_id);

        const waterReading = await this.waterReadingsRepository.getUserWaterReading(reading_id, user._id.toString());

        if(! waterReading){
            throw new Error("Water reading not found!")
        }

        const invoice = await this.waterBillInvoiceRepository.getInvoiceByDate(user._id.toString(), waterReading.reading_date);
        
        await await this.waterBillInvoiceRepository.deleteInvoice(invoice._id)

        return await this.waterReadingsRepository.deleteWaterReading(waterReading);
    }

    async createInvoice(user_id: string, current_month_amount_consumption: number, date: Date): Promise<WaterBillInvoiceEntity>{
        const userContract = await this.waterContractService.getContractByUserId(user_id);
        const waterReadings = await this.getWaterReadingsByUserId(user_id);

        let inputDateObject: Date = new Date(date);
        let increased_amount: number = 0;

        // Calculate increase_amount according last month
        if(waterReadings.length > 0){
            waterReadings.forEach(reading => {
                let readingDateObject = new Date(reading.reading_date);
    
                if(readingDateObject.getFullYear() == inputDateObject.getFullYear() - 1 && readingDateObject.getMonth() + 1 == 12 && inputDateObject.getMonth() + 1 == 1){
                    increased_amount = ( current_month_amount_consumption - reading.amount)
                }
    
                if(readingDateObject.getFullYear() == inputDateObject.getFullYear() && readingDateObject.getMonth() + 1 == inputDateObject.getMonth()){
                    increased_amount = ( current_month_amount_consumption - reading.amount );
                }
            });
        }

        // Calculate billing_value
        let billing_value: number = userContract.value_per_m3 * current_month_amount_consumption;

        const invoice = new WaterBillInvoiceEntity(user_id, current_month_amount_consumption, increased_amount, billing_value, date);

        return await this.waterBillInvoiceRepository.createWaterBillInvoice(invoice);
    }

    async getInvoicesByUser(user_firebase_id: string): Promise<WaterBillInvoiceEntity[]> {
        const user = await this.userService.getUserByFirebaseId(user_firebase_id);

        return await this.waterBillInvoiceRepository.getAllInvoices(user._id.toString());
    }
}