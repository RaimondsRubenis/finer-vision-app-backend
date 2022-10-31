import express from 'express';
const router = express.Router();
import {inputToForms} from '../db_functions/connect.js';
import {validator} from '../helpers/functions.js';

export const steps = [{
	title: 'Step 1: Your details',
	fields: [
	{"title": "First Name", "name": "name", "type": "text", "required": true},
	{"title": "Surname", "name": "surname", "type": "text", "required": true},
	{"title": "Email Address:", "name": "email", "type": "email", "required": true},
	]
},{
	title: 'Step 2: More comments',
	fields: [
	{"title": "Telephone number", "name": "telephone", "type": "tel", "required": true},
	{"title": "Gender", "name": "gender", "type": "options", "required": true, "placeholder": "Select Gender", "options":["Male", "Female", "Prefer not to say"]},
	{"title": "Date of birth", "name": "dob", "type": "date", "required": true},
	]
},{
	title: 'Step 3: Final comments',
	fields: [{"title": "Comments", "name": "comments", "type": "textarea", "required": false}]
}
];

router.get('/', (req, res) => {
	res.send('This route does not provide a front-end response')
})

router.get('/getFormData', (req, res) => {
	//TODO Improve security!
	res.set('Access-Control-Allow-Origin', '*');
	res.setHeader('Content-Type', 'application/json');

	res.status(200).json(steps);
})

router.post('/submitFormData', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	let valid = validator(steps, req.body);	
	if(!valid){
		return res.status(400).send({
		   message: 'Please recheck the entered data!'
		});
	} 
	inputToForms(req.body);
	res.status(200).send("OK");
})	

export default router;