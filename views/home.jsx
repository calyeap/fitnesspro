var React = require('react');
var DefaultLayout = require('./layouts/default');
class Home extends React.Component {

  render() {
    let activities = this.props.activities.map(activity => {

      const ticks = activity.completion ? "✔":"❌"
      const putAction=`/activities/changeTick/${activity.id}/${ticks}?_method=PUT`
      const deleteEntry = `/home/deleteRow/${activity.id}
        ?_method=DELETE`
         
        return (
<tr>
    <td> {new Intl.DateTimeFormat("en-GB", {
                weekday: "long"
              }).format(activity.date)}</td>
    <td>{activity.description}</td>

      <td>
        <form method="POST" action={putAction}>
        <input type="submit" value={ticks}/>
        </form>
          <a
              class="btn btn-warning btn-sm"
              href={`/activities/${activity.id}/edit`}
            >
              📝
            </a>

        <form method="POST" action={deleteEntry}>
        <input type="submit" value="🗑️"/>
        </form>

      </td>
</tr>

)})

    return (
      <html>

        <head>
        <link rel="stylesheet" href="/style.css"></link>
        <title>Routine</title>
        </head>

        <body>
          <DefaultLayout title="Routine List">
            <div className="container">
              <div className="row justify-content-center">
                
                <div class= "row col-lg-10 col-md-10 col-sm-10 justify-content-center">

                  <h1> My Gym Planner</h1>


                </div>

                    <a
                    class="btn btn-success btn-sm col-3"
                    href="/activities/new"
                    >
                    Add new workout
                    </a>
                      <a
                    class="btn btn-danger btn-sm col-3"
                    href="/logout">
                    Logout
                    </a>

                  <div class= "row col-lg-12 col-md-12 col-sm-12 justify-content-center">
                <table id = "workoutTable">
                  <tr>
                    <th>Day</th>
                    <th>Description</th>
                    <th>Status</th>
                  </tr> 
                  {activities}
                </table>
                  </div>





              </div>
            </div>
          </DefaultLayout>
        </body>
      </html>
    );
  }
}

module.exports = Home;