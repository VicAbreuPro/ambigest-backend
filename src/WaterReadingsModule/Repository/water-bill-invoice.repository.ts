import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { WaterBillInvoiceEntity } from "../Models/water-bill-invoice.entity";
import { ObjectId } from "mongodb";

@Injectable()
export class WaterBillInvoiceRepository {
    constructor(private dataSource: DataSource) {}

    async createWaterBillInvoice(invoice: WaterBillInvoiceEntity): Promise<WaterBillInvoiceEntity>{
        const result = await this.dataSource.manager.save(WaterBillInvoiceEntity, invoice);

        return await this.dataSource.manager.findOne(WaterBillInvoiceEntity, {
            where: {
                _id: result._id
            }
        });
    }

    async getAllInvoices(user_id: string): Promise<WaterBillInvoiceEntity[]> {
        return await this.dataSource.manager.find(WaterBillInvoiceEntity, {
            select: ['consumption', 'increased_amount', 'billing_value', 'invoice_date'],
            order: {
                invoice_date: 'ASC'
            },
            where: {
                user_id
            }
        });
    }

    async getInvoiceByDate(user_id: string, date: Date): Promise<WaterBillInvoiceEntity> {
        return await this.dataSource.manager.findOne(WaterBillInvoiceEntity, {
            select: ['consumption', 'increased_amount', 'billing_value', 'invoice_date'],
            where: {
                user_id,
                invoice_date: date
            }
        });
    }

    async deleteInvoice(id: ObjectId): Promise<any>{
        return await this.dataSource.manager.delete(WaterBillInvoiceEntity, id);
    }
}