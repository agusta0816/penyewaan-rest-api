import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	BaseEntity,
	BeforeInsert,
	JoinColumn,
	JoinTable,
	ManyToMany,
	OneToOne, ManyToOne
} from "typeorm"
import * as bcrypt from "bcrypt"
import {Role} from "./Role.js";
import {Customer} from "./Customer.js";
import {Companies} from "./Companies.js";

@Entity()
export class User extends BaseEntity {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({length: 300, nullable: false})
	name: string

	@BeforeInsert()
	async hashPassword() {
		if (this.password) {
			this.password = await bcrypt.hash(this.password, 10)
		}
	}
	@Column({nullable: false})
	password: string;

	@Column({nullable: false, unique: true})
	email: string;

	@Column({nullable: false, unique: true})
	phone: string;

	@ManyToMany(() => Role, role => role.users, {cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE"})
	@JoinTable()
	roles: Role[]

	@OneToOne(() => Customer, {cascade: true, onDelete: "CASCADE", nullable: true})
	@JoinColumn()
	customer: Customer

	@ManyToOne(() => Companies, {cascade: true, onDelete: "CASCADE", nullable: true})
	@JoinColumn()
	company: Companies

	@Column({default: "user", type: 'enum', enum: ['admin', 'user', 'owner']})
	type: "admin" | "user" | "owner"

	@CreateDateColumn({type: 'timestamp', default: () => "CURRENT_TIMESTAMP(6)"})
	createdAt: Date;

	@Column({default: false})
	is_active: boolean;

	@Column({nullable: true, type: 'timestamp'})
	deleteDate: Date;

}