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

	@Column({nullable: false})
	harga: number;

	@Column({nullable: false})
	diskon: number;

	@Column({nullable: false})
	tax: number;

	@Column({nullable: false})
	komisi: number;

	@Column({nullable: false})
	total: number;

}