//set paths for each requests
const express = require("express")
const { employeeRegister, getAllEmployees, viewEmployee, removeEmployee, editEmployee } = require("../controllers/logic")
const upload = require("../multerConfig/storageConfig")

//create an object for router class in express
const router = new express.Router()

//register employee - post
router.post("/employees/register",upload.single("user_profile"),employeeRegister)

//get all employees - get
router.get("/employees/getEmployees",getAllEmployees)

//get details of single employee
router.get("/employees/viewEmployees/:id",viewEmployee)

//delete employee
router.delete("/employees/removeEmployees/:id",removeEmployee)

//edit employee
router.put("/employees/updateEmployee/:id",upload.single("user_profile"),editEmployee)

module.exports=router