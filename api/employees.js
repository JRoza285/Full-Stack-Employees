import express from "express";
const router = express.Router();
export default router;

// TODO: this file!
 import { getEmployees } from "#db/queries/employees";

 router.get("/", async (requestAnimationFrame, res) => {
    const employees = await getEmployees();
    res.send(employees);
 });