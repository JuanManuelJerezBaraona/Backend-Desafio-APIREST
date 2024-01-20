import { pool } from "../../database/connection.js";
import format from "pg-format";
import createQuery from "../helpers/filter.js";

const getAll = async (order_by = "id_ASC", limits = 5, page = 1) => {
    try {
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

    } catch (error) {
        console.log("error", error);
    }
};

const getById = async (id) => {
    try {
        const response = await pool.query("SELECT * FROM inventario WHERE id = $1", [id]);
        return response.rows[0];

    } catch (error) {
        console.log("error", error);
    }
};

const getAllFiltered = async (filters) => {
    try {
        const { query, values } = createQuery("inventario", filters);
        const response = await pool.query(query, values);
        return response.rows;

    } catch (error) {
        console.log("error", error);
    }
}

export const joyaModel = {
    getAll,
    getById,
    getAllFiltered
};