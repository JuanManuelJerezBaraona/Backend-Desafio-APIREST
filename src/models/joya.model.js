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

const getAllFiltered = async (precio_max, precio_min, categoria, metal) => {
    // const { query, values } = createQuery("inventario", filters);
    // const result = await pool.query(query, values);
    // return result.rows;
    let filtros = []
    const values = []

    const agregarFiltro = (campo, comparador, valor) => {
        values.push(valor)
        const { length } = filtros
        filtros.push(`${campo} ${comparador} $${length + 1}`)
    }

    if (precio_max) agregarFiltro('precio', '<=', precio_max)
    if (precio_min) agregarFiltro('precio', '>=', precio_min)
    if (categoria) agregarFiltro('categoria', '=', categoria)
    if (metal) agregarFiltro('metal', '=', metal)

    let consulta = "SELECT * FROM inventario"
    if (filtros.length > 0) {
        filtros = filtros.join(" AND ")
        consulta += ` WHERE ${filtros}`
    }

    const { rows: inventario } = await pool.query(consulta, values)
    return inventario
}

export const joyaModel = {
    getAll,
    getAllFiltered
};