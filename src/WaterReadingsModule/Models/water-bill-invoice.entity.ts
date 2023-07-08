import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectId } from 'mongodb'

@Entity()
export class WaterBillInvoiceEntity {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    user_id: string;

    @Column()
    consumption: number;

    @Column()
    increased_amount: number;

    @Column()
    billing_value: number;

    @Column()
    invoice_date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor(user_id: string, consumption: number, increased_amount: number, billing_value: number, invoice_date: Date) {
        this.user_id = user_id;
        this.consumption = consumption;
        this.increased_amount = increased_amount;
        this.billing_value = billing_value;
        this.invoice_date = invoice_date;
    };
}
