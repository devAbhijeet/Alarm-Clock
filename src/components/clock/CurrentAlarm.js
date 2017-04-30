import React, { Component } from 'react';
import {createAlarm} from '../../lib/alarmService';

export class CurrentAlarm extends Component {

    state = {
        am:false,
        pm:true
    }

    componentWillReceiveProps = (props) => {
        if(props.setAlarm!==undefined){
            let suffix = (this.state.am) ? 'am' : 'pm';
            createAlarm(
                Object.assign(
                    {id:Math.floor(Math.random()*100000000000)},
                    props.setAlarm,
                    {
                        suffix:suffix,
                        active:true,
                        passed:false
                    })
            );
        }
    }

    setAlarmSuffix = (e) => {
        if(e.target.getAttribute('data-suffix').toLowerCase()==='pm'){
            this.setState({
                pm:true,
                am:false
            });
        }else{
            this.setState({
                am:true,
                pm:false
            });
        }
    }

    filterDateString = (timestamp) => (String(timestamp).length===1) ? '0' + timestamp : timestamp;

    render() {
        let am = this.state.am;
        let pm = this.state.pm;
        return (
        <div className="hm">
            <div>{this.filterDateString(this.props.hours)}</div>
            <div>{this.filterDateString(this.props.minutes)}</div>
            <div className="alarmSuffix">
                <span data-suffix="pm"
                      onClick={this.setAlarmSuffix}
                      className={pm ? 'sufSelected':''}>pm</span>
                <span data-suffix="am"
                      onClick={this.setAlarmSuffix}
                      className={am ? 'sufSelected':''}>am</span>
            </div>
        </div>
        );
    }
}