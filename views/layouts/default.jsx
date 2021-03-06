var React = require('react');


class DefaultLayout extends React.Component {
  render(){

  
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous" />
          <link rel="stylesheet" href="style.css" />
          
          
        </head>



            
        <body>
          <div className="container-fluid">
            <div className="row">
          {this.props.children}
            </div>

          </div>
        </body>
        
      </html>
    );
  }
}

module.exports = DefaultLayout;