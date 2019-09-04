import React from 'react';
import { Modal, Button, Form, Input, DatePicker } from 'antd';
import moment from 'moment';


const { RangePicker } = DatePicker;

function onChangeDate(dates, dateStrings) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
}

class CreateCourseInstanceModal extends React.Component {
    state = { visible: false };
    constructor(props) {
        super(props);
    }
    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

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
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Create New Course Instance
        </Button>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <Form.Item label="Course Name">
                            <Input
                                placeholder="enter course tags"
                                allowClear />
                        </Form.Item>

                        <Form.Item label="Course Name">
                            <Input
                                placeholder="enter course tags"
                                allowClear />
                        </Form.Item>

                        <Form.Item label="Course Name">
                            <Input
                                placeholder="enter course tags"
                                allowClear />
                        </Form.Item>

                        <Form.Item label="Course Name">
                            <Input
                                placeholder="enter course tags"
                                allowClear />
                        </Form.Item>

                        <Form.Item label="Course Name">
                            <Input
                                placeholder="enter course tags"
                                allowClear />
                        </Form.Item>

                        <Form.Item label="Course Name">
                            <Input
                                placeholder="enter course tags"
                                allowClear />
                        </Form.Item>

                        <Form.Item label="Course Name">
                            <Input
                                placeholder="enter course tags"
                                allowClear />
                        </Form.Item>

                        <Form.Item label="Course Name">
                            <Input
                                placeholder="enter course tags"
                                allowClear />
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
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default CreateCourseInstanceModal; 