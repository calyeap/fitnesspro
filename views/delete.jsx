// var React = require("react");
// var DefaultLayout = require("./layouts/default");
// //delete page is wrong!
// class Delete extends React.Component {
//   render() {
//     let formAttribute = `/pokemon/${this.props.id}?_method=DELETE`;

//     return (
//       <DefaultLayout title="Delete Existing Workout">
//         <form method="POST" action={formAttribute}>
//           <h1>Delete Existing Workout - {this.props.description}</h1>
//           Description: <label> {this.props.description} </label>
//           <br />
//           Date: <label> {this.props.date} </label>
//           <br />
//           <input type="hidden" name="id" value={this.props.id} />
//           <br />
//           <input
//             className="btn btn-danger"
//             type="submit"
//             value="Do you want to delete existing workout?"
//           />
//         </form>
//         <a className="btn btn-info back" href="/home">
//           Back to homepage
//         </a>
//       </DefaultLayout>
//     );
//   }
// }

// module.exports = Delete;
