import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Modal, Button, Input, Form, DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

function onChangeDate(dates, dateStrings) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
}

class CreateCourseModal extends React.Component {
    state = {
        visible: false,
        loading: false,
        iconLoading: false,
        course_name: '',
        course_code: '',
        course_description: '',
        course_grading_schema: '',
        course_tags: '',
        course_issuer: '',
        course_allignment: ''
    };

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
        axios.post('https://xdemic-badger-service.herokuapp.com/course', this.state.course_obj)
            .then(res => {
                if (res.data.status) {
                    this.setState({ loading: false });
                    Swal.fire('Course', 'created and live on url', 'success');
                }
                else {
                    Swal.fire('Oho...', 'Something went wrong!', 'error');
                }
            })
            .catch(err => {
                Swal.fire('Error', 'An error occured', 'error');
            });
    }

    render() {
        const { course_name, course_code, course_description, course_grading_schema, course_tags, course_issuer, course_allignment } = this.state;

        return (
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
                                name="course_name"
                                value={course_name}
                                onChange={this.changeHandler}
                            />
                        </Form.Item>

                        <Form.Item label="Course Code">
                            <Input
                                placeholder="enter course code"
                                allowClear
                                name="course_code"
                                value={course_code}
                                onChange={this.changeHandler} />
                        </Form.Item>

                        <Form.Item label="Course Description">
                            <Input
                                placeholder="enter course description"
                                allowClear
                                name="course_description"
                                value={course_description}
                                onChange={this.changeHandler}
                            />
                        </Form.Item>

                        <Form.Item label="Course Grading Schema">
                            <Input
                                placeholder="enter course grading schema"
                                allowClear
                                name="course_grading_schema"
                                value={course_grading_schema}
                                onChange={this.changeHandler}
                            />
                        </Form.Item>

                        <Form.Item label="Course Tags">
                            <Input
                                placeholder="enter course tags"
                                allowClear
                                name="course_tags"
                                value={course_tags}
                                onChange={this.changeHandler} />
                        </Form.Item>

                        <Form.Item label="Course Issuer">
                            <Input
                                placeholder="enter course issuer"
                                allowClear
                                name="course_issuer"
                                value={course_issuer}
                                onChange={this.changeHandler} />
                        </Form.Item>

                        <Form.Item label="Course Alignment">
                            <Input
                                placeholder="enter course alignment"
                                allowClear
                                name="course_allignment"
                                value={course_allignment}
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

        );
    }
}

export default CreateCourseModal;