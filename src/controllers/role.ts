import {NSRole} from "../dto/role.js"
import {In} from "typeorm"
import {Permission} from "../database/entities/Permission.js";
import {Role} from "../database/entities/Role.js";
import {User} from "../database/entities/User.js";

const createRole = async (payload: NSRole.Item) => {
	const newRole = Role.create(payload)

	newRole.users = await User.find({
		where: {id: In(payload.usersId || [])},
	});
	let permissions: Permission[];
	permissions = await Permission.find({
		where: {id: In(payload.permissionsId)},
	});

	newRole.permissions = permissions
	return newRole.save()
}

export {createRole}