import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class DetailPaket extends BaseEntity {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({nullable: false})
	paket_id: string;

	@Column({nullable: false, length: 255})
	detail_name: string;

	@Column({nullable: false, length: 255})
	detail_value: string;

}