import dataSource from "../database/data-source.js";
import {Customer} from "../database/entities/Customer.js";
import {Role} from "../database/entities/Role.js";
import {User} from "../database/entities/User.js";
import {NSUser} from "../dto/user.js";
import jwt from 'jsonwebtoken';
import {In} from 'typeorm';

const login = async (email: string, name: string) => {
	try {
		const user = await User.findOneBy({email, name});
		if (user) {
			let token: string;
			token = jwt.sign(
				{email: user.email, name: user.name},
				process.env.SECRET_KEY || '', {expiresIn: "2w"}
			);

			return token;
		}
	} catch (error) {
		throw ("Invalid email or name!");
	}
}

const createUser = async (payload: NSUser.Item) => {
	return dataSource.manager.transaction(async (transaction) => {
		const [firstName, ...lastName] = payload.name.split(" ")
		const customer = Customer.create({
			firstName,
			lastName: lastName.join(" "),
			dateOfBirth: payload.dateOfBirth || '',
			status: payload?.status
		})

		await transaction.save(customer)
		const newUser = User.create(payload);
		const [roles] = await Promise.all([Role.find({where: {name: newUser?.type || 'user'}})])
		newUser.roles = roles;
		newUser.customer = customer;
		await transaction.save(newUser);
	});
};

const getUser = (payload: { id: string }) => {
	return User.findOne({
		where: {id: payload.id}, 
		relations: ["roles", "roles.permissions"]
	})
}

const getUsers = async (payload: {
	page: string,
	pageSize: string
}, user: User) => {

	const page = parseInt(payload.page);
	const pageSize = parseInt(payload.pageSize);
	const roles = user.roles;
	const permissions: string[] = [];

	const hasAdminPermission = roles.some(role =>
		role.permissions.some((permission: { name: string; }) => permission.name === 'READ_admins')
	);

	const hasUserPermission = roles.some(role =>
		role.permissions.some((permission: { name: string; }) => permission.name === 'READ_users')
	);

	const hasOwnerPermission = roles.some(role =>
		role.permissions.some((permission: { name: string; }) => permission.name === 'READ_owners')
	);

	if (hasAdminPermission) {
		permissions.push("admin")
	}
	if (hasUserPermission) {
		permissions.push("user")
	}
	if (hasOwnerPermission) {
		permissions.push("owner")
	}

	console.log(permissions);

	const [users, total] = await User.findAndCount({
		skip: pageSize * (page - 1),
		take: pageSize,
		where: {type: In(permissions)},
		order: {
			createdAt: 'ASC'
		}
	})

	return {
		page,
		pageSize: users.length,
		total,
		users
	};
}

const editUser = async (payload: { roleId: string, userId: string }, currentUser: User) => {
	const user = await User.findOne({where: {id: payload.userId}, relations: ["roles"]});
	const role = await Role.findOne({where: {id: payload.roleId}});
	const roles = currentUser.roles;

	const hasEditPermission = roles.some(role =>
		role.permissions.some((permission: { name: string; }) => permission.name === `EDIT_${user?.type}`)
	);

	if (!hasEditPermission) {
		return `You don't have a permission to edit ${user?.type}`
	}

	if (user && role) {
		const hasRole = user.roles.some((existingRole) => existingRole.id === role.id);

		if (!hasRole) {
			user.roles.push(role);
			return user.save();
		} else {
			return "User already has this role.";
		}
	} else {
		if (!user) {
			return "User not found :(";
		} else {
			return "Role not found :(";
		}
	}
}

const deleteUser = async (userId: string, currentUser: User) => {
	const user = await User.findOne({where: {id: userId}, relations: ["roles", "roles.permissions"]});
	const roles = currentUser?.roles;

	const hasDeletePermission = roles?.some(role =>
		role.permissions.some((permission: { name: string; }) => permission.name === `DELETE_${user?.type}`)
	);

	if (!hasDeletePermission) {
		return `You don't have a permission to delete ${user?.type}`
	}

	return User.delete(userId)
}

export {
	createUser,
	editUser,
	getUser,
	login,
	getUsers,
	deleteUser
}