import React, { Component } from "react";
import { connect } from "react-redux";
import clone from "clone";
import { Link } from "react-router-dom";
import { Layout } from "antd";
import { Scrollbars } from "react-custom-scrollbars";
import Menu from "../../components/uielements/menu";
// import IntlMessages from '../../components/utility/intlMessages';
// import getDevSidebar from '../../customApp/sidebar';
import SidebarWrapper from "./sidebar.style";

import nav from "./_nav";

import appActions from "../../redux/app/actions";
import Logo from "../../components/utility/logo";
import { rtl } from "../../config/withDirection";

const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;
const { Sider } = Layout;

const {
  toggleOpenDrawer,
  changeOpenKeys,
  changeCurrent,
  toggleCollapsed
} = appActions;
// const stripTrailingSlash = str => {
//   if (str.substr(-1) === '/') {
//     return str.substr(0, str.length - 1);
//   }
//   return str;
// };

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        userType: 'super'
      }
    };

    this.handleClick = this.handleClick.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
  }

  handleClick(e) {
    this.props.changeCurrent([e.key]);
    if (this.props.app.view === "MobileView") {
      setTimeout(() => {
        this.props.toggleCollapsed();
        this.props.toggleOpenDrawer();
      }, 100);
    }
  }
  onOpenChange(newOpenKeys) {
    const { app, changeOpenKeys } = this.props;
    const latestOpenKey = newOpenKeys.find(
      key => !(app.openKeys.indexOf(key) > -1)
    );
    const latestCloseKey = app.openKeys.find(
      key => !(newOpenKeys.indexOf(key) > -1)
    );
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    changeOpenKeys(nextOpenKeys);
  }
  getAncestorKeys = key => {
    const map = {
      sub3: ["sub2"]
    };
    return map[key] || [];
  };

  renderView({ style, ...props }) {
    const viewStyle = {
      marginRight: rtl === "rtl" ? "0" : "-17px",
      paddingRight: rtl === "rtl" ? "0" : "9px",
      marginLeft: rtl === "rtl" ? "-17px" : "0",
      paddingLeft: rtl === "rtl" ? "9px" : "0"
    };
    return (
      <div className="box" style={{ ...style, ...viewStyle }} {...props} />
    );
  }

  renderSubNavItem = (item, submenuColor, submenuStyle) => {
    return !item.children ? (
      <Menu.Item style={submenuStyle} key={item.name}>
        <Link style={submenuColor} to={item.url}>
          {item.name}
        </Link>
      </Menu.Item>
    ) : (
      <SubMenu
        key={item.name}
        title={
          <span
            className="isoMenuHolder"
            style={{ ...submenuColor, marginLeft: "-90px" }}
          >
            <i className={item.icon} />
            <span className="nav-text">{item.name}</span>
          </span>
        }
      >
        {item.children.map(child =>
          this.renderNavItem(child, { ...submenuColor, marginLeft: "-100px" })
        )}
      </SubMenu>
    );
  };

  renderNavItem = (item, submenuColor, submenuStyle) => {
    return !item.children ? (
      <Menu.Item key={item.name}>
        <Link to={item.url}>
          <span className="isoMenuHolder" style={submenuColor}>
            <i className={item.icon} />
            <span className="nav-text">{item.name}</span>
          </span>
        </Link>
      </Menu.Item>
    ) : (
      <SubMenu
        key={item.name}
        title={
          <span className="isoMenuHolder" style={submenuColor}>
            <i className={item.icon} />
            <span className="nav-text">{item.name}</span>
          </span>
        }
      >
        {item.children.map(child =>
          this.renderSubNavItem(child, submenuColor, submenuStyle)
        )}
      </SubMenu>
    );
  };

  render() {
    // const { url, app, toggleOpenDrawer, bgcolor } = this.props;
    const { app, customizedTheme } = this.props;
    // const url = stripTrailingSlash(this.props.url);
    const collapsed = clone(app.collapsed) && !clone(app.openDrawer);
    const mode = collapsed === true ? "vertical" : "inline";

    const scrollheight = app.height;
    const styling = {
      backgroundColor: customizedTheme.backgroundColor
    };
    const submenuStyle = {
      backgroundColor: "rgba(0,0,0,0.3)",
      color: customizedTheme.textColor
    };
    const submenuColor = {
      color: customizedTheme.textColor
    };

    return (
      <SidebarWrapper>
        <Sider
          trigger={null}
          collapsible={true}
          collapsed={collapsed}
          width="220"
          className="isomorphicSidebar"
          style={styling}
        >
          <Logo collapsed={collapsed} />
          <Scrollbars
            renderView={this.renderView}
            style={{ height: scrollheight - 70 }}
          >
            <Menu
              onClick={this.handleClick}
              theme="dark"
              mode={mode}
              // openKeys={collapsed ? [] : app.openKeys}
              // selectedKeys={app.current}
              // onOpenChange={this.onOpenChange}
              className="isoDashboardMenu"
            >
              {nav.items.map(
                item =>
                  item.userType === this.state.user.userType
                    ? this.renderNavItem(item, submenuColor, submenuStyle)
                    : ""
              )}
            </Menu>
          </Scrollbars>
        </Sider>
      </SidebarWrapper>
    );
  }
}

export default connect(
  state => ({
    app: state.App.toJS(),
    customizedTheme: state.ThemeSwitcher.toJS().sidebarTheme
  }),
  { toggleOpenDrawer, changeOpenKeys, changeCurrent, toggleCollapsed }
)(Sidebar);
