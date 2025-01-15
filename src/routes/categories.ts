import express from 'express';
import { validationCategoryProduct } from '../middlewares/validation/product.js';
import {deleteCategory, getCategories, saveCategory} from '../controllers/categories.js';
import { authenticate } from '../middlewares/auth/authenticate.js';
import { authorize } from '../middlewares/auth/authorize.js';
import { Categories } from '../database/entities/Categories.js';

const router = express.Router();

router.post('/save', authenticate, authorize('ADD_CATEGORY'), validationCategoryProduct, (req, res, next) => {
    saveCategory(req.body).then(() => {
        res.status(201).send({"status": "success", "data": req.body});
    }).catch(err => {
        console.log(err);
        res.status(500).send({"status": "error", "message": err});
    });
});

router.delete('/delete/:id', authenticate, authorize('DELETE_CATEGORY'), async (req, res, next) => {
    
    const categoryKode = req.params.category_kode || '';
    const currentCategory = await Categories.findOne({
        where: {category_kode: categoryKode}
    }) || new Categories();

    if (!currentCategory) {
        res.status(404).send({"status": "error", "message": "Category not found"});
    } else {
        deleteCategory(categoryKode).then(() => {
            res.status(201).send({"status": "success", "data": currentCategory});
        }).catch(error => {
            console.log(error);
            res.status(500).send({"status": "error", "message": error});
        })
    }
});

router.post('/list', authenticate, authorize('READ_CATEGORY'), async (req, res, next) => {
    const payload = {
        page: req.query.page?.toString() || '1',
        pageSize: req.query.pageSize?.toString() || '10'
    };

    const category = new Categories();
    category.category_kode = req.query.category_kode?.toString() || '';
    category.category_name = req.query.category_kode?.toString() || '';
    category.company_id = req.query.category_kode?.toString() || '';

    const categories = await getCategories(payload, category);
    if(categories) {
        res.status(200).send({"status": "success", "data": categories});
    } else {
        res.status(404).send({"status": "error", "message": "Category not found"});
    }
    
});

router.get('/search/:id', authenticate, authorize("READ_CATEGORY"), async (req, res, next) => {
    const categoryKode = req.params.id || '';
    const currentCategory = await Categories.findOne({
        where: {category_kode: categoryKode}
    }) || new Categories();

    if (currentCategory) {
        res.status(201).send({"status": "success", "data": currentCategory});
        
    } else {
        res.status(404).send({"status": "error", "message": "Category not found"});
    }
});

export default router;