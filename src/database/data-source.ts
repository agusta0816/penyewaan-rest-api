import {DataSource} from "typeorm";
import {User} from "./entities/User.js";
import {Role} from "./entities/Role.js";
import {Permission} from "./entities/Permission.js";
import {Customer} from "./entities/Customer.js";

const dataSource = new DataSource({
	type: 'mysql',
	host: process.env.DB_HOST_NAME,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USER_NAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: [
		User,
		Role,
		Permission,
		Customer
	],
	synchronize: process.env.NODE_ENV !== "production",
	logging: process.env.NODE_ENV !== "production",
});

export default dataSource;