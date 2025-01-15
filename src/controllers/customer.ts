import { Like, Or } from "typeorm";
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
        const [roles] = await Promise.all([Role.find({ where: { name: 'user' } })])
        newUser.roles = roles;
        newUser.customer = customer;
        await transaction.save(newUser);
    });

}

const editCustomerAndUser = async (payload: NSUser.EditItemCustomer) => {

    return dataSource.manager.transaction(async (transaction) => {
        const [firstName, ...lastName] = payload.name.split(" ")
        const updateCustomer = Customer.create({
            firstName: firstName,
            lastName: lastName.join(" "),
            dateOfBirth: payload.dateOfBirth || '1999-01-01'
        })

        const updateUser = User.create({
            name: payload.name,
            email: payload.email,
            phone: payload.phone
        })
        await transaction.update(
            Customer, { 
                customerKode: payload.customerKode 
            },
            updateCustomer
        )

        await transaction.update(
            User,
            { id: payload.id },
            updateUser
        )
    });

}

const getCustomer = async (payload: { id: string }) => {
    return Customer.findOne({ where: { id: payload.id } })
}

const getCustomers = async (payload: { 
    page: string,
    pageSize: string
}, customer: Customer) => {
    
    const page = parseInt(payload.page);
    const pageSize = parseInt(payload.pageSize);

    const [customers, total] = await Customer.findAndCount({
        skip: (page - 1) * pageSize,
        where: [
            {isDeleted: false},
            {status: customer.status},
            {customerKode: Or(Like(customer.customerKode))},
            {firstName: Or(Like(customer.firstName))},
            {lastName: Or(Like(customer.lastName))},
        ],
        take: pageSize,
        order: {
            firstName: "DESC",
            lastName: "DESC"
        }
    })

    return {
        page,
        pageSize: customers.length,
        customers,
        total
    }
}

export {
    createCustomerAndUser,
    editCustomerAndUser,
    getCustomer,
    getCustomers
}