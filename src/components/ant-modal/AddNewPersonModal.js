import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Modal, Button, Input, Form, DatePicker } from 'antd';
import moment from 'moment';
const { RangePicker, MonthPicker } = DatePicker;

class AddNewPersonModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            loading: false,
            iconLoading: false,

            fullName: '',
            givenName: '',
            familyName: '',
            email: '',
            mobile: '',
            URL: '',
            birthDate: '',
            sourcedId: '',
            gender: '',

        };

        this.onDateChange = this.onDateChange.bind(this);

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
        console.log(e.target.value);
        this.setState({ [e.target.name]: e.target.value });
        console.log("DATA: ===> ",this.state);
    }

    onDateChange(date, dateString) {
        
        console.log('DSDD',date, dateString);
        this.setState({ birthDate: dateString });
      }

    submitHandler = e => {
        e.preventDefault();
        this.enterLoading();
        
        axios.post('https://xdemic-api.herokuapp.com/person', this.state)
            .then(res => {
                console.log(res);
                if (res.data.status) {
                    this.setState({ loading: false });
                    Swal.fire('Success', 'Data Sent', 'success');
                    this.handleCancel();
                }
                else {
                    Swal.fire('Oho...', 'Something went wrong!', 'error');
                    this.handleCancel();
                    this.setState({ loading: false })
                }
            })
            .catch(err => {
                console.log('An Error occured while sending Email ::: ', err.message);
                Swal.fire('Error', err.message, 'error');
                this.setState({ loading: false });
                this.handle.onCancel();
            });

        // this.sendCourse();
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
                console.log('An Error occured while sending Email ::: ', err.message);
                Swal.fire('Error', err.message, 'error');
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
        const { 
            fullName,
            givenName,
            familyName,
            sourcedId,
            email,
            mobile,
            URL,
            gender
            
        } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Button block type="default" onClick={this.showModal}>
                    Create
</Button>
                <Modal
                    title="Enter Course Detail"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form onSubmit={this.submitHandler}>
                        <Form.Item label="Person Full Name">
                            {getFieldDecorator('fullName', {
                                rules: [{ required: true, message: 'Please input person name!' }],
                            })(
                                <Input
                                    placeholder="enter full name"
                                    allowClear
                                    name="fullName"
                                    value={fullName}
                                    onChange={this.changeHandler}
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="Person Given Name">
                            {getFieldDecorator('givenName', {
                                rules: [{ required: true, message: 'Please input person given name!' }],
                            })(
                                <Input
                                    placeholder="enter given name"
                                    allowClear
                                    name="givenName"
                                    value={givenName}
                                    onChange={this.changeHandler}
                                />
                            )}
                        </Form.Item>
                        
                         <Form.Item label="Student Email">
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
                        
                        <Form.Item label="Person Famil Name">
                            {getFieldDecorator('familyName', {
                                rules: [{ required: true, message: 'Please input person family name!' }],
                            })(
                                <Input
                                    placeholder="enter family name"
                                    allowClear
                                    name="familyName"
                                    value={familyName}
                                    onChange={this.changeHandler}
                                />
                            )}
                        </Form.Item>

                        <Form.Item label="Person Mobile">
                            {getFieldDecorator('mobile', {
                                rules: [{ required: true, message: 'Please input person contact number!' }],
                            })(
                                <Input
                                    placeholder="enter person contact number"
                                    allowClear
                                    name="mobile"
                                    value={mobile}
                                    onChange={this.changeHandler}
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="URL">
                            {getFieldDecorator('URL', {
                                rules: [{ required: true, message: 'Please input URL!' }],
                            })(
                                <Input
                                    placeholder="enter URL"
                                    allowClear
                                    name="URL"
                                    value={URL}
                                    onChange={this.changeHandler}
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="Person source did">
                            {getFieldDecorator('sourcedId', {
                                rules: [{ required: true, message: 'Please input person source did!' }],
                            })(
                                <Input
                                    placeholder="enter person source did"
                                    allowClear
                                    name="sourcedId"
                                    value={sourcedId}
                                    onChange={this.changeHandler}
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="Person gender">
                            {getFieldDecorator('gender', {
                                rules: [{ required: true, message: 'Please input person gender!' }],
                            })(
                                <Input
                                    placeholder="enter person gender"
                                    allowClear
                                    name="gender"
                                    value={gender}
                                    onChange={this.changeHandler}
                                />
                            )}
                        </Form.Item>
                        
                        <Form.Item label="Person date of birth">
                            <DatePicker 
                                showToday={true}
                                onChange={this.onDateChange}
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



const AddNewPerson = Form.create()(AddNewPersonModal);

export default AddNewPerson;