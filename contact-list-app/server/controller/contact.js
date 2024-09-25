import db from "../db/db-connection.js";
// get all contacts
export const getContact = async (req, res) => {
  try {
    const { rows: contacts } = await db.query("SELECT * FROM contact");
    res.send(contacts);
  } catch (e) {
    return res.status(400).json({ error: "Error fetching contacts" });
  }
};

// get all contacts with details
export const getContactDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
    SELECT 
      c.first_name, 
      c.last_name, 
      c.email, 
      c.phone_number, 
      a.street, 
      a.city, 
      a.state, 
      a.zip_code, 
      a.country, 
      n.notes,
      n.image_url
    FROM contact c
    LEFT JOIN address a ON c.id = a.contact_id
    LEFT JOIN note n ON c.id = n.contact_id
    WHERE c.id = $1;
  `;
    const { rows: details } = await db.query(query, [id]);
    if (details.length === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json(details);
  } catch (e) {
    return res.status(400).json({ error: "Error fetching details." });
  }
};

// add a new contact to my db
export const addContact = async (req, res) => {
  let { first_name, last_name, email, phone_number } = req.body;

  // trim inputs
  first_name = first_name.trim();
  last_name = last_name.trim();
  email = email.trim();

  // required fields validation
  if (!first_name || !last_name || !email) {
    return res.status(400).json({ error: "Required fields are missing." });
  }

  // validate email format
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  // validate first_name and last_name are strings
  if (typeof first_name !== "string") {
    return res.status(400).json({ error: "First name should be a string" });
  }

  if (typeof last_name !== "string") {
    return res.status(400).json({ error: "Last name should be a string" });
  }

  // validate phone number
  const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
  if (phone_number && !phoneRegex.test(phone_number)) {
    return res.status(400).json({ error: "Invalid phone format." });
  }

  // if all validations passes, insert the new contact
  try {
    const newContact = await db.query(
      "INSERT INTO contact (first_name, last_name, email, phone_number) VALUES ($1, $2, $3, $4) RETURNING *",
      [first_name, last_name, email, phone_number]
    );
    res.status(201).json(newContact.rows[0]);
  } catch (error) {
    console.error("Error adding contact:", error);
    res.status(400).json({ error: "Error adding a new contact" });
  }
};

// delete a contact
export const deleteContactById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      "DELETE FROM contact WHERE id=$1 RETURNING id",
      [id]
    );

    //deletion check
    if (result.rowCount === 0) {
      return res.status(404).json({ error: `Contact with ID ${id} not found` });
    }

    res
      .status(200)
      .json({ message: `Contact with ID ${id} has been deleted!` });
  } catch (e) {
    console.error("Error deleting a contact:", e);
    res.status(500).json({ error: "Error deleting a contact" });
  }
};

// update a contact
export const changeContactById = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, phone_number } = req.body;

  const query = `
      UPDATE contact 
      SET first_name = $1, last_name = $2, email = $3, phone_number = $4 
      WHERE id = $5 
      RETURNING *;
    `;
  const values = [first_name, last_name, email, phone_number, id];

  try {
    const updated = await db.query(query, values);

    // check if any row was updated
    if (updated.rowCount === 0) {
      return res.status(404).json({ error: `Contact with ID ${id} not found` });
    }

    res.status(200).json(updated.rows[0]); // return the updated contact
  } catch (e) {
    console.error("Error updating a contact:", e);
    res.status(500).json({ error: "Error updating a contact" });
  }
};
