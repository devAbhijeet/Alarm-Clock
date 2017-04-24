import React, { Component } from 'react';

export class ClockTicks extends Component {

  generateTimeTicks = () => {
    return Array(12)
      .join('-')
      .split('-');
  }

  render() {
    const timeTicks = this
      .generateTimeTicks()
      .map((val,index)=><div key={index} className={`tick-${index+1}`}></div>);
    return (
      <div className="clock-ticks">
        {timeTicks}
      </div>
    );
  }
}