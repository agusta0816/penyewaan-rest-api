import express from 'express';
import { authorize } from '../middlewares/auth/authorize.js';
import { authenticate } from '../middlewares/auth/authenticate.js';
import { validationCompanies } from '../middlewares/validation/company.js';
import { deleteCompany, getCompanies, saveCompany } from '../controllers/companies.js';
import { Companies } from '../database/entities/Companies.js';

const router = express.Router();

router.post('/save', authenticate, authorize('ADD_COMPANY'), validationCompanies, (req, res, next) => {
    
    saveCompany(req.body).then(() => {
        res.status(201).send({"status": "success", "data": req.body});
    }).catch(err => {
        console.log(err);
        res.status(500).send({"status": "error", "message": err});
    });

});

router.delete('/delete/:id', authenticate, authorize('DELETE_COMPANY'), async (req, res, next) => {
    
    const companyKode = req.params.id || '';
    const currentCompany = await Companies.findOne({
        where: {company_kode: companyKode}
    }) || new Companies();

    if (!currentCompany) {
        res.status(404).send({"status": "error", "message": "Company not found"});
    } else {
        deleteCompany(companyKode).then(() => {
            res.status(201).send({"status": "success", "data": currentCompany});
        }).catch(error => {
            console.log(error);
            res.status(500).send({"status": "error", "message": error});
        })
    }

});

router.post('/list', authenticate, authorize('READ_COMPANY'), async (req, res, next) => {
    
    const payload = {
        page: req.query.page?.toString() || '1',
        pageSize: req.query.pageSize?.toString() || '10'
    };

    const company = new Companies();
    company.company_kode = req.query.company_kode?.toString() || '';
    company.company_name = req.query.company_name?.toString() || '';
    company.address = req.query.address?.toString() || '';

    const companies = await getCompanies(payload, company);
    if(companies) {
        res.status(200).send({"status": "success", "data": companies});
    } else {
        res.status(404).send({"status": "error", "message": "Category not found"});
    } 

});

router.get('/search/:id', authenticate, authorize("READ_CATEGORY"), async (req, res, next) => {
    
    const companyKode = req.params.id || '';
    const currentCompany = await Companies.findOne({
        where: {company_kode: companyKode}
    }) || new Companies();

    if (currentCompany) {
        res.status(200).send({"status": "success", "data": currentCompany});
    } else {
        res.status(404).send({"status": "error", "message": "Company not found"});
    }

});

export default router;