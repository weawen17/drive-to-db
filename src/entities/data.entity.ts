// src/entities/data.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('excel_data')
export class ExcelData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'product' })
  product: string;

  @Column({ name: 'price' })
  price: number;

  @Column({ name: 'discount', nullable: true })
  discount: number;

  @Column({ name: 'price_per_unit'})
  pricePerUnit: number;
}