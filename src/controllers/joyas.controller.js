import { joyaModel } from "../models/joya.model.js";
import { getDatabaseError } from "../helpers/database.error.js";

const read = async (req, res) => {

  try {
    const joyas = await joyaModel.findAll();
    return res.status(200).json(joyas);

  } catch (error) {
    console.log(error);
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
