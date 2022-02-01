
   
exports.getEmployees = async(req,res)=>{
    res.send(`get all employees`);
};
exports.getEmployeeById = async(req,res)=>{
    res.send(`get employee Id: ${req.params.id}`);
};
exports.getEmployeeTax = async(req,res)=>{
    const sal = req.params.sal * 1;
    const tax = (sal * 10) /100;
    res.send(`get employee salary: ${sal} tax 10%: ${tax}`);
};
exports.getEmployeeRetire = async(req,res)=>{
    const age = req.params.age * 1;
    const retire = 60 - age;
    res.send(`get employee age: ${age} retire: ${retire}`);
};

exports.addEmployee = async(req,res)=>{
    res.send(`add employee => id: ${req.body.id}, name: ${req.body.name}, age: ${req.body.age}, salary: ${req.body.salary}`);
};