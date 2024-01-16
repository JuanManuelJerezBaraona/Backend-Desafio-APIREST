import "dotenv/config";
import format from "pg-format";
import { pool } from "../../database/connection.js";

const findAll = async () => {
  const SQLquery = { text: "SELECT * FROM inventario" };
  const response = await pool.query(SQLquery);
  return response.rows;
};

export const joyaModel = {
  findAll
};
