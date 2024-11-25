import express from "express";
import rootRouter from "./routes/root.mjs";
import userRouter from "./routes/user.mjs";
import { connectdb } from "./config/conectdb.mjs";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import session from 'express-session';
import dotenv from 'dotenv';
dotenv.config(); // Nạp biến môi trường từ .env
 // Nạp biến môi trường từ .env
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));

// Hardcoded credentials (admin username and password)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';  // You can change this or retrieve from a database

// Route to show the login page
app.get('/login', (req, res) => {
  res.render('login', { title: 'Login Page' });   // Ensure 'login.ejs' is in the views folder
});

// Route to handle login form submission
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the credentials are correct
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Store the username in the session to track the login state
    req.session.loggedIn = true;
    req.session.username = username;

    // Redirect to the users page
    res.redirect('/users');
  } else {
    // If credentials are incorrect, send back an error message
    res.send('Invalid credentials, please try again.');
  }
});

// Connect to the database
connectdb();

// Middleware for methodOverride (for PUT, DELETE)
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

// parse application/json
app.use(bodyParser.json());

// Set view engine and views directory
app.set("view engine", "ejs");
app.set("views", "./views");

// Serve static files (like CSS, JS, images) from "public" folder
app.use(express.static("public"));

// Use the routers
app.use("/", rootRouter);
app.use("/users", userRouter);

// Start the server
app.listen(port, () => {
  console.log("Server started on http://localhost:" + port);
});
