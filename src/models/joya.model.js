import { pool } from "../../database/connection.js";
import format from "pg-format";
import createQuery from "../helpers/filter.js";

const getAll = async () => {
  const SQLquery = { text: "SELECT * FROM inventario" };
  const response = await pool.query(SQLquery);
  return response.rows;
};

export const joyaModel = {
  getAll
};
