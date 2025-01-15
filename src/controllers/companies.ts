import { Like, Or } from "typeorm";
import { Companies } from "../database/entities/Companies.js";
import { NSCompanies } from "../dto/companies.js";

const saveCompany = async (payload: NSCompanies.Item) => {
    const objCompanies = Companies.create(payload)
    return objCompanies.save();
}

const deleteCompany = async (companyKode: string) => {
    return Companies.update(
        {company_kode: companyKode}, 
        {is_active: 'in-active'}
    );
}

const getCompanies = async (payload: {
    page: string, 
    pageSize: string
}, company: Companies) => {
    
    const page = parseInt(payload.page);
    const pageSize = parseInt(payload.pageSize);

    const [companies, total] = await Companies.findAndCount({
            skip: (page - 1) * pageSize,
            where: [
                {is_active: 'active'},
                {company_name: Or(Like(company.company_name))},
                {company_kode: Or(Like(company.company_kode))},
                {address: Or(Like(company.address))}
            ],
            take: pageSize,
            order: {
                company_name: "DESC"
            }
        })
    
        return {
            page,
            pageSize: companies.length,
            companies,
            total
        }
}

const getCompany = async (payload: {id: string}) => {
    return Companies.findOne({
        where: {id: payload.id}
    })
}

export{
    saveCompany,
    deleteCompany,
    getCompanies,
    getCompany,
}