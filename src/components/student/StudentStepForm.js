import React from 'react';
import { Layout, Steps, Button, message, PageHeader, Typography, Row, Col, Card, Form, Input, Select, List, Avatar } from 'antd';
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';
import axios from 'axios';

const { Step } = Steps;
const { Paragraph } = Typography;
const { Option } = Select;


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

const routes = [
    {
        path: 'index',
        breadcrumbName: 'Home',
    },
    {
        path: 'first',
        breadcrumbName: 'StudentForm',
    },
    {
        path: 'second',
        breadcrumbName: 'StudentStepForm',
    },
];


const Content = ({ children, extraContent }) => {
    return (
        <Row className="content" type="flex">
            <div className="main" style={{ flex: 1 }}>
                {children}
            </div>
            <div
                className="extra"
                style={{
                    marginLeft: 80,
                }}
            >
                {extraContent}
            </div>
        </Row>
    );
};

const content = (
    <div className="content">
        <Paragraph>
            <small>
                Follow the steps to register student
            </small>
        </Paragraph>

    </div>
);

class StudentStepForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            size: 'default',
            name: '',
            email: '',
            phone: '',
            dob: '',
            studentArray: []
        };

        this.getAllStudents = this.getAllStudents.bind(this);
    }


    componentDidMount() {
        // get all student

        this.getAllStudents();
    }

    reactNode = <div><li>PhoneNumber: foo</li> <li>Email: foo</li> <li>Dob: 1-1-1991</li> <li>Class: foo</li></div>;

    getAllStudents() {
        axios.get('https://xdemic-api.herokuapp.com/student')
            .then(res => {
                if (res.data.status) {
                    console.log(res.data.data);
                    this.setState({
                        studentArray: res.data.data
                    })

                    console.log(this.state.studentArray);
                }
                else {
                    message.info('no record found');
                }
            })
            .catch(err => {
                message.error(`an error occured ${err.message}`);
            });
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
        // this.props.history.push('/');
    }

    closeModel = () => {
        console.log('close model');
    }


    steps = [
        {
            title: 'First',
            content:
                <div style={{ marginTop: '20px' }}>
                    <Form>
                        <Form.Item label="Student Name">
                            <Input
                                placeholder="enter student name"
                                value='hamza'
                                allowClear
                                disabled
                            />
                        </Form.Item>

                        <Form.Item label="Student Email">
                            <Input
                                placeholder="enter student email"
                                allowClear
                                disabled
                                value='mhikram1@gmail.com'
                            />
                        </Form.Item>

                        <Form.Item label="Student Phone Number">
                            <Input
                                placeholder="enter student phone number"
                                allowClear
                                disabled
                                // value={this.state.phone}
                            />
                        </Form.Item>

                        <Form.Item label="Student Data Of Birth">
                            <Input
                                placeholder="enter student DOB"
                                allowClear
                                disabled
                                // value={this.state.dob}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Select size='default' defaultValue="Select Class" onChange={handleChange} style={{ width: 200 }}>
                                {children}
                            </Select>
                        </Form.Item>
                    </Form>
                </div>

        },
        {
            title: 'Second',
            content:
                <div style={{ marginTop: '20px' }}>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={<a href="#">{item.title}</a>}
                                    description={this.reactNode}
                                />
                            </List.Item>
                        )}
                    />,
                </div>
        },
        {
            title: 'Last',
            content: <div style={{ marginTop: '20px' }}>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<a href="#">{item.title}</a>}
                                description="Has been registered"
                            />
                        </List.Item>
                    )}
                />,
            </div>,
        },
    ];




    render() {

        const { current } = this.state;

        return (


            <div>
                <Row gutter={16}>
                    <Col span={24}>
                        <Card>
                            <div>
                                <Steps current={current}>
                                    {/* {steps.map(item => (
                                            <Step key={item.title} title={item.title} />
                                        ))} */}
                                    <Step title="first step">

                                    </Step>
                                    <Step title="second step"></Step>
                                    <Step title="third step"></Step>
                                </Steps>
                                <div className="steps-content">
                                    {this.steps[current].content}
                                </div>
                                <div className="steps-action" style={{ marginTop: "30px" }}>
                                    {current < this.steps.length - 1 && (
                                        <Button type="primary" onClick={() => this.next()}>
                                            Next
                                        </Button>
                                    )}
                                    {current === this.steps.length - 1 && (
                                        <Button type="primary" onClick={this.doneMethod}>
                                            Done
                                        </Button>
                                    )}
                                    {current > 0 && (
                                        <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                                            Previous
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>

            </div>
        );

        // <Layout style={{ minHeight: '100vh' }}>
        {/* <Sidebar /> */ }
        // <Layout>
        {/* <Header /> */ }

        {/* <PageHeader
                        style={{ marginTop: "50px" }}
                        title="Student Detail"
                        avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
                        breadcrumb={{ routes }}
                    >
                        <Content>
                            {content}
                        </Content>
                    </PageHeader> */}

        {/* </Layout> */ }
        {/* </Layout> */ }

    }
}

export default StudentStepForm;