import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Paket extends BaseEntity {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({nullable: false, length: 255, unique: true})
	paket_kode: string;

	@Column({nullable: false, length: 255})
	paket_name: string;

	@Column({nullable: true, length: 255})
	sub_paket_name: string;

	@Column({nullable: false})
	product_id: string;

	@Column({nullable: false})
	category_id: string;

	@Column({nullable: false})
	company_id: string;

	@Column({default: false})
	is_deleted: boolean;

	@CreateDateColumn({type: 'timestamp', default: () => "CURRENT_TIMESTAMP(6)"})
	createdAt: Date;

}