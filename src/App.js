import React, { Component } from 'react';
import './App.css';
import {Clock,Time} from './components/clock/';

class App extends Component {
  state = {}

  static contextTypes = {
    route: React.PropTypes.string
  }

  render() {
    return (
       <div className="App">
        <div className="App-header">
          <Clock renderChild={this.state.renderChild}></Clock>
          <Time></Time>
        </div>
       </div>
    );
  }
}

export default App;
