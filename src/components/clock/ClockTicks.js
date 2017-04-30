import React, { Component } from 'react';

export class ClockTicks extends Component {

  state = {
    animateTicks:false,
    minutes:false,
    hourSet:false,
  }

  generateTimeTicks = () => {
    return Array(12)
      .join('-')
      .split('-');
  }

  componentWillReceiveProps(props){
    let {stop,resetTicks} = props
    if(stop){
      this.setState({
        animateTicks:true
      });
    }
    if(resetTicks){
      this.setState({
        hourSet:false,
        minuteSet:false,
        animateTicks:false,
        minutes:false
      });
    }
  }

  setTimeTick = (e) => {
    if(this.state.animateTicks){
      let alarmTime = e.target.getAttribute("data-rotate");
      if(!this.state.hourSet){
        this.setState({
          hourSet:true,
          minutes:true
        });
        this.props.onClick({id:'H',time:alarmTime});
      }else if(!this.state.minuteSet){
        this.setState({
          minuteSet:true,
          hourSet:true
        });
        this.props.onClick({id:'M',time:alarmTime});
      }
    }
  }

  render() {
    const timeTicks = this
      .generateTimeTicks()
      .map((val,index) => 
        <div  key={index} 
              onClick={this.setTimeTick}
              className={`tick-${index+1}`}
              data-rotate={(index)*30}></div>);
    let animateTicks = this.state.animateTicks;
    let minutes = this.state.minutes;
    return (
      <div className={
            minutes ? 
              "clock-ticks animate minutes" : 
              animateTicks ? "clock-ticks animate" : "clock-ticks"}>
        {timeTicks}
      </div>
    );
  }
}