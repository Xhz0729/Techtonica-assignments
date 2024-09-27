# ☎️ Contact List App

The **Contact List App** is a full-stack web application for managing contacts. Users can add, view, edit, and delete contacts, with options to view details like profile photos, addresses, and notes. Built using the PERN stack (PostgreSQL, Express, React, Node.js), the app stores contact data in a PostgreSQL database and provides a user-friendly interface for contact management.

## Project Features

- **View Contacts:** Display basic information like name and email.
- **View Contact Details:** Access additional details, such as address and notes.
- **Add New Contact:** Create a new contact record.
- **Edit Contact:** Update existing contact information.
- **Delete Contact:** Remove a contact from the list.

## Technologies Used

- **PostgreSQL**: Database management for storing contact information.
- **Express**: Backend framework to handle API requests and server-side logic.
- **React**: Frontend framework for building a dynamic user interface.
- **Node.js**: Server environment for running the backend application.
- **Jest**: Testing framework for unit and integration tests.
- **CSS**: Styling for a responsive and modern user interface.

## Demos

![Add A New Contact](demos/add_contact.gif)
_User fill the input fields to add a new contact_
![View Contact Details ](demos/show_details.gif)
_User clicks the view detail to see contact details_

## 🛠️ Setup and Installation

### Prerequisites

- Node.js
- PostgreSQL

### 1. Clone the repository

```bash
git clone https://github.com/Xhz0729/techtonica-assignments.git
cd techtonica-assignments
cd contact-list-app
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

Create a PostgreSQL database and add the necessary tables for **contact**, **address** and **note**.

Run the SQL commands provided in `db.sql` to set up the database schema.

### 4. Configure Environment Variables

In the `/server` folder, create a `.env` file to store your database credentials:

```
DATABASE_URI="postgresql://localhost/<your_database_name>"

```

### 5. Start the Development Server

```bash
cd server
npm run dev
```

## 🤝 Contributions

Feel free to submit pull requests or suggest improvements. All contributions are welcome!
