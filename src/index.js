import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { LocaleProvider } from "antd";
import { IntlProvider } from "react-intl";
import registerServiceWorker from "./registerServiceWorker";
import themes from "./config/themes";
// import DashApp from './dashApp';
import AppLocale from "./languageProvider";
import { themeConfig } from "./config";
import DashAppHolder from "./dashAppStyle";
import { Router, Route, Switch } from "react-router-dom";

import { createHashHistory } from "history";
import { Provider } from "react-redux";
import PageLoading from "./components/PageLoading";
// Styles
// Import Font Awesome Icons Set
import "font-awesome/css/font-awesome.min.css";
// Import Simple Line Icons Set
import "simple-line-icons/css/simple-line-icons.css";
// Import Main styles for this application
import "./scss/style.scss";
// Temp fix for reactstrap
// import '../scss/core/_dropdown-menu-right.scss';

import "bootstrap/dist/css/bootstrap.css";

// Containers
import App from "./containers/App/";

// Views
import SignIn from "./containers/Page/signin";
import SignUp from "./containers/Page/signup";
import VoterLogin from "./containers/Page/voterLogin";
import VerifyOTP from "./containers/Page/verifyOTP";
import SecurityCheck from "./containers/Page/securityCheck";
import VoteCount from './containers/Page/voteCounts'

// Alert Box
import Alert from "./components/Alert";

import { persistStore } from "redux-persist";
import { localForage } from "localforage";

// Store
import configureStore from "./store";
const store = configureStore(() => {});

export const history = createHashHistory();

const currentAppLocale = AppLocale.en;

class Main extends React.Component {
  state = {
    isReady: false
  };

  componentDidMount() {
    persistStore(
      store,
      {
        blacklist: ["ThemeSwitcher", "App", "LanguageSwitcher", "feedback"],
        key: "primary",
        storage: localForage,
        debounce: 500
      },
      () => {
        this.setState({ isReady: true });
      }
    );
  }

  render() {
    if (!this.state.isReady) {
      return <PageLoading />;
    }
    return (
      <LocaleProvider locale={currentAppLocale.antd}>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <ThemeProvider theme={themes[themeConfig.theme]}>
            <DashAppHolder>
              <Provider store={store}>
                <div>
                  <Router history={history}>
                    <Switch>
                      <Route
                        exact
                        path="/login"
                        name="Login Page"
                        component={SignIn}
                      />
                      <Route
                        exact
                        path="/signup"
                        name="Login Page"
                        component={SignUp}
                      />
                      <Route 
                        exact
                        path='/voterLogin'
                        name="Voter Login"
                        component={VoterLogin}
                      />
                      <Route 
                        exact
                        path='/verifyOTP'
                        name="Voter Login"
                        component={VerifyOTP}
                      />
                      <Route 
                        exact
                        path='/securitycheck'
                        name="Security Check"
                        component={SecurityCheck}
                      />
                      <Route 
                        exact
                        path='/voteCount'
                        name='Vote Count'
                        component={VoteCount}
                      />
                      <Route path="/" name="Home" component={App} />
                    </Switch>
                  </Router>
                  <Alert />
                </div>
              </Provider>
            </DashAppHolder>
          </ThemeProvider>
        </IntlProvider>
      </LocaleProvider>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));

// Hot Module Replacement API
// if (module.hot) {
//   module.hot.accept('./dashApp.js', () => {
//     const NextApp = require('./dashApp').default;
//     ReactDOM.render(<NextApp />, document.getElementById('root'));
//   });
// }
registerServiceWorker();
export { AppLocale };
