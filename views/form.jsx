var React = require('react');
var DefaultLayout = require('./layouts/default');
class Form extends React.Component {
  render() {
    return (
      <html>
        <h1>{this.props.header}</h1>
        <br/>
        <form action={this.props.action} method="POST">
          <input name="username" placeholder="name"/> <br />
          <input type="text" name="description" placeholder="describe"/><br />
          <input name="date" type="date" min="2019-04-21" max="2019-12-31"/><br />
          <input className="btn btn-success" type="submit" value="Add" />
          <a href="/home">  Back</a>
        </form>
      </html>
    )
  }
}
module.exports = Form;