import { BIRTHDAYS } from '../actions/birthdays'

let init = {
        studentBirthday:[],
        staffBirthday:[],
}


// Birthday Reducer
export default (state = init, action) => {
  switch (action.type) {
    case BIRTHDAYS:
      return {
        studentBirthday: action.birthday.StudentBirthdays,
        staffBirthday: action.birthday.StaffBirthdays,
      }

    default:
      return state
  }
}