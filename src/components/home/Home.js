import React from "react";
import { Layout, PageHeader, Menu, Dropdown, Icon, Button, Tag, Typography, Row, Col, Card, Divider, message } from 'antd';
import Sidebar from "../common/Sidebar";
import CredentialsChart from "../../charts/CredentialsChart";
import SemesterChart from "../../charts/SemesterChart";
import CoursesChart from "../../charts/CoursesChart";
import StudentChart from "../../charts/StudentsChart"
import Headers from '../common/Header';
import AddNewStudent from '../ant-modal/AddNewStudentModal';
import AddNewCourse from '../ant-modal/CreateCourseModal';
import AddNewCourseCredentials from '../ant-modal/CreateCourseInstanceModal';
import axios from 'axios';
import Swal from "sweetalert2";

const { Footer } = Layout;

const { Paragraph } = Typography;

const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                1st menu item
        </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                2nd menu item
        </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                3rd menu item
        </a>
        </Menu.Item>
    </Menu>
);

const DropdownMenu = () => {
    return (
        <Dropdown key="more" overlay={menu}>
            <Button
                style={{
                    border: 'none',
                    padding: 0,
                }}
            >
                <Icon
                    type="ellipsis"
                    style={{
                        fontSize: 20,
                        verticalAlign: 'top',
                    }}
                />
            </Button>
        </Dropdown>
    );
};

const routes = [
    {
        path: 'index',
        breadcrumbName: 'Home',
    },
    {
        path: 'first',
        breadcrumbName: 'Dashboard',
    },
    {
        path: 'second',
        breadcrumbName: 'Workplace',
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

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            schoolDataArray: [],
            name: '',
            address: '',
            telephone: '',
            email: ''
        }
    }

    componentDidMount() {
        axios.get('https://xdemic-api.herokuapp.com/schools')
            .then(res => {
                if (res.data.status) {
                    res.data.data.map(e => {
                        this.setState({
                            name: e.name,
                            address: e.address,
                            telephone: e.telephone,
                            email: e.email
                        })
                    });
                } else {
                    message.info('no school found');
                }
            })
            .catch(err => {
                message.error(`an error occured ${err.message}`);
            })
    }


    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Layout>
                    <Headers />
                    <PageHeader
                        style={{ marginTop: "50px" }}
                        title={this.state.name}
                        avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
                        breadcrumb={{ routes }}
                    >
                        <Content>
                            {/* {this.content} */}



                            <div className="content">
                                <Paragraph>
                                    {this.state.address}
                                </Paragraph>
                                <Paragraph>
                                    {this.state.email}
                                </Paragraph>
                                <Paragraph>
                                    {this.state.telephone}
                                </Paragraph>

                            </div>

                        </Content>
                    </PageHeader>




                    <Row>
                        <Col span={16}>

                            <div style={{ padding: '30px', marginTop: "20px" }}>
                                <Row gutter={16}>
                                    <Card title="QuickLinks" bordered={false} style={{ font: 'bold', padding: '25px' }}>
                                        <Col span={8}>
                                            <h4>
                                                Student Detail
                                                <br />
                                                <small>
                                                    Invite student to the platform
                                                </small>
                                            </h4>
                                            <div style={{ marginTop: '20px' }}>
                                                {/* <Button block size="small">+</Button> */}
                                                <AddNewStudent />
                                            </div>
                                        </Col>
                                        <Col span={8}>
                                            <h4>
                                                Course Detail
                                                <br />
                                                <small>
                                                    Add new course to the platform
                                                </small>
                                            </h4>
                                            <div style={{ marginTop: '20px' }}>
                                                {/* <Button block size="small">+</Button> */}
                                                <AddNewCourse />
                                            </div>
                                        </Col>
                                        <Col span={8}>
                                            <h4>
                                                Credentials Detail
                                                <br />
                                                <small>
                                                    Add new credentials to the platform
                                                </small>
                                            </h4>
                                            <div style={{ marginTop: '20px' }}>
                                                {/* <Button block size="small">+</Button> */}
                                                <AddNewCourseCredentials />
                                            </div>
                                        </Col>
                                    </Card>

                                </Row>
                            </div>



                            <div style={{ padding: '30px', marginTop: "20px" }}>
                                <Row gutter={16}>
                                    <Card title="Activity" bordered={false} style={{ font: 'bold', padding: '25px' }}>
                                        <Paragraph strong={true} type="warning">
                                            Student Registerd
                                        </Paragraph>
                                    </Card>

                                </Row>
                            </div>



                        </Col>

                        <Col span={8}>
                            <div style={{ padding: '30px', marginTop: "20px" }}>
                                <Card title="Student Enrollment Trend" bordered={false}>
                                    <StudentChart />
                                </Card>
                            </div>
                        </Col>
                    </Row>


                </Layout>

            </Layout>
        );
    }
}

export default Home;