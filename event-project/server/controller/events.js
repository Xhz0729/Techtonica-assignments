import db from "../db/db-connection.js";

// get all events
export const getEvents = async (req, res) => {
  try {
    const { rows: events } = await db.query("SELECT * FROM events");
    res.send(events);
  } catch (e) {
    return res.status(400).json({ e });
  }
};

// add an event
export const addEvent = async (req, res) => {
  try {
    const newEvent = {
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
    };
    const result = await db.query(
      "INSERT INTO events(name, description, date, location) VALUES($1, $2, $3, $4) RETURNING *",
      [newEvent.name, newEvent.description, newEvent.date, newEvent.location]
    );
    res.json(result.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
};

// delete an event
export const deleteEventById = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM events WHERE id=$1", [id]);
    res.json(` Event with ID ${id} has been deleted!`);
    res.status(200).end();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
};

// update an event
export const changeEventById = async (req, res) => {
  const { id } = req.params;
  const updatedEvent = {
    name: req.body.name,
    description: req.body.description,
    date: req.body.date,
    location: req.body.location,
    is_favorited: req.body.is_favorited,
  };
  const query = `UPDATE events SET name=$1, description=$2, date=$3, location=$4, is_favorited=$5 WHERE id=$6 RETURNING *`;
  const values = [
    updatedEvent.name,
    updatedEvent.description,
    updatedEvent.date,
    updatedEvent.location,
    updatedEvent.is_favorited,
    id,
  ];

  try {
    const updated = await db.query(query, values);
    res.json(updated.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
};

// Toggle favorite status of an event by ID
export const toggleFavoriteById = async (req, res) => {
  const { id } = req.params;
  try {
    // First, fetch the current favorite status of the event
    const { rows } = await db.query(
      "SELECT is_favorited FROM events WHERE id=$1",
      [id]
    );
    const currentStatus = rows[0].is_favorited;
    // Toggle the favorite status
    const updatedStatus = !currentStatus;
    // Update the event with the new favorite status
    const result = await db.query(
      "UPDATE events SET is_favorited=$1 WHERE id=$2 RETURNING *",
      [updatedStatus, id]
    );
    res.json(result.rows[0]); // Return the updated event
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: e.message });
  }
};

// show liked event
export const getLikedEvent = async (req, res) => {
  try {
    const { rows: events } = await db.query(
      "SELECT * FROM events WHERE is_favorited = True"
    );
    res.send(events);
  } catch (e) {
    return res.status(400).json({ e });
  }
};

// search Events
export const searchEvent = async (req, res) => {
  const { term } = req.query;
  try {
    const result = await db.query(
      "SELECT * FROM events WHERE name ILIKE $1 OR location ILIKE $1",
      [`%${term}%`]
    );
    res.json(result.rows);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: e.message });
  }
};