const storageKey = 'alarm';

export const addAlarm = (alarm) => {
    if(localStorage.hasOwnProperty(storageKey)){
        var list = JSON.parse(localStorage.getItem(storageKey));
        var filteredAlarm = list.alarmList.findIndex((alrVal) => {
            return (alrVal.hours===alarm.hours && alrVal.minutes===alarm.minutes && alrVal.suffix===alarm.suffix);
        });
        if(filteredAlarm===-1){
            list.alarmList.push(alarm);
            localStorage.setItem(storageKey,JSON.stringify(list));
        }
    }else{
        localStorage.setItem(storageKey,JSON.stringify({alarmList:[alarm]}));
    }
}

export const getAlarm = () => {
    if(localStorage.hasOwnProperty(storageKey)){
        var list = JSON.parse(localStorage.getItem(storageKey));
        return list.alarmList;
    }else{
        return [];
    }
}

export const removeAlarm = (alarm) => {
    var list = JSON.parse(localStorage.getItem(storageKey));
    var index = list.alarmList.findIndex((val) => {
        return val.id === alarm.id;
    });
    var newList = [
        ...list.alarmList.slice(0,index),
        ...list.alarmList.slice(index+1)
    ];
    list.alarmList = newList;
    localStorage.setItem(storageKey,JSON.stringify(list));
    return newList;
}

export const updateAlarm = (alarm,updatedAlarm) => {
    var list = JSON.parse(localStorage.getItem(storageKey));
    var index = list.alarmList.findIndex((val) => {
        return val.id === alarm.id;
    });
    list.alarmList[index] = updatedAlarm;
    var newList = [
        ...list.alarmList.slice(0,index),
        list.alarmList[index],
        ...list.alarmList.slice(index+1)
    ];
    list.alarmList = newList;
    localStorage.setItem(storageKey,JSON.stringify(list));
    return newList;
}