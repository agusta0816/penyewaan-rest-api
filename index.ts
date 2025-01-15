import './config.js'
import express from 'express'
import "reflect-metadata";
import dataSource from './src/database/data-source.js';
import userRouter from './src/routes/user.js'
import permissionRouter from './src/routes/permission.js'
import roleRouter from './src/routes/role.js'
import {authenticate} from './src/middlewares/auth/authenticate.js';
import categoriesRouter from './src/routes/categories.js';
import companiesRouter from './src/routes/companies.js';

const app = express()
const PORT = process.env.PORT || 3000;
app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Server UP!');
// });

// app.use((req, res) => {
//     res.status(404).send("You requested something I don't have :(");
// });

app.use('/user', authenticate, userRouter);
app.use('/permission', authenticate, permissionRouter);
app.use('/role', authenticate, roleRouter);
app.use('/categories', authenticate, categoriesRouter);
app.use('/companies', authenticate, companiesRouter);

app.listen(PORT, () => {
	dataSource.initialize().then(() => {
		console.log(`${new Date()} - DB connected on host ${process.env.DB_HOST_NAME}! - App run on port ${PORT}`);
	}).catch(err => {
		console.error('Failed up to app: ' + err);
	});
});