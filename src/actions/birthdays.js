import { callApi } from '../utils';

export const BIRTHDAYS = 'BIRTHDAYS';



export const birthdays = birthday => {
  return {
    type: BIRTHDAYS,
    birthday,
  };
};


export const getBirthdays = () => {
  return dispatch => {
    callApi('/getBirthdays')
      .then(data => {
        dispatch(birthdays(data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};


