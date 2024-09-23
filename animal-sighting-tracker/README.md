# 🐾 Animal Sighting Tracker

This **Animal Sighting Tracker** is a full-stack web application that allows users to track sightings of endangered animal species. Users can view individual animal details, add new sightings, and search for sightings within a certain date range. The application uses the **PERN stack** (PostgreSQL, Express, React, Node.js) to handle both the frontend and backend, with data stored in a PostgreSQL database.

## 🌿 Project Features

- **Record sightings**: Users can add sighting record when and where individual animals were sighted.
- **View detailed information**: The app shows detailed information for each individual animal, including first and recent sightings, sighting count, and species data.
- **Search for sightings**: Users can search for animal sightings within a given date range.

## 🚀 Technologies Used

- **Frontend**: React
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Styling**: Custom CSS for a clean and modern UI

## demos

![Show Details](demo/details.gif)
_User click the view details to view details of each individual_

![Search Sightings](demo/search.gif)
_User gives a start date and a end date to search sightings happen during this period_

## 🗂️ Folder Structure

```
/client              # React frontend
  /components        # React components
  /App.js            # Main app component
  /index.js          # React DOM rendering
  /App.css           # Styles for the app

/server              # Node.js/Express backend
  /controllers       # Express route controllers
  /routes            # Express API routes
  /db                # Database connection and queries
  /server.js         # Main entry point for the backend
```

## 🛠️ Setup and Installation

### Prerequisites

- Node.js
- PostgreSQL

### 1. Clone the repository

```bash
git clone https://github.com/Xhz0729/techtonica-assignments.git
cd techtonica-assignments
cd animal-sighting-tracker
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

Create a PostgreSQL database named animals and add the necessary tables for **species**, **individuals**, and **sightings**.

Run the SQL commands provided in `db.sql` to set up the database schema.

### 4. Configure Environment Variables

In the `/server` folder, create a `.env` file to store your database credentials:

```
DATABASE_URI="postgresql://localhost/animals"
```

### 5. Start the Development Server

#### Backend

```bash
cd server
npm run dev
```

## 🔍 Features Breakdown

### Homepage

- **Add Sighting**: Submit a new sighting of an individual animal, complete with details like date, location, and health status.
- **Search Sightings**: Search for sightings within a certain date range.
- **View Sightings**: Display a list of all recent sightings, including the species and individual details.

### Individual Detail Page

- **View Details**: See information about a specific individual, including first and recent sightings, sighting count, and species information (such as scientific name and conservation status).

## 🤝 Contributions

Feel free to submit pull requests or suggest improvements. All contributions are welcome!
