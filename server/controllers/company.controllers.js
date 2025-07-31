const Company = require("../models/company.model");
const registerCompany = async (req, res) => {
  try {
    const { CompanyName, description, location } = req.body;
    if (!CompanyName || !description || !location) {
      return res.status(400).json({ message: "please provide the details" });
    }
    let company = await Company.findOne({ CompanyName });
    if (company) {
      return res
        .status(400)
        .json({ message: "Company Already exist", success: false });
    }
    company = await Company.create({
      name: CompanyName,
      userId: req.id,
    });
    return res
      .status(200)
      .json({
        message: "Company registered successfully",
        company,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};
const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(400).json({ message: "Company not found created" });
    }
    return res
      .status(200)
      .json({ message: "Company found sucessfully", success: true, companies });
  } catch (error) {
    console.log(error);
  }
};
const getCompanyById = async (req, res) => {
  try {
    const Companyid = req.params.id;
    const company = await Company.findById(Companyid);
    if (!company) {
      res.status(400).json({ message: "Couldn't not found Comapny with this id" });
    }
    return res
      .status(200)
      .json({ message: "Company found Sucessfully", company });
  } catch (error) {
    console.log(error);
  }
};
const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    // cloudinary
    if (!name || !description) {
      return res.status(400).json({ message: "Coudn't update Information" });
    }
    const data = { name, description, website, location };
    const updatedData = await Company.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    if (!updatedData) {
      return res.status(400).json({ message: "Couldn't update the data" });
    }
    return res
      .status(200)
      .json({ message: "data updated successfully", updatedData });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { registerCompany, getCompany, getCompanyById, updateCompany };