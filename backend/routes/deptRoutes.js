var express = require("express");
var router = express.Router();
const Models = require("./../models");
const Department = Models.departments;
const User = Models.users;
const Profile = Models.profiles;
const { isAuth, isAdmin } = require("../middleware/authMiddleware");

//Create
router.post("/department", isAdmin, async (req, res, next) => {
  const title = req.body.title;
  if (title == "") {
    res.status(400).json({ message: "Department title cannot be empty" });
  } else {
    var dept = {
      title,
    };
    created_department = await Department.create(dept);
    res.status(201).json(created_department);
  }
});

router.get("/department", isAuth, async (req, res, next) => {
  const departments = await Department.findAll();
  res.json(departments);
});
//Get department by id
router.get("/department/:id", isAuth, async (req, res, next) => {
  const department = await Department.findByPk(req.params.id);

  if (department) {
    res.json(department);
  } else {
    res.status(404).json({ message: "Department not found" });
  }
});
//Edit department
router.put("/department/:id", isAdmin, async (req, res, next) => {
  const { title } = req.body;
  if (title == "") {
    res.status(400).json({ message: "Department title cannot be empty" });
  } else {
    const department = await Department.findByPk(req.params.id);

    if (department) {
      department.title = title || department.title;
      const updatedDepartment = await department.save();
      res.json(updatedDepartment);
    } else {
      res.status(404).json({ message: "Department not found" });
    }
  }
});
//Delete department
router.delete("/department/:id", isAdmin, async (req, res) => {
  const department = await Department.findByPk(req.params.id);

  if (department) {
    await department.destroy();
    res.json({ message: "Department Deleted" });
  } else {
    res.status(404).json({ message: "Department not found" });
  }
});
//Get department members
router.get("/departments/:id", isAuth, async (req, res, next) => {
  const department = await Department.findByPk(req.params.id);

  if (department) {
    const employees = await User.findAll({
      where: { department_id: department.id },
    });

    if (employees) {
      res.json({
        id: department.id,
        title: department.title,
        members: employees,
      });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } else {
    res.status(404).json({ message: "Department not found" });
  }
});

module.exports = router;
