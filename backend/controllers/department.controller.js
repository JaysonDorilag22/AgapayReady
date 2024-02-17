import Department from "../models/department.model.js";
import User from "../models/user.model.js";

// Create Department
export const createDepartment = async (req, res, next) => {
  const { name, description } = req.body;

  try {
    const department = new Department({ name, description });
    await department.save();
    res.status(201).json(department);
  } catch (error) {
    next(error);
  }
};

// Get All Departments
export const getAllDepartments = async (req, res, next) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    next(error);
  }
};

// Get Department by ID
export const getDepartmentById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const department = await Department.findById(id);
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }
    res.status(200).json(department);
  } catch (error) {
    next(error);
  }
};

// Update Department
export const updateDepartment = async (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const department = await Department.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }
    res.status(200).json(department);
  } catch (error) {
    next(error);
  }
};

// Delete Department
export const deleteDepartment = async (req, res, next) => {
  const { id } = req.params;
  try {
    // Check if any users belong to this department
    const usersInDepartment = await User.find({ department: id });
    if (usersInDepartment.length > 0) {
      return res.status(400).json({
        error:
          "Cannot delete department because it has associated users. Remove users from this department first.",
      });
    }
    const deletedDepartment = await Department.findByIdAndDelete(id);
    if (!deletedDepartment) {
      return res.status(404).json({ error: "Department not found" });
    }
    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    next(error);
  }
};
