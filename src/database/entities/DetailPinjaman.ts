import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class DetailPinjaman extends BaseEntity {

	@PrimaryGeneratedColumn('increment', {type: 'bigint'})
	id: number;

	@Column({nullable: false})
	pinjaman_id: number;

	@Column({nullable: false})
	product_id: string;

	@Column({nullable: false})
	paket_id: string;

	@Column({default: "product", type: 'enum', enum: ['product', 'paket']})
	type: "product" | "paket"

	@Column({nullable: false, default: 0})
	harga: number;

	@Column({nullable: false, default: 0})
	diskon: number;

	@Column({nullable: false, default: 0})
	tax: number;

	@Column({nullable: false, default: 0})
	komisi: number;

	@Column({nullable: false, default: 0})
	total: number;

}