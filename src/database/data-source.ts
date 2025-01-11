import {DataSource} from "typeorm";
import {User} from "./entities/User.js";
import {Role} from "./entities/Role.js";
import {Permission} from "./entities/Permission.js";
import {Customer} from "./entities/Customer.js";
import {Companies} from "./entities/Companies.js";
import {Categories} from "./entities/Categories.js";
import {Product} from "./entities/Product.js";
import {DetailProduct} from "./entities/DetailProduct.js";
import {Paket} from "./entities/Paket.js";
import {DetailPaket} from "./entities/DetailPaket.js";
import {SatuanUnit} from "./entities/SatuanUnit.js";
import {HargaSewa} from "./entities/HargaSewa.js";
import {Pinjaman} from "./entities/Pinjaman.js";
import {DetailPinjaman} from "./entities/DetailPinjaman.js";
import {StatusPinjaman} from "./entities/StatusPinjaman.js";
import {Pembayaran} from "./entities/Pembayaran.js";
import {Pengembalian} from "./entities/Pengembalian.js";
import {DetailPengembalian} from "./entities/DetailPengembalian.js";

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
		Customer,
		Companies,
		Categories,
		Product,
		DetailProduct,
		Paket,
		DetailPaket,
		SatuanUnit,
		HargaSewa,
		Pinjaman,
		DetailPinjaman,
		StatusPinjaman,
		Pembayaran,
		Pengembalian,
		DetailPengembalian
	],
	synchronize: process.env.NODE_ENV !== "production",
	logging: process.env.NODE_ENV !== "production",
});

export default dataSource;