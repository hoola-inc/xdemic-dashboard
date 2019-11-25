import React from "react";
import { Layout, Menu, Dropdown, Button, Icon, message, Avatar, Row, Col, Input, AutoComplete, Badge, Modal, Steps, Form, Select, List, Typography } from "antd";
import socketIOClient from 'socket.io-client';
import StudentStepForm from "../student/StudentStepForm";

const { Header } = Layout;


const { Option, OptGroup } = AutoComplete;

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
    console.log(`Selected: ${value}`);
}

const data = [
    {
        title: 'Student XYZ',
    }
];


class Headers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            response: false,
            endpoint: "https://xdemic-api.herokuapp.com",
            visible: false,
            current: 0,
            size: 'default',
        }
    }




    componentDidMount() {
        // const { endpoint } = this.state;
        // const socket = socketIOClient(endpoint);
        // socket.on("FromAPI", data => {
        //     console.log(
        //         `%c${data}`,
        //         "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"
        //     );

        //     console.log(data);
        //     this.setState({ response: data.dob });
        // });
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    doneMethod = () => {
        message.success('Processing complete!');
        
    }


    dataSource = [
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

    renderTitle(title) {
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

    options = this.dataSource
        .map(group => (
            <OptGroup key={group.title} label={this.renderTitle(group.title)}>
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



    showModal = () => {
        this.setState({
            visible: true,
        });
    }



    handleButtonClick(e) {
        message.info('Click on left button.');
        console.log('click left button', e);
    }

    handleMenuClick(e) {
        message.info('Click on menu item.');
        console.log('click', e);
        this.showModal();
    }

    menu = (
        <Menu onClick={this.handleMenuClick}>
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


    notifications = (
        <Menu onClick={this.showModal}>
            <Menu.Item key="1">

                Noticaiton received
            </Menu.Item>
        </Menu>
    );



    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };


    render() {
        const { response } = this.state;
        const done = this.handleCancel;
        return (
            <Header style={{ background: '#fff', padding: 0 }}>
                {/* <div style={{ textAlign: "center" }}>
                    {response
                        ? <p>
                            The temperature in Florence is: {response} °F
                        </p>
                        : <p>Loading...</p>}
                </div> */}

                {/* Model */}

                <Modal
                    title="Students credentials"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    onClick={this.props.visible}
                >
                    <StudentStepForm />
                </Modal>

                {/* End here */}

                <div>

                    <Row gutter={16}>
                        <Col span={3} offset={18}>
                            <AutoComplete
                                className="certain-category-search"
                                dropdownClassName="certain-category-search-dropdown"
                                dropdownMatchSelectWidth={false}
                                dropdownStyle={{ width: 300 }}
                                size="large"
                                style={{ width: '100%' }}
                                dataSource={this.options}
                                placeholder="input here"
                                optionLabelProp="value"
                            >
                                <Input suffix={<Icon type="search" className="certain-category-icon" />} />
                            </AutoComplete>
                        </Col>
                        <Col span={3}>
                            <Col span={4}>
                                <Badge count={1}>
                                    <Dropdown overlay={this.notifications}>
                                        <a className="ant-dropdown-link" href="#">
                                            <Icon type="bell" theme="twoTone" spin={true} style={{ fontSize: '24px' }} />
                                        </a>
                                    </Dropdown>
                                </Badge>

                            </Col>
                            <Col span={4}>
                                <Dropdown overlay={this.menu}>
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