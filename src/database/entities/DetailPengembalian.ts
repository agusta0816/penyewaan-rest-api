import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class DetailPengembalian extends BaseEntity {

	@PrimaryGeneratedColumn('increment')
	id: bigint;

	@Column({nullable: false})
	pinjaman_id: bigint;

	@Column({nullable: false})
	pengembalian_id: bigint;

	@Column({nullable: false})
	product_id: string;

	@Column({nullable: false})
	paket_id: string;

}