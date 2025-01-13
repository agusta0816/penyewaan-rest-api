import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class SatuanUnit extends BaseEntity {

	@PrimaryGeneratedColumn('uuid')
	id:string;

	@Column({nullable: false})
	satuan:string;

	@Column({nullable: false})
	company_id: string;

	@Column({default: false})
	is_deleted: boolean;

	@CreateDateColumn({type: 'timestamp', default: () => "CURRENT_TIMESTAMP(6)"})
	createdAt: Date;
}