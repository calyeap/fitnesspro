var React = require('react');
var DefaultLayout = require('./layouts/default');
class Home extends React.Component {

  render() {

    let activities = this.props.activities.map((activity) => {
      return (
        <div>{activity.description}</div>
      )
    })

    return (
      <html>
        <DefaultLayout title="Routine List">
          <div className="container">
            <div className="row">
              <h1> My Gym Planner</h1>
              <div class="col-1" />
              <a
                class="btn btn-primary btn-md col-2"
                href="/activities/new"
              >
                Add new workout
              </a>
              <a
                class="btn btn-success btn-md col-2"
                href="/activities/edit"
              >
                Edit workout
              </a>
              <a class="btn btn-danger btn-md col-2" href="/login">
                Log Out
              </a>
            </div>

            <div className="row col-lg-6 ">
              <dl>
                <dt>
                  {" "}
                  <u>Monday</u>{" "}
                </dt>
                <dd> {activities}</dd>
                <dt>
                  <u>Tuesday</u>
                </dt>
                <dd>{activities}</dd>
              </dl>
            </div>
          </div>
        </DefaultLayout>
      </html>
    );
  }
}





<div class="container">
  <h1>Description Lists</h1>
  <p>The dl element indicates a description list:</p>
  <dl>
    <dt>Coffee</dt>
    <dd>- black hot drink</dd>
    <dt>Milk</dt>
    <dd>- white cold drink</dd>
  </dl>
</div>;

module.exports = Home;