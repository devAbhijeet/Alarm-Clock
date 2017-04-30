import React, { Component } from 'react';

export class ClockDial extends Component {
  
  state = {
    secondElapsed:0,
    minuteElapsed:0,
    hoursElapsed:0,
    hoursOffset:0,
    minutesOffset:0,
    secondsOffset:0
  }

  componentDidMount() {
    let {stop} = this.props;
    if(!stop){
      this.inc = setInterval(this.moveClockHands,1000);
    }
  }

  componentWillReceiveProps(props){
    let {stop,moveDialTime} = props
    if(stop){
      clearInterval(this.inc);
    }else if(!stop){
      this.inc = setInterval(this.moveClockHands,1000);
    }
    this.setState({
      hoursOffset: 0,
      minutesOffset: 0,
      secondsOffset: 0
    });

    if(moveDialTime!==undefined){
      if(moveDialTime.id && moveDialTime.id==='H'){
        this.setState({
          hoursOffset: Number(moveDialTime.hour),
          minutesOffset: Number(moveDialTime.minute)
        });
      }else if((moveDialTime.id && moveDialTime.id==='M')){
        this.setState({
          hoursOffset: Number(this.state.hoursOffset),
          minutesOffset: Number(moveDialTime.minute)
        });
      }else{
        this.setState({
          hoursOffset: Number(moveDialTime.hour),
          minutesOffset: Number(moveDialTime.minute)
        });
      }
    }
  }

  moveClockHands = () => {
      const timeStamp = new Date(),
            seconds = timeStamp.getSeconds(),
            minutes = timeStamp.getMinutes(),
            hours = timeStamp.getHours();

      (seconds===0) ? 
        this.setState({secondElapsed:this.state.secondElapsed+60}) : 
        this.setState({secondElapsed:this.state.secondElapsed});

      ((minutes===0) && (seconds===0)) ?
        this.setState({minutesElapsed:this.state.minutesElapsed+60}) :
        this.setState({minutesElapsed:this.state.minutesElapsed});

      ((hours===0) && (minutes===0 )&& (seconds===0)) ? 
        this.setState({hoursElapsed:this.state.hoursElapsed+12}) : 
        this.setState({hoursElapsed:this.state.hoursElapsed});


      const secondsOffset = (seconds+this.state.secondElapsed)*6,
            minutesOffset = (minutes+this.state.minuteElapsed)*6,
            hoursOffset = ((hours+this.state.hoursElapsed)*30)+((minutes*6)/12);
      
      this.setState({
        hoursOffset: hoursOffset,
        minutesOffset:minutesOffset,
        secondsOffset:secondsOffset
      });
      
  }

  render() {
    let hourAngle = 'rotate('+this.state.hoursOffset+'deg)';
    let minuteAngle = 'rotate('+this.state.minutesOffset+'deg)';
    let secondAngle = 'rotate('+this.state.secondsOffset+'deg)';
    return (
      <div>
        <div className="clock-child-hours" style={{transform:hourAngle}}></div>
        <div className="clock-child-minutes" style={{transform:minuteAngle}}></div>
        <div className="clock-child-seconds" style={{transform:secondAngle}}></div>
        <div className="clock-child-center"></div>
      </div>
    );
  }
}