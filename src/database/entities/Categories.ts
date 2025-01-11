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

	@Column()
	category_name: string;

	@Column({nullable: false})
	Company_id: string;

	@Column({default: false})
	is_deleted: boolean;
	
}