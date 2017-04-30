import * as storage from './localStorage';

export const getAlarm = () => {
  return storage.getAlarm();
}

export const createAlarm = (alarm) => {
  storage.addAlarm(alarm);
}

export const updateAlarm = (alarm,updatedAlarm) => {
  return storage.updateAlarm(alarm,updatedAlarm);
}

export const removeAlarm = (alarm) => {
  return storage.removeAlarm(alarm);
}
