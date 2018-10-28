import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popover from '../uielements/popover';
// import userpic from '../../image/user1.png';
// import authAction from '../../redux/auth/actions';
import TopbarDropdownWrapper from './topbarDropdown.style';
import { Link } from 'react-router-dom';

// const { logout } = authAction;

class TopbarUser extends Component {
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      visible: false,
      user: {
        username: 'Super'
      },
    };
  }
  hide() {
    this.setState({ visible: false });
  }
  handleVisibleChange() {
    this.setState({ visible: !this.state.visible });
  }



  render() {
    const content = (
      <TopbarDropdownWrapper className="isoUserDropdown">
        <a className="isoDropdownLink" onClick={() => this.props.history.push('/profile')} >Profile</a>
        <a className="isoDropdownLink">Feedback</a>
        <a className="isoDropdownLink">Help</a>
        <a className="isoDropdownLink" onClick={this.props.submit}>
          Logout
        </a>
      </TopbarDropdownWrapper>
    );

    return (
      <Popover
        content={content}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        arrowPointAtCenter={true}
        placement="bottomLeft"
      >
        <div className="isoImgWrapper">
          <span>{this.state.user.username.charAt(0).toUpperCase()}</span>
          <span className="userActivity online" />
        </div>
      </Popover>
    );
  }
}
export default connect()(TopbarUser);
