import React from "react";
import { Layout, Table, Tag, Row, Col, Card, List, Typography } from 'antd';
import Sidebar from "../common/Sidebar";
import CredentialsChart from "../../charts/CredentialsChart";
import SemesterChart from "../../charts/SemesterChart";
import CoursesChart from "../../charts/CoursesChart";
import StudentChart from "../../charts/StudentsChart"
import Headers from '../common/Header';

const { Footer } = Layout;


const data = [];

class Home extends React.Component {
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Layout>
                    <Headers />


                    <div style={{ background: '#ECECEC', padding: '30px', marginTop: "20px" }}>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Card title="Students" bordered={false}>
                                    <StudentChart />
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card title="Courses" bordered={false}>
                                    <CoursesChart />
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card title="Credentials" bordered={false}>
                                    <CredentialsChart />
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card title="Semesters" bordered={false}>
                                    <SemesterChart />
                                </Card>
                            </Col>
                        </Row>
                    </div>

                    <div style={{ background: '#ECECEC', padding: '30px', marginTop: "20px" }}>
                        <Row gutter={16}>
                            <Card title="QuickLinks" bordered={false} style={{ font: 'bold' }}>
                                <Col span={8}>
                                    <h2>
                                        Student Detail
                                    </h2>
                                </Col>
                                <Col span={8}>
                                    <h2>
                                        Course Detail
                                    </h2>
                                </Col>
                                <Col span={8}>
                                    <h2>
                                        Credentials Detail
                                    </h2>
                                </Col>
                            </Card>

                        </Row>
                    </div>

                    <Footer style={{ textAlign: 'center' }}>Hoola Tech ©2019</Footer>

                </Layout>
            </Layout>
        );
    }
}

export default Home;