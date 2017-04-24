import React, { Component } from 'react';
import {ClockDial} from './ClockDial';
import {ClockTicks} from './ClockTicks';
import './Clock.css';

export class Clock extends Component {
  render() {
    return (
      <div className="container">
        <div className="clock-container">
          <ClockDial></ClockDial>
          <ClockTicks></ClockTicks>
        </div>
      </div>
    );
  }
}
