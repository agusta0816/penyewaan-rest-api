import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class StatusPinjaman extends BaseEntity {

	@PrimaryGeneratedColumn('increment', {type: 'bigint'})
	id: number;

	@Column({nullable: false})
	pinjaman_id: number;

	@Column({default: "in-progress", type: 'enum', enum: ['in-progress', 'payment-received', 'payment-failed', 'confirmed', 'in-delivery', 'completed', 'canceled', 'closed']})
	status_order: 'in-progress' | 'payment-received' | 'payment-failed' | 'confirmed' | 'in-delivery' | 'completed' | 'canceled' | 'closed';

	@CreateDateColumn({type: 'timestamp', precision: 0, default: () => 'CURRENT_TIMESTAMP'})
	status_update: Date;

	@Column({default: "system", type: 'enum', enum: ['customer', 'system']})
	status_update_by: 'customer' | 'system';

}