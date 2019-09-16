import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
const { Sider } = Layout;
const { SubMenu } = Menu;

class Sidebar extends React.Component {
    state = {
        collapsed: false
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        return (
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                <div className="logo"> 
                    Logo
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="/">
                        <Link to="/">
                            <Icon type="pie-chart" />
                            <span>Home</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/school">
                        <Link to="/school">
                            <Icon type="desktop" />
                            <span>School</span>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="/student">
                        <Link to="/student">
                            <Icon type="user"></Icon>
                            <span>Student</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/home">
                        <Link to="/course">
                            <Icon type="user"></Icon>
                            <span>Courses</span>
                        </Link>
                    </Menu.Item>

                    {/* <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <Icon type="user" />
                                <span>Student</span>
                            </span>
                        }
                    >
                        <Menu.Item key="3">Tom</Menu.Item>
                        <Menu.Item key="4">Bill</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu> */}
                    <SubMenu
                        key="sub2"
                        title={
                            <span>
                                <Icon type="team" />
                                <span>Team</span>
                            </span>
                        }
                    >
                        <Menu.Item key="6">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9">
                        <Icon type="file" />
                        <span>File</span>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

export default Sidebar;