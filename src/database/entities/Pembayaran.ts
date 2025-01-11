import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Pembayaran extends BaseEntity {

	@PrimaryGeneratedColumn('increment')
	id: bigint;

	@Column({nullable: false, unique: true})
	kode_transaksi: string;

	@Column({nullable: false})
	pinjaman_id: bigint;

	@Column({default: "gagal", type: 'enum', enum: ['sukses', 'gagal']})
	status_pembayaran: 'sukses' | 'gagal';

	@Column({default: "transfer", type: 'enum', enum: ['cod', 'transfer']})
	cara_pembayaran: 'cod' | 'transfer';

	@Column()
	bank: string;

	@Column({nullable: false, unique: true})
	nomor_pembayaran: string;

	@CreateDateColumn({type: 'timestamp', precision: 0, default: () => 'CURRENT_TIMESTAMP'})
	tanggal: Date;

}