import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import appActions from '../../redux/app/actions';
import TopbarWrapper from './topbar.style';
import { TopbarUser, TopbarNotification, TopbarMessage } from '../../components/topbar';
// import { getCurrentTheme } from '../ThemeSwitcher/config';
import { callApi } from '../../utils';
import { showInfo } from '../../actions/feedback';
import { getBirthdays } from '../../actions/birthdays';
import { logout } from '../../actions/auth';
import { history } from '../../index';

const { Header } = Layout;
const { toggleCollapsed } = appActions;

class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  signout() {
    callApi('/auth/logout')
      .then(() => {
        this.props.dispatch(showInfo('Logging You Out'));
        this.props.dispatch(logout());
        history.push('/login');
      })
      .catch(err => {
        history.push('/login');
      });
  }

  componentWillMount() {
    this.props.dispatch(getBirthdays);
  }

  render() {
    const { toggleCollapsed, customizedTheme } = this.props;
    const user = { userType: 'super' }
    const collapsed = this.props.collapsed && !this.props.openDrawer;
    const styling = {
      background: customizedTheme.backgroundColor,
      position: 'fixed',
      width: '100%',
      height: 70
    };
    return (
      <TopbarWrapper>
        <Header
          style={styling}
          className={
            collapsed ? 'isomorphicTopbar collapsed' : 'isomorphicTopbar'
          }
        >
          <div className="isoLeft">
            <button
              className={
                collapsed ? 'triggerBtn menuCollapsed' : 'triggerBtn menuOpen'
              }
              style={{ color: customizedTheme.textColor }}
              onClick={toggleCollapsed}
            />
          </div>

          <ul className="isoRight">
            {
              user.userType !== "super" ?
                <li
                  onClick={() => this.setState({ selectedItem: 'notification' })}
                  className="isoNotify"
                >
                  <TopbarNotification {...this.props} />
                </li>
                :
                ""

            }

            <li
              onClick={() => this.setState({ selectedItem: 'user' })}
              className="isoUser"
            >
              <TopbarUser
                {...this.props}
                submit={() => this.signout()}
              />
            </li>
          </ul>
        </Header>
      </TopbarWrapper>
    );
  }
}

export default connect(
  state => ({
    ...state.App.toJS(),
    customizedTheme: state.ThemeSwitcher.toJS().topbarTheme,
  }),
  { toggleCollapsed }
)(Topbar);
