import {
	BaseEntity,
	Column,
	Entity,
	PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class Companies extends BaseEntity {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	company_name: string;

	@Column({nullable: false, unique: true})
	email: string;

	@Column({nullable: false, unique: true})
	phone: string;

	@Column({nullable: false})
	address: string;

	@Column({type: 'enum', enum: ['active', 'in-active']})
	is_active: 'active' | 'in-active';

}