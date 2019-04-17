var React = require('react');
var DefaultLayout = require('./layouts/default');
class Login extends React.Component {
    render(){
      return (
        //every page should be wrapped with defaultlayout to include global code
        //title will be dynamic change to whatever is named in title type
        //use tuner assignment to add form in
      <DefaultLayout title="Login">

        <form action="/login" method="POST">
          <div class="form-group">
                  <label for="exampleInputEmail1">Username</label>
                  <input type="text"  name="username" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                 placeholder="username"/>
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" name="password" />
          </div>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
          </div>
                      <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        </DefaultLayout>
      );
    }
}

module.exports = Login;