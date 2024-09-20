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
    const query = ` SELECT 
    individuals.id AS id, 
    individuals.nickname,
    species.common_name AS species, 
    COUNT(sightings.id) AS sightings_count, 
    MAX(sightings.sighting_date) AS recent_sighting,  
    (SELECT location FROM sightings WHERE individual_id = individuals.id ORDER BY sighting_date DESC LIMIT 1) AS recent_sighting_location
    FROM individuals 
    LEFT JOIN sightings ON sightings.individual_id = individuals.id
    JOIN species ON individuals.species_id = species.id
    GROUP BY individuals.id, species.common_name; `;
    const { rows: sightings } = await db.query(query);
    res.json(sightings); // Send the fetched data as a JSON response
  } catch (e) {
    return res.status(400).json({ error: "Error fetching sightings." });
  }
};

// route to add a new sighting record
export const addSighting = async (req, res) => {
  let { sighting_date, individual_id, location, is_healthy, sighter_email } =
    req.body;

  // convert individual_id to a number
  individual_id = parseInt(individual_id, 10);

  // basic validation for required fields
  if (!sighting_date || !individual_id || !location) {
    return res.status(400).json({ error: "Required fields are missing." });
  }

  // validate individual_id is a positive number
  if (typeof individual_id !== "number" || individual_id < 1) {
    return res.status(400).json({ error: "Invalid individual ID." });
  }

  // validate email format
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (sighter_email && !emailRegex.test(sighter_email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  // validate is_healthy (it should be either true, false, or null)
  if (is_healthy !== true && is_healthy !== false && is_healthy !== null) {
    return res
      .status(400)
      .json({ error: "is_healthy must be true, false, or null." });
  }

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

// route to search sightings within a certain data range
export const searchSightings = async (req, res) => {
  const { start_date, end_date } = req.query; // get the query parameters
  try {
    let query = ` SELECT 
    individuals.id, 
    individuals.nickname,
    species.common_name AS species, 
    COUNT(sightings.id) AS sightings_count, 
    MAX(sightings.sighting_date) AS recent_sighting,  
    (SELECT location FROM sightings WHERE individual_id = individuals.id ORDER BY sighting_date DESC LIMIT 1) AS recent_sighting_location
    FROM individuals 
    LEFT JOIN sightings ON sightings.individual_id = individuals.id
    JOIN species ON individuals.species_id = species.id`;

    let queryParams = []; // this array will store query parameters

    // if both start_date and end_date are provided, filter by date range
    if (start_date && end_date) {
      query += ` WHERE sightings.sighting_date BETWEEN $1 AND $2 `;
      queryParams.push(start_date, end_date);
    }

    // now we add the GROUP BY clause after filtering by date
    query += ` GROUP BY individuals.id, species.common_name `;

    // sort the results by sighting date (most recent first)
    query += " ORDER BY recent_sighting DESC;";

    // execute the query
    const { rows: sightings } = await db.query(query, queryParams);
    res.json(sightings); // Send the filtered data as a JSON response
  } catch (e) {
    console.error(e);
    return res.status(400).json({ error: "Error fetching sightings." });
  }
};

// route to get individual details
export const getIndividualDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT 
         individuals.nickname,
         species.*,
         COUNT(sightings.id) AS sightings_count,
         MIN(sightings.sighting_date) AS first_sighting,
         MAX(sightings.sighting_date) AS recent_sighting,
        (SELECT location FROM sightings WHERE individual_id = individuals.id ORDER BY sighting_date ASC LIMIT 1) AS first_sighting_location,
        (SELECT location FROM sightings WHERE individual_id = individuals.id ORDER BY sighting_date DESC LIMIT 1) AS recent_sighting_location
        FROM individuals
        JOIN species ON individuals.species_id = species.id
        LEFT JOIN sightings ON sightings.individual_id = individuals.id
        WHERE individuals.id = $1
        GROUP BY individuals.id, species.id;
    `;

    const { rows: details } = await db.query(query, [id]);

    if (details.length === 0) {
      return res.status(404).json({ error: "Individual not found" });
    }
    res.json(details);
  } catch (e) {
    return res.status(400).json({ error: "Error fetching details." });
  }
};

// route to get individual
export const getIndividuals = async (req, res) => {
  try {
    const query = `SELECT id, nickname FROM individuals ORDER BY id;`;
    const { rows: individuals } = await db.query(query);
    res.json(individuals);
  } catch (e) {
    return res.status(400).json({ error: "Error fetching individuals." });
  }
};
