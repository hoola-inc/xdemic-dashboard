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

class AddNewStudentModal extends React.Component {

    constructor(props) {
        super(props);
    }
    state = {
        visible: false,
        loading: false,
        iconLoading: false,
        email: '',
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
        axios.post('https://xdemic-api.herokuapp.com/email', this.state)
            .then(res => {
                if (res.data.status) {
                    this.setState({ loading: false });
                    Swal.fire('Success', 'Email Sent', 'success');
                    this.handleCancel();
                }
                else {
                    Swal.fire('Oho...', 'Something went wrong!', 'error');
                    this.handleCancel();
                    this.setState({ loading: false })
                }
            })
            .catch(err => {
                Swal.fire('Error', 'An error occured', 'error');
            });
    }

    render() {
        const { email } = this.state;

        return (
            <div>
                <Button type="primary" style={{ float: "right" }} onClick={this.showModal}>
                    Add New Student
        </Button>
                <Modal
                    title="Enter Course Detail"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form onSubmit={this.submitHandler}>
                        <Form.Item label="Student Email">
                            <Input
                                placeholder="enter student email"
                                allowClear
                                name="email"
                                value={email}
                                onChange={this.changeHandler}
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



const AddNewStudent = Form.create()(AddNewStudentModal);

export default AddNewStudent; 