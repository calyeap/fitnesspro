var React = require('react');
var DefaultLayout = require('./layouts/default');
class Home extends React.Component {

  render() {

    let activities = this.props.activities
      .sort(this.props.activities.date)
      .reverse()
      .map(activity => {
        return (
          <div>
            <b>
              {new Intl.DateTimeFormat("en-GB", {
                weekday: "long"
              }).format(activity.date)}{" "}
            </b>
            {activity.description}{" "}
            <a
              class="btn btn-success btn-sm"
              href={`/activities/${activity.id}/edit`}
            >
              Edit workout
            </a>
          </div>
        );
      });

    return (
      <html>
        <DefaultLayout title="Routine List">
          <div className="container">
            <div className="row">
              <h1> My Gym Planner</h1>
          
              <a
                class="btn btn-primary btn-sm col-2"
                href="/activities/new"
              >
                Add new workout
              </a>
              <a
                class="btn btn-warning btn-sm col-2"
                href="/activities/delete"
              >
                Delete workout
              </a>
              <a class="btn btn-danger btn-sm col-2" href="/login">
                Log Out
              </a>
            </div>

            <div className="row col-lg-6 ">
              <dl>
                <dd> {activities}</dd>
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