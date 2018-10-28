import React, { Component } from 'react';
import { Popover } from 'antd';
import { connect } from 'react-redux';
import TopbarDropdownWrapper from './topbarDropdown.style';

const demoNotifications = [
  {
    id: 1,
    name: 'David Doe',
    notification:
      "Today is David's Birthday",
  },
  {
    id: 2,
    name: 'Navis Doe',
    notification:
  "Today is David's Birthday",
    },
  {
    id: 3,
    name: 'Emanual Doe',
    notification:
      "Today is David's Birthday",
       },
  {
    id: 4,
    name: 'Dowain Doe',
    notification:
     "Today is David's Birthday",
       },
];

class TopbarNotification extends Component {
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      visible: false,
      studentBirthday: this.props.studentBirthday,
      staffBirthday: this.props.staffBirthday,
    };
  }
  hide() {
    this.setState({ visible: false });
  }
  handleVisibleChange() {
    this.setState({ visible: !this.state.visible });
  }
  render() {
    const { customizedTheme } = this.props;
    const content = (
      <TopbarDropdownWrapper className="topbarNotification">
        <div className="isoDropdownHeader">
          <h3>BIRTHDAYS</h3>
        </div>
        <div className="isoDropdownBody">

          { 
    
              <h3 className="isoDropdownListItem" style={{margin:"auto"}}>
                <span className="fa fa-birthday-cake fa-4x" style={{margin:"auto"}}></span>
                <p  style={{margin:"auto"}}>NO BIRTHDAYS TODAY</p>
                </h3>
          
        }
        </div>
        <a className="isoViewAllBtn">View All</a>
      </TopbarDropdownWrapper>
    );
    return (
      <Popover
        content={content}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        placement="bottomLeft"
      >
        <div className="isoIconWrapper">
          <i
            className="ion-android-notifications"
            style={{ color: customizedTheme.textColor }}
          />

            { !this.state.studentBirthday && !this.state.staffBirthday ? (
                  <span>0</span>
              ):
            (
              <span>{this.state.studentBirthday.length}</span>
              )

            }
          
        </div>
      </Popover>
    );
  }
}

export default connect(state => ({
  ...state.App.toJS(),
  customizedTheme: state.ThemeSwitcher.toJS().topbarTheme,
  studentBirthday: state.birthdays.studentBirthday,
  staffBirthday: state.birthdays.staffBirthday,
}))(TopbarNotification);
