import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
// import BSTable from './BootStrapTable';

class App extends Component {
    constructor(props) {
      super(props);
       this.state = {
        items: [],
        error: null
      };
    }
    
    componentDidMount() {
      //fetch(`http://localhost:3004/writers`) // temp server in sample.json
      fetch(`/api/assetdata`)
      //fetch(`/api/dataload`) //live server to
      //fetch(`https://jsonplaceholder.typicode.com/users`)
        .then(response => { //res.json())
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Something went wrong ...');
          }
        })
        .then(json => this.setState({ 
                        items: json.recordset
                  }))
        .catch(error => this.setState({ 
            error }))
    }
    
    HandleClick = () => ({


    })

    render() {
      //console.log(this.state);
      const { items, error } = this.state;
      if (error) {
        return <p>{error.message}</p>;
      }

      return (
        <div className="App">
            {/* <ul>
                {items.map(item =>(
                    <li key={item.JOid}>
                      {item.AssetDesc} --- {item.ModelNo}
                      </li>
                ))};
            </ul> */}
            <BrowserRouter>
            <ul>
               <li><Link to="/">Home</Link></li>
               <li><Link to="/asset">Asset</Link></li>
            </ul>
            <Route exact path="/" render={() => <div>Home</div>} />
            <Route exact path="/asset" render={() => <div>Asset</div>} />
            </BrowserRouter>
        </div>
      );
    }
  }
  
  export default App;