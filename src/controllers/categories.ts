import { Like, Or } from "typeorm";
import { Categories } from "../database/entities/Categories.js";
import { NSCategories } from "../dto/categories.js";

const saveCategory = async (payload: NSCategories.Item) => {
    const newPermission = Categories.create({
        category_name: payload.category_name,
        company_id: payload.company_id
    })
    return newPermission.save();
}

const deleteCategory = async (categoryCode: string) => {
    return Categories.update(
        {category_kode: categoryCode}, 
        {is_deleted: true}
    );
};

const getCategories = async (payload: {
    page: string, 
    pageSize: string
}, category: Categories) => {

    const page = parseInt(payload.page);
    const pageSize = parseInt(payload.pageSize);

    const [categories, total] = await Categories.findAndCount({
        skip: (page - 1) * pageSize,
        where: [
            {is_deleted: false},
            {company_id: category.company_id},
            {category_kode: Or(Like(category.category_kode))},
            {category_name: Or(Like(category.category_name))}
        ],
        take: pageSize,
        order: {
            category_name: "DESC"
        }
    })

    return {
        page,
        pageSize: categories.length,
        categories,
        total
    }
};

const getCategory = async (payload: {id: string}) => {
    return Categories.findOne({where: {id: payload.id}})
};

export {
    saveCategory,
    getCategories,
    getCategory,
    deleteCategory
}