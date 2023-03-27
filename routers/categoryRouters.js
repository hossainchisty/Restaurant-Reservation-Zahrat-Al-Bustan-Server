// Basic Lib Imports
const express = require("express");
const router = express.Router();

const {
  getCategory,
  setCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryControllers");


// Routing Implement

router.get("/", getCategory);

router.post("/", setCategory);

router.put("/:id", updateCategory);

router.delete("/:id", deleteCategory);

module.exports = router;
