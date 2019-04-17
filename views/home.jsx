var React = require('react');

class Home extends React.Component {

  render() {
    return (

      <DefaultLayout title="Add New Workout">
        <form className="add" action="/home" method="POST">
          <h1>Add New Routine</h1>
          Name: <input className="form-control" name="name" /><br />
          Height: <input name="height" /><br />
          Weight: <input name="weight" /><br />
          Pokemon Type: <Type types={this.props.allPokemonType} /><br /><br />
          <input className="btn btn-success" type="submit" value="Add new Pokemon" />
        </form>
        <a className="btn btn-info back" href="/home">Back to Pokedex</a>
      </DefaultLayout>

    );
  }
}

module.exports = Home;