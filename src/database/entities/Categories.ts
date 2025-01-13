import {
	BaseEntity,
	Column,
	Entity,
	PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class Categories extends BaseEntity{

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({nullable: false})
	category_name: string;

	@Column({nullable: false})
	company_id: string;

	@Column({default: false})
	is_deleted: boolean;
	
}