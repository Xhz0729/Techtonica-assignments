import db from "../db/db-connection.js";
// get the contact
export const getContact = async (req, res) => {
  try {
    const { rows: contacts } = await db.query("SELECT * FROM contact");
    res.send(contacts);
  } catch (e) {
    return res.status(400).json({ error: "Error fetching contacts" });
  }
};
