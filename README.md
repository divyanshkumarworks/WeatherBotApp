# Telegram Weather Bot with Admin Panel

This project is an implementation of a Telegram bot that allows users to subscribe to daily weather updates and an admin panel for managing bot settings and user accounts. The stack includes NestJS, ReactJS, and Node.js.

### Demo
Link Telegram Bot Handle: [https://web.telegram.org/k/#@Johny2404_bot](https://web.telegram.org/k/#@Johny2404_bot)

![Screenshot 2023-10-13 033629](https://github.com/divyanshkumarworks/WeatherBotApp/assets/134360630/f5614945-a858-4ae8-8c7e-fd456ca27bdb)


**Note:** Bot is set to give daily updates in the morning at 8 A.M. . Change it according to your needs 

## Features
**Weather Subscription**

Users can subscribe to receive daily weather updates.
Weather data is retrieved from a weather API (e.g., OpenWeatherMap).
Subscribed users receive daily updates with weather information.

**Admin Panel**

Admins can log in using their Google accounts to access the admin panel.
Admins can update bot settings, including API keys for weather data.
Admins can manage user accounts, such as blocking or deleting users.

## Technologies Used
* NestJS: A framework for building scalable and efficient server-side applications.
* ReactJS: A JavaScript library for building user interfaces.
* Node.js: A runtime for executing JavaScript code on the server.
* Telegram Bot API: For creating and interacting with Telegram bots.
* OAuth (Google Login): For securing the admin panel with Google authentication.
* Database (e.g., MongoDB, PostgreSQL): To store user data and bot settings.
* Weather API (e.g., OpenWeatherMap): To fetch weather data for updates.

## Project Structure
The project is divided into two main components:

**1. Telegram Bot (NestJS)**

* Handles user subscriptions and weather updates.
* Integrates with the Telegram Bot API.
* Connects to a database for user management.
* Provides RESTful endpoints for the admin panel.

**2. Admin Panel (ReactJS)**

* A web-based interface for administrators.
* Allows admins to log in using Google OAuth.
* Provides options to update bot settings and manage users.

## Getting Started
### Installation
1. Clone the repository:

```bash
git clone https://github.com/yourusername/telegram-weather-bot.git
```
2. Install server dependencies (NestJS):

```bash
cd server
npm install
```

3. Install client dependencies (ReactJS):

```bash
cd client
npm install
```

### Running the Project
1. Start the NestJS server:

```bash
cd server
npm start
```

2. Start the ReactJS client:

```bash
cd client
npm start
```

3. Access the admin panel at http://localhost:3000.
4. Access the nestjs server at http://localhost:4000 or http://127.0.0.1:4000

## Deployment
You can deploy the server and client on platforms like Heroku, AWS, or Vercel. Ensure you set up environment variables in your hosting environment.

## Usage
* Users can interact with the Telegram bot by searching for it on Telegram and subscribing for weather updates.
* Admins can log in to the admin panel using their Google accounts, manage bot settings, and user accounts.
