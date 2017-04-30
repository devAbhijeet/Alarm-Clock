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

  filterDateString = (timestamp) => (String(timestamp).length===1) ? '0' + timestamp : timestamp;

  timeTick = () => {
    let timeNow = new Date(),
          seconds = timeNow.getSeconds(),
          minutes = timeNow.getMinutes(),
          hours = timeNow.getHours();
    
    let suffix = (hours >= 12)? 'pm' : 'am';
    hours = ((hours + 11) % 12 + 1);
        
    seconds = this.filterDateString(seconds);
    minutes = this.filterDateString(minutes);
    hours = this.filterDateString(hours);
      
    this.setState({
      hours: hours,
      minutes:minutes,
      seconds:seconds,
      suffix:suffix
    });
  }

  render() {
    return (
      <div>
        <div className="hms">
          <div>{this.state.hours}</div>
          <div>{this.state.minutes}</div>
          <div>{this.state.seconds}</div>
          <div className="timeSuffix">{this.state.suffix}</div>
        </div>
      </div>
    );
  }
}