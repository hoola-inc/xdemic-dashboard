import React from 'react';
import axios from 'axios';
import { Modal, Button, Input, Form, DatePicker, message } from 'antd';

class AddNewPersonModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            loading: false,
            iconLoading: false,
            email: '',
        };

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
        // this.handleSubmit()
        this.sendCourse();
    }

    sendCourse = () => {
        axios.post('https://xdemic-api.herokuapp.com/email', this.state)
            .then(res => {
                if (res.data.status) {
                    this.setState({ loading: false });
                    message.success('Email Sent');
                    this.handleCancel();
                }
                else {
                    message.error('Something went wrong!');
                    this.handleCancel();
                    this.setState({ loading: false })
                }
            })
            .catch(err => {
                console.log('An Error occured while sending Email ::: ', err.message);
                message.error(err.message);
                this.setState({ loading: false });
                this.handle.onCancel();
            });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { email } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Button block size="default" onClick={this.showModal}>
                    + Add Person
                </Button>
                <Modal
                    title="Enter Person Email"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form onSubmit={this.submitHandler}>
                        <Form.Item label="Person Email">
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Please input person email!' }],
                            })(
                                <Input
                                    placeholder="enter person email"
                                    allowClear
                                    name="email"
                                    value={email}
                                    onChange={this.changeHandler}
                                />
                            )}
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



const AddNewPerson = Form.create()(AddNewPersonModal);

export default AddNewPerson; 