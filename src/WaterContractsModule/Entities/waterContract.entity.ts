import { Column, ObjectIdColumn, ObjectId, Entity } from 'typeorm';
import { WaterContractResponseDto } from '../Dtos/water-contract.response';

@Entity()
export class WaterContractEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  userId: string;

  @Column()
  valuePerM3: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  toWaterContractResponseDto(): WaterContractResponseDto {
    const output: WaterContractResponseDto = {
      id: this.id,
      userId: this.userId,
      valuePerM3: this.valuePerM3,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };

    return output;
  }
}