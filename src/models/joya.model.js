import { pool } from "../../database/connection.js";
import format from "pg-format";
import createQuery from "../helpers/filter.js";

const getAll = async (order_by = "id_ASC", limits = 5, page = 1) => {
  const [attribute, direction] = order_by.split("_");
  const offset = (page -1) * limits;
  
  const formattedQuery = format(
    "SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s",
    attribute,
    direction,
    limits,
    offset
  );
  // console.log("query: ", formattedQuery);
  const response = await pool.query(formattedQuery);
  // console.log("response", response);
  return response.rows;
};

export const joyaModel = {
  getAll
};
