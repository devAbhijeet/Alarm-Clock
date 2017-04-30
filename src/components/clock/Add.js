import React, { Component } from 'react';

export class Add extends Component {

  state = {
    showOptions:false
  }
  
  handleClick = () => {
    this.setState({showOptions:true});
    this.props.stopInterval();
  }

  cancleAlarm = () => {
    this.setState({showOptions:false});
    this.props.setTicksAgain();
  }

  addAlarm = () => {
    this.setState({showOptions:false});
    this.props.addAlarm();
    //this.props.setTicksAgain();
  }

  render() {
    let component = null;
    if(this.state.showOptions){
      component = <div className='addAlarmOpt'><span onClick={this.cancleAlarm}>cancel</span><span onClick={this.addAlarm}>ok</span></div>;
    }else if(!this.state.showOptions){
      component = <div className="addAlarm" onClick={this.handleClick}>+</div>
    }
    return (
      <div>{component}</div>
    );
  }
}