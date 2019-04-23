var React = require("react");

class Registration extends React.Component {

  render() {
    return (
      <html>
        <head>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
            integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
            crossorigin="anonymous"
          />
          <link rel="stylesheet" href="/style.css"></link>

          <title>Registration</title>
        </head>

        <div className="col-md-6 offset-md-5">
          <body>
            <img src="/logo.png"></img>
            <h1>Registration</h1>

            <form method="POST" action="/registration">
              <h5>Choose your username </h5>
              <input name="username" placeholder="Username" /> <br />
              <h5>Choose your password</h5>
              <input
                type="password"
                name="password"
                placeholder="Password"
              />{" "}
              <br />
              <br />
              <input type="submit" class="btn btn-primary col-md-3 " />
            </form>
          </body>
        </div>
      </html>
    );
  }
}

module.exports = Registration;