import { combineReducers } from "redux";
import App from "../redux/app/reducer";
import ThemeSwitcher from "../redux/themeSwitcher/reducer";
import LanguageSwitcher from "../redux/languageSwitcher/reducer";
import Notes from "../redux/notes/reducer";
import DynamicChartComponent from "../redux/dynamicEchart/reducer";

import auth from "./auth";
import feedback from "./feedback";
import birthdays from "./birthdays";
import activityLog from "./activityLog";
import teacherSummary from "./teacherSummary";

export default combineReducers({
  auth,
  feedback,
  birthdays,
  activityLog,
  teacherSummary,
  App,
  ThemeSwitcher,
  LanguageSwitcher,
  Notes,
  DynamicChartComponent
});
