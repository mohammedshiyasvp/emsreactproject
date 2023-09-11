//import schemas
const employees = require("../models/emsModel")

//all logic

//register logic
module.exports.employeeRegister = async (req, res) => {
    const file = req.file.filename
    const { fname, lname, email, mobile, gender, status, location } = req.body

    if (!fname || !lname || !email || !mobile || !gender || !status || !file || !location) {
        res.status(404).json("all inputs are required")
    }

    try {
        const preEmployee = await employees.findOne({ email })

        if (preEmployee) {
            res.status(403).json("employee already exists")
        }
        else {
            //create object for new employee
            const newEmployee = new employees({ fname, lname, email, mobile, gender, status, profile: file, location })
            await newEmployee.save()

            res.status(200).json(newEmployee)

        }
    }
    catch {
        res.status(400).json("logic error")
    }
}

//get all employees
module.exports.getAllEmployees = async (req, res) => {
    //accessing search data from the request query
    const { search } = req.query

    //regular expression query
    const query = {
        fname: { $regex: search, $options: "i" },

    }

    try {
        const allEmployees = await employees.find(query)
        res.status(200).json(allEmployees)

    }
    catch (err) {
        res.status(400).json(err)


    }
}

//logic to get single employee
module.exports.viewEmployee = async (req, res) => {
    const id = req.params.id;

    try {
        const employeeDetails = await employees.findOne({ _id: id });
        res.status(200).json(employeeDetails)


    }
    catch (err) {
        res.status(400).json(err)


    }
}

module.exports.removeEmployee = async (req, res) => {
    const id = req.params.id;

    try {

        //findByIdAndDelete() this method will return object if deleted ,

        const removeEmp = await employees.findByIdAndDelete({ _id: id })
        res.status(200).json(removeEmp)


    }
    catch (err) {
        res.status(400).json(err)


    }

}

module.exports.editEmployee = async (req, res) => {
    const { id } = req.params
    const { fname, lname, email, mobile, gender, status, location ,user_profile } = req.body
    const file = req.file?req.file.filename:user_profile


    if (!fname || !lname || !email || !mobile || !gender || !status || !location) {
        res.status(404).json("all inputs are required")
    }
    try {
        const user = await employees.findOne({ _id: id })
        if (user) {
            //updated all values with new data
            user.fname = fname
            user.lname = lname
            user.email = email
            user.mobile = mobile
            user.gender = gender
            user.status = status
            user.location = location
            user.profile = file

            //save
            user.save()
            res.status(200).json(user)

        }

    }
    catch (err) {
        res.status(400).json(err)


    }

}
