import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Pengembalian extends BaseEntity {

	@PrimaryGeneratedColumn('increment')
	id: bigint;

	@Column({nullable: false, unique: true})
	pinjaman_id: bigint;

	@Column({nullable: false, unique: true})
	pengembalian_kode: string;

	@CreateDateColumn({type: 'timestamp', precision: 0, default: () => 'CURRENT_TIMESTAMP'})
	pengembalian_date: Date;

}