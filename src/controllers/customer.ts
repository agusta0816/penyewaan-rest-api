import dataSource from "../database/data-source.js";
import { Customer } from "../database/entities/Customer.js";
import { Role } from "../database/entities/Role.js";
import { User } from "../database/entities/User.js";
import { NSUser } from "../dto/user.js";

const createCustomerAndUser = async (payload: NSUser.Item) => {
    
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
        const [roles] = await Promise.all([Role.find({where: {name: 'user'}})])
        newUser.roles = roles;
        newUser.customer = customer;
        await transaction.save(newUser);
    });
    
}

const editCustomerAndUser = async (payload: {roleId: string, userId: string}, currentUser: User) => {

    const user = await User.findOne({where: {id: payload.userId}, relations: ["roles"]});
    const role = await Role.findOne({where: {id: payload.roleId}});
    const roles = currentUser.roles;
    
}

export {
    createCustomerAndUser,
}