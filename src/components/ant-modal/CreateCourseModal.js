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

    constructor(props) {
        super(props);
    }
    state = {
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
        courseCode: ''
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
        axios.post('https://xdemic-api.herokuapp.com/course', this.state)
            .then(res => {
                if (res.data.status) {
                    this.setState({ loading: false });
                    this.handleCancel();
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

        );
    }
}

export default CreateCourseModal;