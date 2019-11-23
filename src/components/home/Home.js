import React from 'react';
import Headers from '../common/Header';
import Sidebar from "../common/Sidebar";
import AddStudents from '../ant-modal/AddNewStudentModal';
import AddTeachers from '../ant-modal/AddTeacherModal';
import { Layout, Icon, Row, Col, Card, Typography } from 'antd';

const gridStyle = {
    width: '25%',
    textAlign: 'center',
    borderRadius: '2px !important',
};
class Home extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        const teacherCardReactNode = <div> <Icon type="team" /> User Overview <br /> <div style={{ marginTop: 10 }}> <Icon type="solution" /> Teachers </div></div>;
        const studentCardReactNode = <div> <Icon type="team" /> User Overview <br /> <div style={{ marginTop: 10 }}> <Icon type="user" /> Students </div></div>;
        const addTeacher = <AddTeachers />;
        const addStudent = <AddStudents />;

        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Layout>
                    <Headers />



                    <Row gutter={24} style={{ padding: 25 }}>
                        <Col span={12}>
                            <Card title={teacherCardReactNode} hoverable={true} extra={addTeacher}>
                                <Card.Grid style={gridStyle}>
                                    <Typography.Title strong='true'>17</Typography.Title>
                                    <Typography.Text strong='true'> Total </Typography.Text>
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>
                                    <Typography.Title type="secondary" strong='true'>0</Typography.Title>
                                    <Typography.Text type="secondary"> Pending </Typography.Text>
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>
                                    <Typography.Title type="warning" strong='true'>4</Typography.Title>
                                    <Typography.Text type="warning"> Onboarding </Typography.Text>
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>
                                    <Typography.Title style={{ color: 'green' }} type="default" strong='true'>13</Typography.Title>
                                    <Typography.Text style={{ color: 'green' }}> Playing </Typography.Text>
                                </Card.Grid>
                            </Card>
                        </Col>

                        <Col span={12}>
                            <Card title={studentCardReactNode} hoverable={true} extra={addStudent}>
                                <Card.Grid style={gridStyle}>
                                    <Typography.Title strong='true'>17</Typography.Title>
                                    <Typography.Text strong='true'> Total </Typography.Text>
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>
                                    <Typography.Title type="secondary" strong='true'>0</Typography.Title>
                                    <Typography.Text type="secondary"> Pending </Typography.Text>
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>
                                    <Typography.Title type="warning" strong='true'>4</Typography.Title>
                                    <Typography.Text type="warning"> Onboarding </Typography.Text>
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>
                                    <Typography.Title style={{ color: 'green' }} type="default" strong='true'>13</Typography.Title>
                                    <Typography.Text style={{ color: 'green' }}> Playing </Typography.Text>
                                </Card.Grid>
                            </Card>
                        </Col>

                    </Row>

                    <Row gutter={24} style={{padding: 25}}>
                        <Col span={12}>
                            <Card title={studentCardReactNode} hoverable={true} extra={addStudent}>
                                <Card.Grid style={gridStyle}>
                                    <Typography.Title strong='true'>17</Typography.Title>
                                    <Typography.Text strong='true'> Total </Typography.Text>
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>
                                    <Typography.Title type="secondary" strong='true'>0</Typography.Title>
                                    <Typography.Text type="secondary"> Pending </Typography.Text>
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>
                                    <Typography.Title type="warning" strong='true'>4</Typography.Title>
                                    <Typography.Text type="warning"> Onboarding </Typography.Text>
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>
                                    <Typography.Title style={{ color: 'green' }} type="default" strong='true'>13</Typography.Title>
                                    <Typography.Text style={{ color: 'green' }}> Playing </Typography.Text>
                                </Card.Grid>
                            </Card>
                        </Col>

                        <Col span={12}>
                            <Card title={studentCardReactNode} hoverable={true} extra={addStudent}>
                                <Card.Grid style={gridStyle}>
                                    <Typography.Title strong='true'>17</Typography.Title>
                                    <Typography.Text strong='true'> Total </Typography.Text>
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>
                                    <Typography.Title type="secondary" strong='true'>0</Typography.Title>
                                    <Typography.Text type="secondary"> Pending </Typography.Text>
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>
                                    <Typography.Title type="warning" strong='true'>4</Typography.Title>
                                    <Typography.Text type="warning"> Onboarding </Typography.Text>
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>
                                    <Typography.Title style={{ color: 'green' }} type="default" strong='true'>13</Typography.Title>
                                    <Typography.Text style={{ color: 'green' }}> Playing </Typography.Text>
                                </Card.Grid>
                            </Card>
                        </Col>
                    </Row>

                </Layout>
            </Layout >
        )
    }
}

export default Home;