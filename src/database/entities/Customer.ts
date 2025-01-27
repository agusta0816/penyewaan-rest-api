import {
	Entity,
	BaseEntity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn
} from "typeorm";

@Entity()
export class Customer extends BaseEntity {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({nullable: false, unique: true})
	customerKode: string

	@Column({nullable: false, length: 255})
	firstName: string

	@Column({nullable: false, length: 255})
	lastName: string

	@Column({nullable: true})
	dateOfBirth: Date;

	@Column({type: 'enum', enum: ['Pending', 'Accepted', 'Rejected'], default: "Pending"})
	status: 'Pending' | 'Accepted' | 'Rejected';

	@CreateDateColumn({type: 'timestamp', default: () => "CURRENT_TIMESTAMP(6)"})
	createdAt: Date;

	@Column({default: false})
	isDeleted: boolean;

	@Column({nullable: true, type: 'timestamp'})
	deleteDate: Date;

}