import React from 'react';
import { Modal, Button, Form, Input, DatePicker } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';

const { TextArea } = Input;

class SchoolModal extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        visible: false,
        name: '',
        address: '',
        email: '',
        subjectWebpage: '',
        agentSectorType: '',
        agentType: '',
        description: ''
    };

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

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitHandler = e => {
        e.preventDefault();
        this.createNewSchool();
    }

    createNewSchool = () => {
        axios.post('https://xdemic-badger-service.herokuapp.com/school', this.state)
            .then(res => {
                if (res.data.status) {
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

        const { name, address, email, subjectWebpage, agentSectorType, agentType, description } = this.state;

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
                    <Form onSubmit={this.submitHandler}>
                        <Form.Item label="School Name">
                            <Input
                                placeholder="enter school name"
                                name="name"
                                value={name}
                                onChange={this.changehandler}
                                allowClear
                            />
                        </Form.Item>

                        {/* <Form.Item label="School Address">
                            <Input
                                placeholder="enter school address"
                                name="address"
                                value={address}
                                onChange={this.changehandler}
                            />
                        </Form.Item>

                        <Form.Item label="School Email">
                            <Input
                                placeholder="enter school email"
                                name="email"
                                value={email}
                                onChange={this.changehandler}
                            />
                        </Form.Item>

                        <Form.Item label="School Subject Webpage">
                            <Input
                                placeholder="school subject web page"
                                name="subjectWebpage"
                                value={subjectWebpage}
                                onChange={this.changehandler}
                            />
                        </Form.Item>

                        <Form.Item label="School Agent Sector Type">
                            <Input
                                placeholder="enter agent sector type"
                                name="agentSectorType"
                                value={agentSectorType}
                                onChange={this.changehandler}
                            />
                        </Form.Item>

                        <Form.Item label="School Agent Type">
                            <Input
                                placeholder="enter agent type"
                                name="agentType"
                                value={agentType}
                                onChange={this.changehandler}
                            />
                        </Form.Item>

                        <Form.Item label="School Description">
                            <TextArea rows={4}
                                placeholder="enter school description"
                                name="description"
                                value={description}
                                onChange={this.changehandler}
                            />
                        </Form.Item> */}
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.submitHandler}>
                                Submit
                            </Button>
                        </Form.Item>

                    </Form>
                </Modal>
            </div>
        );
    }
}

const SchoolRegisterModal = Form.create()(SchoolModal);

export default SchoolRegisterModal; 