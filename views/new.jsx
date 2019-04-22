var React = require('react');
var DefaultLayout = require('./layouts/default');
var Form = require('./form');

class New extends React.Component {
  render() {
    return (
      <DefaultLayout title="New Activity">
        <div className="col-lg-6 offset-lg-3">
          <Form header="Add a new activity" action="/activities/new">
          </Form>
         
        </div>
      </DefaultLayout>
    );
  }
}

module.exports = New;