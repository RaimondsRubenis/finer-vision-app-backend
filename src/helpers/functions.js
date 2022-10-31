import { DataTypes } from 'sequelize';

export const isValidEmail = (email) => (/\S+@\S+\.\S+/.test(email)) ? true : false;

export const isValidPhone = (phone) => (!/[+0-9]/.test(phone)) ? false : true;

export const isValidInput = (input) =>  Boolean(input.trim());

export const validator = (steps, inputs) => {
	//TODO validate if text not shorter than some amount from ENV
    let pass = true;
    Loop1:
    for(let step of steps){
    	if(Boolean(step)){
    		for(let field of step.fields){
    			if(pass == false){break Loop1;}
    			if(field["name"] in inputs){
    				if(field["type"] == "email" && !isValidEmail(inputs[field["name"]])){
    					pass = false;
    				}
    				if(field["type"] == "tel" && !isValidPhone(inputs[field["name"]])){
    					pass = false;
    				}
    				if(field["required"] && !Boolean(inputs[field["name"]])){
    					pass = false;
    				}
    			}else{
    				if(field["required"]){
    					pass = false;
    				}
    			}
    		}
    	}
    }
    return pass;
}

export const getDBDataType = (type) => {
	switch(type) {
    // case "date":
    // return DataTypes.DATE;
    // break;
    case "number":
    return DataTypes.INTEGER;
    break;
    case "textarea":
    return DataTypes.TEXT;
    break;
    default:
    return DataTypes.STRING;
	}
}

export const getDBType = (type) => {
  switch(type) {
    // case "date":
    // return "DATE";
    // break;
    case "text":
    return "VARCHAR (200)";
    break;
    case "number":
    return "INTEGER";
    break;
    default:
    return "TEXT";
  }
}