import React, { Component } from 'react';
import BSTable from './BootStrapTable';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        status: '',
        timestart: '',
        endtime: '',
        location: '',
        dockname: '',
        rowid: ''
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({ name: event.target.value });
    }
  
    handleSubmit(event) {
      event.preventDefault();
      fetch(`/api/greeting?name=${encodeURIComponent(this.state.name)}`)
      //fetch(`/api/greeting`)
        .then(response => response.json())
        .then(state => this.setState(state));
    }
  
    render() {
      console.log(this.state);
      return (
        <div className="App">
          <header className="App-header">
           <form onSubmit={this.handleSubmit}>
              <label htmlFor="name">Load data: </label>
              <button type="submit">Submit</button>
            </form>
            <BSTable data={this.state}/>
          </header>
        </div>
      );
    }
  }
  
  export default App;