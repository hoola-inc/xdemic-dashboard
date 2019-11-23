import React from 'react';
import Headers from '../common/Header';
import Sidebar from "../common/Sidebar";
import AddStudents from '../ant-modal/AddNewStudentModal';
import AddTeachers from '../ant-modal/AddTeacherModal';
import StdChart from '../../charts/StudentsChart';
import { Layout, Icon, Row, Col, Card, Typography, Anchor, List, Checkbox, Tag, DatePicker, Badge } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

function onChangeDatePicker(dates, dateStrings) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
}

const gridStyle = {
    width: '25%',
    textAlign: 'center',
    borderRadius: '2px !important',
};

function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
}


const data = [
    'Sent Transcript to graduation students',
    'Awaiting customer response',
    'Awaiting developer fix',
    'Pending'
];

const dataA = [
    'Sent Transcript to graduation students',
    'Awaiting customer response',
    'Awaiting developer fix',
    'Pending',
    'Sent Transcript to graduation students',
    'Awaiting customer response',
    'Awaiting developer fix',
    'Pending'
];

const tabListNoTitle = [
    {
        key: 'article',
        tab: 'Sales',
    },
    {
        key: 'app',
        tab: 'Visits',
    }
];

const contentListNoTitle = {
    article: <StdChart />,
    app: <p>Number of visitors</p>,
};
class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            targetOffset: undefined,
            key: 'tab1',
            noTitleKey: 'article',
        };
    }

    componentDidMount() {
        this.setState({
            targetOffset: window.innerHeight / 2,
        });
    }

    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
    };



    render() {

        const teacherCardReactNode = <div> <Icon type="team" /> User Overview <br /> <div style={{ marginTop: 10 }}> <Icon type="solution" /> Teachers </div></div>;
        const studentCardReactNode = <div> <Icon type="team" /> User Overview <br /> <div style={{ marginTop: 10 }}> <Icon type="user" /> Students </div></div>;
        const userHistoryReactNode = <div>  User History <br /> <div style={{ marginTop: 10 }}> Group, Registor </div></div>;
        const viewHistoryReactNode = <div>  Credentials Received <br /> <div style={{ marginTop: 10 }}>  Today </div></div>;
        const userHistoryAnchorReactNode = <Anchor targetOffset={this.state.targetOffset}> <Anchor.Link href="#components-anchor-demo-basic" title="View details" />  </Anchor>;
        const viewHistoryAnchorReactNode = <Anchor targetOffset={this.state.targetOffset}> <Anchor.Link href="#components-anchor-demo-basic" title="View all" /> </Anchor>
        const addTeacher = <AddTeachers />;
        const addStudent = <AddStudents />;
        const datePicker = <RangePicker size="small"
            ranges={{
                Today: [moment(), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
            }}
            onChange={onChangeDatePicker}
        />;

        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Layout>
                    <Headers />



                    <Row gutter={24} style={{ padding: 25 }}>
                        <Col span={12}>
                            <Card title={teacherCardReactNode} hoverable extra={addTeacher}>
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
                            <Card title={studentCardReactNode} hoverable extra={addStudent}>
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

                    <Row gutter={24} style={{ padding: 25 }}>
                        <Col span={12}>
                            <Card title={userHistoryReactNode} hoverable extra={userHistoryAnchorReactNode}>
                                <List
                                    size="large"
                                    dataSource={data}
                                    renderItem={item => <List.Item> <Typography.Text>{item}</Typography.Text> <span style={{ float: 'right' }}> 4200 </span> </List.Item>}
                                />
                            </Card>
                        </Col>

                        <Col span={12}>
                            <Card title={viewHistoryReactNode} hoverable extra={viewHistoryAnchorReactNode}>
                                <List
                                    size="large"
                                    dataSource={data}
                                    renderItem={
                                        item => <List.Item>
                                            <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                                                <Checkbox value="A" />
                                                <Typography.Text style={{ paddingLeft: 20 }}>
                                                    {item}
                                                </Typography.Text>
                                            </Checkbox.Group>
                                            <span style={{ float: 'right' }}>       <Tag color="volcano">volcano</Tag> </span>
                                        </List.Item>
                                    }
                                />
                            </Card>
                        </Col>
                    </Row>


                    <Row gutter={24} style={{ padding: 25 }}>
                        <Col span={24}>
                            <Card
                                style={{ width: '100%' }}
                                hoverable
                                tabList={tabListNoTitle}
                                activeTabKey={this.state.noTitleKey}
                                tabBarExtraContent={datePicker}
                                onTabChange={key => {
                                    this.onTabChange(key, 'noTitleKey');
                                }}
                            >
                                <Card.Grid style={{ width: '60%' }}>
                                    {contentListNoTitle[this.state.noTitleKey]}
                                </Card.Grid>
                                <Card.Grid style={{ width: '40%' }}>
                                    <List
                                        size="large"
                                        dataSource={dataA}
                                        renderItem={item =>
                                            <List.Item>
                                                <Badge style={{ backgroundColor: '#000', color: '#fff' }} count={25} />
                                                <Typography.Text style={{ paddingLeft: 20 }}>
                                                    {item}
                                                </Typography.Text>
                                            </List.Item>
                                        }
                                    />
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