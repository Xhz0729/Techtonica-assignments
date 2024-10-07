# 📝 MY BLOG APP

This blog app is a full-stack web application where users can register, log in, and interact with blog posts. The app offers core features like viewing a list of posts, viewing post details, and is currently in the process of integrating an AI-powered summarization feature for condensing long blog posts using the OpenAI API.

## 📌 Project Features

- **Register a New Blog User**: New users can sign up with their email, username, and password to create an account.
- **Login Feature**: Registered users can log in to access the blog posts and their account.
- **Show Posts Feature**: After logging in, users can view a list of all available blog posts.
- **Show Detailed Posts Feature**: Clicking on a post displays detailed information, including the title, content, and any associated images.
- **AI-Powered Post Summarization (In Progress)**:Integration with OpenAI to automatically summarize lengthy posts into a more concise form for easier reading.

## 🚀 Technologies Used

- **Frontend**: React
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Styling**: Custom CSS for a clean and modern UI

## demos

![Blog Demo](blog_demo.gif)
_User starts with log in and see posts_

## 🛠️ Setup and Installation

### Prerequisites

- Node.js
- PostgreSQL

### 1. Clone the repository

```bash
git clone https://github.com/Xhz0729/techtonica-assignments.git
cd techtonica-assignments
cd my-blog-app
```

### 2. Install dependencies

#### Backend (server)

```bash
cd server
npm install
```

#### Frontend (client)

```bash
cd client
npm install
```

### 3. Setup PostgreSQL Database

Run the SQL commands provided in `db.sql` to set up the database schema.

### 4. Configure Environment Variables

In the `/server` folder, create a `.env` file to store your database credentials:

```
DATABASE_URI="postgresql://localhost/YOUR_DATABASE_NAME"
```

### 5. Start the Development Server

#### Backend

```bash
cd server
npm run dev
```

## 🤝 Contributions

Feel free to submit pull requests or suggest improvements. All contributions are welcome!
