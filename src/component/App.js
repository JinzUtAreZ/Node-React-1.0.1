import React, { Component } from 'react';
// import BSTable from './BootStrapTable';

class App extends Component {
    constructor(props) {
      super(props);
       this.state = {
        items: []
      };
    }

    componentDidMount() {
      fetch(`/api/dataload`)
      //fetch(`https://jsonplaceholder.typicode.com/users`)
        .then(res => res.json())
        .then(json => { 
          this.setState({ 
            items: json.recordset
          })
      })
      //.catch(err => console.log(err));
    }
  
    // callApi = async () => {
    //   const response = await fetch('/api/hello');
    //   const body = await response.json();
  
    //   if (response.status !== 200) throw Error(body.message);
  
    //   return body;
    // };

    render() {
      //console.log(this.state);
      var { items } = this.state;
      return (
        <div className="App">
            {/* <BSTable data={this.state}/> */}
            <ul>
                {items.map(item =>(
                    <li key={item.RowID}>
                      {item.StatusDesc} --- {item.StartTime}
                      </li>
                ))};
            </ul>
        </div>
      );
    }
  }
  
  export default App;