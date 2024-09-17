import db from "../db/db-connection.js";

// get all species
export const getSpecies = async (req, res) => {
  try {
    const { rows: species } = await db.query("SELECT * FROM species");
    res.send(species);
  } catch (e) {
    return res.status(400).json({ e });
  }
};
