import React from "react";
import { Layout, Menu, Dropdown, Button, Icon, message, Avatar, Row, Col, Input, AutoComplete, Badge } from "antd";
import { subscribeToTimer } from '../../api/api';

const { Header } = Layout;


const { Option, OptGroup } = AutoComplete;

const dataSource = [
    {
        title: 'Libraries',
        children: [
            {
                title: 'AntDesign',
                count: 10000,
            },
            {
                title: 'AntDesign UI',
                count: 10600,
            },
        ],
    },
    {
        title: 'Solutions',
        children: [
            {
                title: 'AntDesign UI',
                count: 60100,
            },
            {
                title: 'AntDesign',
                count: 30010,
            },
        ],
    },
    {
        title: 'Articles',
        children: [
            {
                title: 'AntDesign design language',
                count: 100000,
            },
        ],
    },
];

function renderTitle(title) {
    return (
        <span>
            {title}
            <a
                style={{ float: 'right' }}
                href="https://www.google.com/search?q=antd"
                target="_blank"
                rel="noopener noreferrer"
            >
                more
      </a>
        </span>
    );
}

const options = dataSource
    .map(group => (
        <OptGroup key={group.title} label={renderTitle(group.title)}>
            {group.children.map(opt => (
                <Option key={opt.title} value={opt.title}>
                    {opt.title}
                    <span className="certain-search-item-count">{opt.count} people</span>
                </Option>
            ))}
        </OptGroup>
    ))
    .concat([
        <Option disabled key="all" className="show-all">
            <a href="https://www.google.com/search?q=antd" target="_blank" rel="noopener noreferrer">
                View all results
      </a>
        </Option>,
    ]);






function handleButtonClick(e) {
    message.info('Click on left button.');
    console.log('click left button', e);
}

function handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
}

const menu = (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key="1">
            <Icon type="profile" />
            Profile
        </Menu.Item>
        <Menu.Item key="2">
            <Icon type="setting" />
            Settings
        </Menu.Item>
        <Menu.Item key="3">
            <Icon type="logout" />
            Logout
        </Menu.Item>
    </Menu>
);

const notification = (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key="1">
            No Notification
        </Menu.Item>
    </Menu>
);

class Headers extends React.Component {

    constructor(props) {
        super(props);

        subscribeToTimer((err, timestamp) => this.setState({
            timestamp
        }));
    }

    state = {
        timestamp: 'no timestamp yet'
    };

    render() {
        return (
            <Header style={{ background: '#fff', padding: 0 }}>




                <div style={{}}>

                    <Row gutter={16}>
                        <Col span={3} offset={18}>
                            <AutoComplete
                                className="certain-category-search"
                                dropdownClassName="certain-category-search-dropdown"
                                dropdownMatchSelectWidth={false}
                                dropdownStyle={{ width: 300 }}
                                size="large"
                                style={{ width: '100%' }}
                                dataSource={options}
                                placeholder="input here"
                                optionLabelProp="value"
                            >
                                <Input suffix={<Icon type="search" className="certain-category-icon" />} />
                            </AutoComplete>
                        </Col>
                        <Col span={3}>
                                <Col span={4}>
                                    <Badge count={1}>
                                            <a className="ant-dropdown-link" href="#">
                                                <Icon type="bell" theme="twoTone" spin={true} style={{ fontSize: '24px' }} />
                                            </a>
                                    </Badge>

                                </Col>
                                <Col span={4}>
                                    <Dropdown overlay={menu}>
                                        <a className="ant-dropdown-link" href="#">
                                            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
                                        </a>
                                    </Dropdown>
                                </Col>

                        </Col>

                    </Row>

                </div>

            </Header>
        );
    }
}

export default Headers;