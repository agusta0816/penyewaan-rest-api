import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class DetailPengembalian extends BaseEntity {

	@PrimaryGeneratedColumn('increment', {type: 'bigint'})
	id: number;

	@Column({nullable: false})
	pinjaman_id: number;

	@Column({nullable: false})
	pengembalian_id: number;

	@Column({nullable: false})
	product_id: string;

	@Column({nullable: false})
	paket_id: string;

}