import db from "#db/client";
import { createEmployee } from "./queries/employees.js";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  // TODO
  const records = [
    { name: "Bob", birthday: "1957-01-01", salary: "100" },
    { name: "Alice", birthday: "1966-01-01", salary: "100" },
    { name: "Jerry", birthday: "1995-01-01", salary: "50" },
    { name: "Jane", birthday: "1998-01-01", salary: "50" },
    { name: "Tom", birthday: "2001-01-01", salary: "75" },
    { name: "Lisa", birthday: "2002-01-01", salary: "75" },
    { name: "Jerry", birthday: "1995-01-01", salary: "50" },
    { name: "Jane", birthday: "1998-01-01", salary: "50" },
    { name: "Tom", birthday: "2001-01-01", salary: "75" },
    { name: "Lisa", birthday: "2002-01-01", salary: "75" },
  ];

  for (const record of records) {
    await createEmployee(record);
  }
  console.log("database seeded");
}
