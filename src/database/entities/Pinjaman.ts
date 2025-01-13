import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Pinjaman extends BaseEntity {

	@PrimaryGeneratedColumn('increment', {type: 'bigint'})
	id: number;

	@Column({nullable: false, unique: true})
	pinjam_kode: string;

	@CreateDateColumn({type: 'timestamp', precision: 0, default: () => 'CURRENT_TIMESTAMP'})
	order_date: Date;

	@Column({nullable: false})
	customer_id: string;

	@Column({nullable: false})
	company_id: string;

	@Column({nullable: false})
	total_order: number;

	@Column({nullable: false})
	total_ppn: number;

	@Column({nullable: false})
	diskon: number;

	@Column({nullable: false})
	total_diskon: number;

	@Column({nullable: false})
	biaya_pengiriman: number;

	@Column({nullable: false})
	grand_total: number;

	@Column({default: "in-progress", type: 'enum', enum: ['in-progress', 'payment-received', 'payment-failed', 'confirmed', 'in-delivery', 'completed', 'canceled', 'closed']})
	status_order: 'in-progress' | 'payment-received' | 'payment-failed' | 'confirmed' | 'in-delivery' | 'completed' | 'canceled' | 'closed';

}