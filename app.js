import express from "express";
const app = express();
export default app;
app.use(express.json());

// TODO: this file!

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong :(");
});

app.route("/").get((req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

app
  .route("/employees")
  .get(async (req, res) => {
    try {
      const sql = `SELECT * FROM employees`;
      const { rows: employees } = await db.query(sql);
      res.json(employees);
    } catch (err) {
      res.status(500).send("Server error");
    }
  })
  .post(async (req, res) => {
    try {
      if (!req.body) return res.status(400).send("Request body required");

      const { name, birthday, salary } = req.body;

      if (!name || !birthday || !salary) {
        return res.status(400).send("Missing required fields");
      }

      const sql = `
        INSERT INTO employees (name, birthday, salary)
        VALUES ($1, $2, $3)
        RETURNING *
      `;

      const { rows: [employee] } = await db.query(sql, [
        name,
        birthday,
        salary,
      ]);

      res.status(201).json(employee);
    } catch (err) {
      res.status(500).send("Server error");
    }
  });


app
  .route("/employees/:id")

  // get employee by id
  .get(async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).send("Employee ID is required");
    if (isNaN(id) || id <= 0)
      return res.status(400).send("ID must be a positive integer");

    const sql = `
      SELECT * FROM employees
      WHERE id = $1
    `;

    const { rows } = await db.query(sql, [id]);

    if (rows.length === 0)
      return res.status(404).send("Employee not found");

    res.json(rows[0]);
  })

  // delete employee

  .delete(async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "Employee ID required" });
    if (isNaN(id) || id <= 0)
      return res
        .status(400)
        .json({ error: "Employee ID must be a positive integer" });

    const sql = `
      DELETE FROM employees
      WHERE id = $1
      RETURNING *
    `;

    const { rows } = await db.query(sql, [id]);

    if (rows.length === 0)
      return res.status(404).json({ error: "Employee does not exist" });

    res.sendStatus(204);
  })

  // update employee

  .put(async (req, res) => {
    const { id } = req.params;
    const { name, birthday, salary } = req.body;

    if (!id) return res.status(400).send("Employee ID required");
    if (isNaN(id) || id <= 0)
      return res.status(400).send("Employee ID must be a positive integer");

    if (!req.body)
      return res.status(400).send("Request must have a body");

    if (!name || !birthday || !salary)
      return res.status(400).send("Missing required fields");

    const sql = `
      UPDATE employees
      SET name = $2, birthday = $3, salary = $4
      WHERE id = $1
      RETURNING *
    `;

    const { rows } = await db.query(sql, [id, name, birthday, salary]);

    if (rows.length === 0)
      return res.status(404).send("Employee not found");

    res.status(200).json(rows[0]);
  });
