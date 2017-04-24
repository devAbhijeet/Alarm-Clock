import React, { Component } from 'react';

export class Time extends Component {
  
  state = {
    hours:0,
    minutes:0,
    seconds:0
  }

  componentDidMount() {
    this.timeInterval = setInterval(this.timeTick,1000);
  }

  timeTick = () => {
      let timeNow = new Date(),
            seconds = timeNow.getSeconds(),
            minutes = timeNow.getMinutes(),
            hours = timeNow.getHours();
        

    seconds = (String(seconds).length==1) ? '0' + seconds : seconds;

    minutes = (String(minutes).length==1) ? '0' + minutes : minutes;

    hours = (String(hours).length==1) ? '0' + hours : hours;
      
      this.setState({
        hours: hours,
        minutes:minutes,
        seconds:seconds
      });
      
  }

  render() {
    return (
      <div className="hms">
        <div>{this.state.hours}</div>
        <div>{this.state.minutes}</div>
        <div>{this.state.seconds}</div>
      </div>
    );
  }
}