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
    const response = await pool.query(formattedQuery);
    return response.rows;
};

const getById = async (id) => {
    const response = await pool.query("SELECT * FROM inventario WHERE id = $1", [id]);
    return response.rows[0];
};

const getAllFiltered = async (filters) => {
    const { query, values } = createQuery("inventario", filters);
    const response = await pool.query(query, values);
    return response.rows;
}

export const joyaModel = {
    getAll,
    getById,
    getAllFiltered
};