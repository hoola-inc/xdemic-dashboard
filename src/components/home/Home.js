import React from "react";
import { Layout, PageHeader, Menu, Dropdown, Icon, Button, Tag, Typography, Row, Col, Card, Divider } from 'antd';
import Sidebar from "../common/Sidebar";
import CredentialsChart from "../../charts/CredentialsChart";
import SemesterChart from "../../charts/SemesterChart";
import CoursesChart from "../../charts/CoursesChart";
import StudentChart from "../../charts/StudentsChart"
import Headers from '../common/Header';
import AddNewStudent from '../ant-modal/AddNewStudentModal';
import AddNewCourse from '../ant-modal/CreateCourseModal';
import AddNewCourseCredentials from '../ant-modal/CreateCourseInstanceModal';

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

const content = (
    <div className="content">
        <Paragraph>
            <small>
                School Address, City, Country
            </small>
        </Paragraph>
        <Paragraph>
            <small>
                Phone, Email
            </small>
        </Paragraph>
        <Paragraph>
            <small>
                Website
            </small>
        </Paragraph>

    </div>
);

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
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Layout>
                    <Headers />
                    <PageHeader
                        style={{ marginTop: "50px" }}
                        title="Credentials Dashboard"
                        avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
                        breadcrumb={{ routes }}
                    >
                        <Content>
                            {content}
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
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                                            probare, quae sunt a te dicta? Refert tamen, quo modo.
                                        </p>
                                        <Divider />
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                                            probare, quae sunt a te dicta? Refert tamen, quo modo.
                                        </p>
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