import express from 'express';
import { authenticate } from '../middlewares/auth/authenticate.js';
import { authorize } from '../middlewares/auth/authorize.js';
import { validationCustomer } from '../middlewares/validation/customer.js';
import { createCustomerAndUser } from '../controllers/customer.js';

const router = express.Router();

router.post('/', authenticate, authorize('ADD_CUSTOMER'), validationCustomer,(req, res, next) => {
    createCustomerAndUser(req.body).then(() => {
        res.status(201).send({"message": "Customer created successfully!!"})
    }).catch(err => {
        console.error(err);
        res.status(500).send({"message": err.message});
    })
});

router.put('/', authenticate, authorize('EDIT_CUSTOMER'), validationCustomer, (req, res, next) => {

    
});

router.get('/:id', authenticate, authorize('READ_CUSTOMER'), (req, res, next) => {
    
});

router.get('/', authenticate, authorize('READ_CUSTOMER'), (req, res, next) => {
    
});

router.delete('/', authenticate, authorize('DELETE_CUSTOMER'), (req, res, next) => {
    
});

export default router;