import React, { Component } from 'react';
import {getAlarm,removeAlarm,updateAlarm} from '../../lib/alarmService';

export class AlarmList extends Component {

    state = {
        alarmsList: getAlarm(),
        songPlay:false
    }

    componentDidMount = () => {
        if(getAlarm().length){
            if(!this.runAlarm){
                this.runAlarm = setInterval(() => {
                    this.checkAlarm();
                },1000);
            }
        }
    }

    componentWillReceiveProps = (props) => {
        if(props.setAlarm!==undefined){
            this.setState({
                alarmsList: getAlarm()
            });
            if(!this.runAlarm){
                this.runAlarm = setInterval(() => {
                    this.checkAlarm();
                },1000);
            }
        }
    }

    checkAlarm = () => {
        let alarmList = this.state.alarmsList;
        let date = new Date(),
            hours = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds();

        alarmList.forEach((val) => {
            let storedHours = val.suffix === 'pm' ? val.hours + 12 : val.hours,
                storedMinutes = val.minutes;
            if((val.active && !val.passed) && (storedHours===hours && storedMinutes === minutes && seconds === 0)){
                // console.log(storedHours,' : ',storedMinutes,' == ',hours,' : ',minutes);
                this.passAlarm(val);
                setTimeout(()=>{
                    let newAlarmList = updateAlarm(val,Object.assign({},val));
                    this.setState({
                        alarmsList: newAlarmList
                    });
                },60000);
            }
        });
    }

    passAlarm = (val) => {
        let newAlarmList = updateAlarm(val,Object.assign({},val,{passed:!val.passed}));
        this.setState({
            alarmsList: newAlarmList
        });
    }

    filterDateString = (timestamp) => (String(timestamp).length===1) ? '0' + timestamp : timestamp;

    removeAlarm = (alarm) => {
        let newAlarmList = removeAlarm(alarm);
        this.setState({
            alarmsList: newAlarmList
        });
    }

    toggleAlarm = (alarm) => {
        this.setState({
            songPlay:true
        });
        let newAlarmList = updateAlarm(alarm,Object.assign({},alarm,{active:!alarm.active}));
        this.setState({
            alarmsList: newAlarmList
        });
    }

    stopAlarmSong = (val) => {
        let newAlarmList = updateAlarm(val,Object.assign({},val,{passed:!val.passed}));
        this.setState({
            alarmsList: newAlarmList
        });
    }

    render() {
        let alarmsList = this.state.alarmsList
            .map((alarm,id) => {
                return <li key={id}>
                        <div>
                        <input type="checkbox" checked={alarm.active}
                               onChange={() => this.toggleAlarm(alarm)}/>
                        </div>
                        <div className="alarmTime">
                        <span>
                            {alarm.hours===0 ? 12 : this.filterDateString(alarm.hours)}:{this.filterDateString(alarm.minutes)}
                        </span>
                        <span className="timeSuffix">{alarm.suffix}</span>
                        </div>
                        {alarm.passed ? <div className="redDot" onClick={() => {this.stopAlarmSong(alarm)}}>
                                            <audio autoPlay={this.state.songPlay ? "true" : "false"}>
                                                <source 
                                                    src="http://srv90.listentoyoutube.com/download/4pmVbnJmmq6npa9xlt+UbHJjnWVrZ2lx4q/Mq62V1oajjKit2tjFnQ==/Yann%20Tiersen%20-%20La%20Veill%C3%83%C2%A9e.mp3" 
                                                    type="audio/wav"/>
                                            </audio>
                                        </div> : ''}
                        <div>
                        </div>
                        <div>
                        <span className="removeAlarm"
                                onClick={() => this.removeAlarm(alarm)}>X</span>
                        </div>
                    </li>
            });

        return (
            <div className={alarmsList.length ? 'App-body disblock' : 'disnone'}>
                <div className="Alarm-header">Alarm</div>
                <ul>
                {alarmsList}
                </ul>
            </div>
        );
    }
}