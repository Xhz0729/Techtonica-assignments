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

// route to get all sightings with individual nicknames
export const getSightings = async (req, res) => {
  try {
    const query = `
      SELECT sightings.*, individuals.nickname
      FROM sightings
      JOIN individuals ON sightings.individual_id = individuals.id
      ORDER BY sightings.sighting_date DESC;
    `;
    const { rows: sightings } = await db.query(query);
    res.json(sightings); // Send the fetched data as a JSON response
  } catch (e) {
    return res.status(400).json({ e });
  }
};

// route to add a new sighting record
export const addSighting = async (req, res) => {
  const { sighting_date, individual_id, location, is_healthy, sighter_email } =
    req.body;
  try {
    // check whether the individual exist
    const individualCheck = await db.query(
      "SELECT * FROM individuals WHERE id = $1",
      [individual_id]
    );
    if (individualCheck.rows.length === 0) {
      return res
        .status(400)
        .json({ error: "Individual with this ID does not exist" });
    }
    // insert the new sighting
    const newSighting = await db.query(
      `INSERT INTO sightings (sighting_date, individual_id, location, is_healthy, sighter_email)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [sighting_date, individual_id, location, is_healthy, sighter_email]
    );
    res.json(newSighting.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
};
