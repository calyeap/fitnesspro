var React = require('react');
var DefaultLayout = require('./layouts/default');
var Form = require('./form');

class Edit extends React.Component {
  render() {
    return (
      <DefaultLayout title="Edit Activity">
        <div className="col-lg-6 offset-lg-3">
          <Form header="Edit an activity">
          </Form>

        </div>
      </DefaultLayout>
    );
  }
}

module.exports = Edit;