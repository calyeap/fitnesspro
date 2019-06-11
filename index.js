const express = require("express");
const methodOverride = require("method-override");
const pg = require("pg");

// inside of db.js

//require the url library
//this comes with node, so no need to yarn add
const url = require("url");

//check to see if we have this heroku environment variable
if (process.env.DATABASE_URL) {
  //we need to take apart the url so we can set the appropriate configs

  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(":");

  //make the configs object
  var configs = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split("/")[1],
    ssl: true
  };
} else {
  //otherwise we are on the local network
  var configs = {
    user: "cyeap",
    host: "127.0.0.1",
    database: "fitness",
    port: 5432
  };
}

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
app.use(express.static("/"));

// Set react-views to be the default view engine
const reactEngine = require("express-react-views").createEngine();
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", reactEngine);

//Hash
const sha256 = require("js-sha256");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.static("public"));

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
app.post("/registration", (request, response) => {
  console.log(request.body);

  let query = "INSERT INTO users (username, password) VALUES ($1, $2)";

  const values = [request.body.username, sha256(request.body.password)];

  pool.query(query, values, (errorObj, result) => {
    if (errorObj) {
      console.log("Something went wrong!");
      console.log(errorObj);
    }

    console.log("Query done");
    response.redirect("/login");
  });
});

//LOGIN//
app.post("/login", (request, response) => {
  console.log(request.body);

  let query =
    "SELECT * FROM users WHERE username ='" + request.body.username + "'";

  pool.query(query, (errorObj, result) => {
    console.log(result.rows);
    if (result.rows.length >= 1) {
      // name is correct
      if (sha256(request.body.password) === result.rows[0].password) {
        // password is correct
        response.cookie("currentUser", request.body.username);
        response.cookie("loggedIn", true);
        response.redirect("/home");
      } else {
        response.render("login", { donald: "trump" });
      }
    } else {
      response.render("login", { donald: "trump" });
    }
  });
});


//Home Page
app.post("/home", (request, response) => {
  console.log(request.body);

  let query = "INSERT INTO activities (description, date) VALUES ($1, $2)";

  const values = [request.body.description, request.body.date];

  pool.query(query, values, (errorObj, result) => {
    if (errorObj) {
      console.log("Something went wrong!");
      console.log(errorObj);
    }

    console.log("Query done");
    response.redirect("/home");
  });
});

//Delete
app.delete("/home/deleteRow/:id", (request, response) => {
  console.log(request.params);

  let query = `DELETE FROM activities WHERE id=${request.params.id}`;

  pool.query(query, (errorObj, result) => {
    if (errorObj) {
      console.log("REEEEELETED");
      console.log(errorObj);
    }

    console.log("Entry has been deleted");
    response.redirect("/home");
  });
});

//New Form Page
app.post("/activities/new", (request, response) => {
  console.log(request.body);

  let query =
    "INSERT INTO activities (description, date, username) VALUES ($1, $2, $3)";

  const values = [
    request.body.description,
    request.body.date,
    request.body.username
  ];

  pool.query(query, values, (errorObj, result) => {
    if (errorObj) {
      console.log("Something went wrong!");
      console.log(errorObj);
    }

    console.log("Query done");
    response.redirect("/home");
  });
});

//Edit Form Page
app.post("/activities/:id/edit", (request, response) => {
  const values = [
    request.body.description,
    request.body.date,
    request.body.username,
    request.params.id
  ];
  const query = `UPDATE activities
                    SET description = $1, date = $2, username = $3
                    WHERE id = $4 RETURNING *`;

  pool.query(query, values, (errorObj, result) => {
    if (errorObj) {
      console.log("Something went wrong!");
      console.log(errorObj);
    }

    console.log("Query done");
    response.redirect("/home");
  });
});

//Tick
app.put("/activities/changeTick/:id/:completion", (request, response) => {
  console.log(request.params);

  const newData = request.params.completion == "❌" ? true : false;

  let query = `UPDATE activities SET completion = ${newData} WHERE id = ${
    request.params.id
  }`;

  pool.query(query, (errorObj, result) => {
    if (errorObj) {
      console.log("REEEEEAID");
      console.log(errorObj);
    }

    console.log("Workout completed");
    response.redirect("/home");
  });
});

const activitiesInfo = (user, response) => {
  console.log(user);
  const queryStr = `SELECT * FROM activities WHERE username = '${user}' ORDER BY id ASC`;

  pool.query(queryStr, (err, res) => {
    if (err) {
      console.log("Something went wrong!!!!");
      console.log(err);
    }

    response.render("home", { activities: res.rows });
  });
};

/**
 * ===================================
 * Routes
 * ===================================
 */

 app.get("/", (request, response) => {
   response.redirect("login");
 });

app.get("/home", (request, response) => {
  activitiesInfo(request.cookies.currentUser, response);
});

app.get("/registration", (request, response) => {
  response.render("registration");
});

app.get("/login", (request, response) => {
  response.render("login");
});

app.get("/activities/new", (request, response) => {
  response.render("new");
});
app.get("/activities/:id/edit", (request, response) => {
  response.render("edit");
});
app.delete("/activities/:id", (request, response) => {
  response.render("delete");
});

app.get("/logout", (request, response) => {
  response.cookie("currentUser", null);
  response.cookie("loggedIn", false);
  response.render("login");
});

// handle requests

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () =>
  console.log("~~~ Tuning in to the waves of port " + PORT + " ~~~")
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
