import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class HargaSewa extends BaseEntity {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({default: "product", type: 'enum', enum: ['product', 'paket']})
	type: "product" | "paket"

	@Column({nullable: true})
	product_id: string;

	@Column({nullable: true})
	paket_id: string;

	@Column({nullable: false})
	satuan_id:string;

	@Column({default: 0})
	harga: number;

	@Column({default: false})
	is_deleted: boolean;

}