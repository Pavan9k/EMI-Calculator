import Calcs  from '../models/Calc';
exports.addCalc = async (req, res) => {
    const employee = req.body;
    const emp = new Calcs(employee);
    await emp.save();
    res.status(201).json({success:true})
}
exports.getCalc = async (req, res) => {
    const employees = await Calcs.find();
    console.log(employees)
    res.json(employees);
}