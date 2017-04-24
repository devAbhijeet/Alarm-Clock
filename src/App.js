import React, { Component } from 'react';
import './App.css';
import {Clock,Time} from './components/clock/';

class App extends Component {
  state = {
    alarmsList: [],
    currentAlarm: ''
  }

  static contextTypes = {
    route: React.PropTypes.string
  }

  // componentDidMount() {
  //   loadTodos()
  //     .then(todos => this.setState({todos}))
  // }

  render() {
    return (
       <div className="App">
        <div className="App-header">
          <Clock></Clock>
          <Time></Time>
        </div>
       </div>
    );
  }
}

export default App;
