import db from "../db/db-connection.js";
import bcrypt from "bcrypt";
// register a new user
export const newUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if the user already exists
    const userCheck = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    const newUser = await db.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login user
export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user exists
    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Check if the password matches
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }
    res.status(200).json({ message: "Login successful", user: user.rows[0] });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to get posts by the logged-in user
export const getUserPosts = async (req, res) => {
  const { userId } = req.params;

  try {
    const userPosts = await db.query(
      "SELECT * FROM posts WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    res.status(200).json(userPosts.rows);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to get details
// Get post details by post_id
export const getUserPostsDetails = async (req, res) => {
  const { postId } = req.params;
  try {
    const postDetails = await db.query(
      'SELECT p.title, pd.details, pd.image_url FROM posts p JOIN post_details pd ON p.id = pd.post_id WHERE p.id = $1',
      [postId]
    );

    if (postDetails.rows.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(postDetails.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
