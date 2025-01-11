import {Permission} from "../database/entities/Permission.js"
import {NSPermission} from "../types/permission.js"

const creatPermission = async (payload: NSPermission.Item) => {
	const newPermission = Permission.create(payload)
	return newPermission.save();
}

export {creatPermission}