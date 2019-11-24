import React from 'react';
import axios from 'axios';
import { Layout, Table, Modal, Button, Input, Form, DatePicker } from 'antd';
import Swal from 'sweetalert2';
import Sidebar from '../common/Sidebar';
import moment from 'moment';
import CreateCourseModal from '../ant-modal/CreateCourseModal';

const { Header, Footer } = Layout;



const { RangePicker } = DatePicker;

function onChangeDate(dates, dateStrings) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
}




class Course extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            loading: false,
            iconLoading: false,
            name: '',
            creditUnitType: '',
            creditUniteValue: '',
            ctid: '',
            subjectWebpage: '',
            prerequisite: '',
            uri: '',
            courseCode: '',
            courseArray: []
        }
    }

    buttonText = "Send Credentials"
    courseDataArray = [];

    columns = [
        {
            title: 'Course Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Credit Unit Type',
            dataIndex: 'creditUnitType',
            key: 'creditUnitType',
        },
        {
            title: 'Course Tags',
            key: 'creditUniteValue',
            dataIndex: 'creditUniteValue'
        },
        {
            title: 'Ctid',
            key: 'ctid',
            dataIndex: 'ctid'
        },
        {
            title: 'Subject Webpage',
            key: 'subjectWebpage',
            dataIndex: 'subjectWebpage'
        },
        {
            title: 'Pre Requisite',
            key: 'prerequisite',
            dataIndex: 'prerequisite'
        },
        {
            title: 'uri',
            key: 'uri',
            dataIndex: 'uri',
            render: () => (
                <span>
                    <a href="https://xdemic-api.herokuapp.com/httpcourse">Course URL</a>
                </span>
            )
        },
        {
            title: 'Course Code',
            key: 'courseCode',
            dataIndex: 'courseCode'
        },
        {
            title: 'Send Credentials',
            key: 'x',
            dataIndex: '',
            render: () => (
                <span>
                    <Button type="primary" loading={this.state.loading} id={this.state.courseArray[0].key}  onClick={ (e) => this.sendCredentials(e) } ghost >
                        {this.buttonText}
                    </Button>
                </span>
            ) 
        }
    ];

    componentDidMount() {
        this.getAllCourses();
    }

    sendCredentials = (e) => {
        this.enterLoading();
        console.log(e);
        axios.post('https://xdemic-api.herokuapp.com/credentials', {
            courseUrl: "https://xdemic-api.herokuapp.com/httpcourse"
        })
            .then(res => {
                if (res.data.status) {
                    this.setState({loading: false});
                    Swal.fire('Credentials', 'sent successfully please check xdemic mobile app notifications', 'success');
                }
            })
            .catch(err => {
                Swal.fire('Error', err.message, 'error');
            })
    }

    getAllCourses = () => {
        let newArray = [];
        axios.get('https://xdemic-api.herokuapp.com/courses')
            .then(res => {

                if (res.data.status) {

                    this.courseDataArray = res.data.data;
                    res.data.data.map(e => {
                        newArray.push({
                            key: e._id,
                            name: e.name,
                            creditUnitType: e.creditUnitType,
                            creditUniteValue: e.creditUniteValue,
                            ctid: e.ctid,
                            subjectWebpage: e.subjectWebpage,
                            prerequisite: e.prerequisite,
                            uri: '',
                            courseCode: e.courseCode,
                            sendCredentials: e._id
                        })
                    });
                    // setting state
                    this.setState({
                        courseArray: newArray
                    });

                }
                else {
                    console.log('else');
                    Swal.fire('Oho...', 'No Record Found', 'info');
                }
            })
            .catch(err => {
                Swal.fire('Error', err.message, 'error');
            });
    }

    handleChildFunc = () => {
        return '5d64f9e2223623390250c8e1';
    }



    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    enterLoading = () => {
        this.setState({ loading: true });
    };

    enterIconLoading = () => {
        this.setState({ iconLoading: true });
    };

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitHandler = e => {
        e.preventDefault();
        this.enterLoading();
        this.sendCourse();
    }

    sendCourse = () => {
        axios.post('https://xdemic-api.herokuapp.com/course', this.state)
            .then(res => {
                if (res.data.status) {
                    this.setState({ loading: false });
                    this.handleCancel();
                    this.getAllCourses();
                    Swal.fire('Course', 'created and live on url', 'success');
                }
                else {
                    this.setState({ loading: false });
                    this.handleCancel();
                    Swal.fire('Oho...', 'An Error Occured', 'error');
                }
            })
            .catch(err => {
                this.setState({ loading: false });
                this.handleCancel();
                Swal.fire('Error', 'An error occured', 'error');
            });
    }

    render() {
        const { name, creditUnitType, creditUniteValue, ctid, subjectWebpage, prerequisite, uri, courseCode } = this.state;

        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Layout>

                    <Header style={{ background: '#fff', padding: 0 }} />






                    <div>


                        <Button type="primary" style={{ float: "right" }} onClick={this.showModal}>
                            New Course
                    </Button>
                        <Modal
                            title="Enter Course Detail"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >
                            <Form onSubmit={this.submitHandler}>
                                <Form.Item label="Course Name">
                                    <Input
                                        placeholder="enter course name"
                                        allowClear
                                        name="name"
                                        value={name}
                                        onChange={this.changeHandler}
                                    />
                                </Form.Item>

                                <Form.Item label="Course Credit Unit Type">
                                    <Input
                                        placeholder="enter credit unit type"
                                        allowClear
                                        name="creditUnitType"
                                        value={creditUnitType}
                                        onChange={this.changeHandler} />
                                </Form.Item>

                                <Form.Item label="Course Credit Unite Value">
                                    <Input
                                        placeholder="enter credit unite value"
                                        allowClear
                                        name="creditUniteValue"
                                        value={creditUniteValue}
                                        onChange={this.changeHandler}
                                    />
                                </Form.Item>

                                <Form.Item label="Course Ctid">
                                    <Input
                                        placeholder="enter course ctid"
                                        allowClear
                                        name="ctid"
                                        value={ctid}
                                        onChange={this.changeHandler}
                                    />
                                </Form.Item>

                                <Form.Item label="Course Subject Web Page">
                                    <Input
                                        placeholder="enter course subject web page"
                                        allowClear
                                        name="subjectWebpage"
                                        value={subjectWebpage}
                                        onChange={this.changeHandler} />
                                </Form.Item>

                                <Form.Item label="Course Pre Requisite">
                                    <Input
                                        placeholder="enter pre requisite"
                                        allowClear
                                        name="prerequisite"
                                        value={prerequisite}
                                        onChange={this.changeHandler} />
                                </Form.Item>

                                <Form.Item label="Course Uri">
                                    <Input
                                        placeholder="enter course uri"
                                        allowClear
                                        name="uri"
                                        value={uri}
                                        onChange={this.changeHandler} />
                                </Form.Item>

                                <Form.Item label="Course Code">
                                    <Input
                                        placeholder="enter Course Code"
                                        allowClear
                                        name="courseCode"
                                        value={courseCode}
                                        onChange={this.changeHandler} />
                                </Form.Item>

                                <Form.Item label="Select Date">
                                    <RangePicker
                                        ranges={{
                                            Today: [moment(), moment()],
                                            'This Month': [moment().startOf('month'), moment().endOf('month')],
                                        }}
                                        onChange={onChangeDate}
                                    />
                                </Form.Item>

                                <Button type="primary" loading={this.state.loading} onClick={this.submitHandler} ghost >
                                    Submit
                                </Button>

                            </Form>
                        </Modal>
                    </div>












                    <Table columns={this.columns} dataSource={this.state.courseArray} pagination={{ pageSize: 5 }} onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {
                                // this.props.history.push({
                                //     pathname: '/coursedetail',
                                //     state: { detail: this.courseDataArray[rowIndex] }
                                // })
                            }
                        };
                    }} myFunc={this.handleChildFunc}>
                    </Table>
                    <Footer style={{ textAlign: 'center' }}>Hoola Tech ©2019</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Course;