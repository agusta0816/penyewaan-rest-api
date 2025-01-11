import {
	BaseEntity,
	Column, CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class Product extends BaseEntity {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({nullable: false, length: 255, unique: true})
	product_kode: string;

	@Column({nullable: false})
	category_id: string;

	@Column({nullable: false})
	Company_id: string;

	@Column({nullable: false, length: 255})
	product_name: string;

	@Column({nullable: true, length: 255})
	sub_product_name: string;

	@Column({default: false})
	is_deleted: boolean;

	@CreateDateColumn({type: 'timestamp', default: () => "CURRENT_TIMESTAMP(6)"})
	createdAt: Date;

}