var React = require('react');
var DefaultLayout = require('./layouts/default');

class Login extends React.Component {
    render(){
      return (
        //every page should be wrapped with defaultlayout to include global code
        //title will be dynamic change to whatever is named in title type
        //use tuner assignment to add form in
      <DefaultLayout title="Login">
      <div className="col-md-3 offset-md-5">
      </div>
        <div className="col-md-3 offset-md-5">
          <form action="/login" method="POST">
            <div class="form-group">
                    <label for="exampleInputEmail1">Username</label>
                    <input type="text"  name="username" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                  placeholder="username"/>
                      <small id="emailHelp" class="form-text text-muted">We'll never share your details with anyone else.</small>
            </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" name="password" />
            </div>
                      <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                          <label class="form-check-label" for="exampleCheck1">Remember my details</label>
            </div>
              <button type="submit" class="btn btn-primary">Submit</button>
              <a class="btn btn-warning" href="/registration">Register</a>
          </form>
        </div>
      </DefaultLayout>
      );
    }
}

module.exports = Login;