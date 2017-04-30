import React, { Component } from 'react';
import {ClockDial} from './ClockDial';
import {ClockTicks} from './ClockTicks';
import {Add} from './Add';
import {CurrentAlarm} from './CurrentAlarm';
import {AlarmList} from './AlarmList';
import './Clock.css';

export class Clock extends Component {

  state = {
    intervalStopped:false,
    resetTicks:false,
    currentAlarm: ''
  }

  resetTicks = () => {
    this.setState({
      resetTicks:true,
      intervalStopped:true,
      alarmHour:0,
      alarmMinute:0,
      isHour:false,
      isMinute:false
    });
  }

  stopTimeInterval = () => {
    this.setState({
      intervalStopped:true,
      alarmHour:0,
      alarmMinute:0,
      isHour:false,
      isMinute:false,
      resetTicks:false
    });
  }

  setAlarmHm = (timeId) => {
    if(timeId.id==='H'){
      this.setState({
        alarmHour:Number(timeId.time),
        isHour:true,
        isMinute:false
      });
    }else{
      this.setState({
        alarmMinute:Number(timeId.time),
        alarmHour:Number(this.state.alarmHour),
        isHour:false,
        isMinute:true
      });
    }
  }

  addAlarm = () => {
    this.setState({
      setCurrentAlarm:{
        hours:this.state.alarmHour/30,
        minutes:this.state.alarmMinute/6
      },
      intervalStopped:false,
      resetTicks:true,
      isHour:false,
      isMinute:false
    });
  }

  render() {
    let dialTime = (this.state.isHour) ? 
                      {id:'H',hour:this.state.alarmHour,minute:this.state.alarmMinute} : 
                      (this.state.isMinute) ? 
                      {id:'M',hour:this.state.alarmMinute,minute:this.state.alarmMinute}:
                      {hour:this.state.alarmMinute,minute:this.state.alarmMinute};
    let currentAlarm = null;
    if(this.state.alarmHour || this.state.alarmMinute){
      currentAlarm = <CurrentAlarm 
                      hours={this.state.alarmHour!==undefined && this.state.alarmHour/30}
                      minutes={this.state.alarmMinute!==undefined && this.state.alarmMinute/6}
                      setAlarm={this.state.setCurrentAlarm}></CurrentAlarm>
    }

    return (
      <div className="container">
        {currentAlarm}
        <div className="clock-container">
          <ClockDial stop={this.state.intervalStopped}
                     moveDialTime={dialTime}></ClockDial>
          <ClockTicks stop={this.state.intervalStopped}
                      resetTicks={this.state.resetTicks}
                      onClick={this.setAlarmHm}></ClockTicks>
          <Add stopInterval={this.stopTimeInterval}
               setTicksAgain={this.resetTicks}
               addAlarm={this.addAlarm}></Add>
        </div>
        <AlarmList setAlarm={this.state.setCurrentAlarm}></AlarmList>
      </div>
    );
  }
}
