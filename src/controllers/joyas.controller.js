import { joyaModel } from "../models/joya.model.js";

import { getDatabaseError } from "../helpers/database.error.js";
import pagination from "../helpers/paginator.js";
import prepareHateoas from "../helpers/hateoas.js";

const read = async (req, res) => {

  try {
    const { order_by, limits, page } = req.query;
    const joyas = await joyaModel.getAll(order_by, limits, page);
    const joyasWithHateoas = await prepareHateoas("joyas", joyas);
    return res.status(200).json({joyas: joyasWithHateoas});

  } catch (error) {
    console.log("error", error);
    if (error.code) {
      const { code, message } = getDatabaseError(error.code);
      return res.status(code).json({ message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const joyasController = {
  read
};
