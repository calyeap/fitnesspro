const express = require("express");
const methodOverride = require("method-override");
const pg = require("pg");

// Initialise postgres client
const configs = {
  user: "cyeap",
  host: "127.0.0.1",
  database: "fitness",
  port: 5432
};

const pool = new pg.Pool(configs);

pool.on("error", function(err) {
  console.log("idle client error", err.message, err.stack);
});



/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(methodOverride("_method"));

// Set react-views to be the default view engine
const reactEngine = require("express-react-views").createEngine();
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", reactEngine);

//Hash
const sha256 = require("js-sha256");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

/*
 * ===========================================
 * ===========================================
 * ===========================================
 * ===========================================
 * ===========================================
 * ===========================================
 * ===========================================
 */

 //REGISTRATION//
app.post('/registration', (request, response) => {
  console.log( request.body );

  let query = 'INSERT INTO users (username, password) VALUES ($1, $2)';

  const values = [request.body.username, sha256(request.body.password)];

  pool.query(query, values, (errorObj, result) => {

    if( errorObj ){
      console.log( "Something went wrong!");
      console.log( errorObj );
    }

    console.log("Query done");
    response.redirect('/login');
  });
});

//LOGIN//
    console.log( request.body );


  let query = "SELECT * FROM users WHERE username ='"+request.body.username+"'";

  pool.query(query, (errorObj, result) => {

    console.log( result.rows );
    if( result.rows.length >= 1){
      // name is correct
        if( sha256(request.body.password) === result.rows[0].password ){
          // password is correct
          response.cookie('loggedIn', true);
          response.redirect('/home');

        }else{
          response.send('password was wrong');
        }

    }else{
      response.send('User or password was not found!');
    }
  });
});

//Home Page

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/home', (request, response) => {
    response.render('home');
});

app.get('/registration', (request, response) => {
    response.render('registration');
});

app.get('/login', (request, response) => {
  response.render('login');
});

// handle requests


const server = app.listen(3000, () =>
  console.log("~~~ Tuning in to the waves of port 3000 ~~~")
);

let onClose = function() {
  console.log("closing");

  server.close(() => {
    console.log("Process terminated");

    pool.end(() => console.log("Shut down db connection pool"));
  });
};

process.on("SIGTERM", onClose);
process.on("SIGINT", onClose);
