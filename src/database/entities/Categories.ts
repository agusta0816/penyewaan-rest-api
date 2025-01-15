import {
	BaseEntity,
	Column,
	Entity,
	PrimaryGeneratedColumn
} from "typeorm";

const { randomCode } = require('crypto')

@Entity()
export class Categories extends BaseEntity{

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({default: randomCode(0, 10), unique: true})
	category_kode: string;

	@Column({nullable: false})
	category_name: string;

	@Column({nullable: false})
	company_id: string;

	@Column({default: false})
	is_deleted: boolean;
}