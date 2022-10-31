//const sqlite3 = require('sqlite3').verbose()
import sqlite3 from 'sqlite3';
import Sequelize from 'sequelize';

import {steps} from '../routes/formRoutes.js';
import {getDBDataType} from '../helpers/functions.js';

const db = new sqlite3.Database(':memory:')
const sequelize = new Sequelize('sqlite::memory:') 

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

let Form;

sequelize
.authenticate()
.then(function(err) {
  console.log("Connection established.");
    let obj = {};
    let columns = iteriteCurrentForm();
    columns.map((value) => 
      obj[value.name] = {type: value.type}
      )
    Form = sequelize.define("forms", obj);
    Form.sync();
  })
.catch(function(err) {
  console.log("Unable to connect to database: ", err);
});

const iteriteCurrentForm = () => {
  let columns = [];
  steps.map((form, id) => {
    form.fields.map((inp, iid) =>
    { 
      if(columns.findIndex(x => (x.name === inp.name && x.type === inp.type)) === -1){
        let temp = [];
        temp["name"]= inp.name;
        temp["type"]=getDBDataType(inp.type);
        columns.push(temp);
      }
    }
    )
  });
  return columns;
}

export const inputToForms = (data) => {
  let obj = {};
  let columns = iteriteCurrentForm();
  columns.map((value) => obj[value.name] = data[value.name] )
  Form.create(obj).then(Form.sync());
  //Display in console that insert is complete;
  Form.findAll({raw: true}).then(function(forms) {
    console.log(forms);
  }).catch(function(err) {
        console.log(err);
    });
}

