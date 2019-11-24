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

class SchoolModal extends React.Component {

    constructor(props) {
        super(props);
    }
    state = {
        visible: false,
        loading: false,
        iconLoading: false,
        name: '',
        subjectWebpage: '',
        address: '',
        offers: '',
        agentSectorType: '',
        agentType: '',
        email: '',
        did: '',
        telephone: ''
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
        console.log(this.state);
        axios.post('https://xdemic-api.herokuapp.com/school', this.state)
            .then(res => {
                console.log(res);
                if (res.data.status) {
                    this.setState({ loading: false });
                    Swal.fire('Course', 'created and live on url', 'success');
                }
                else {
                    Swal.fire('Oho...', 'Something went wrong!', 'info');
                }
            })
            .catch(err => {
                Swal.fire('Error', 'An error occured', 'error');
            });
    }

    render() {
        const { name, subjectWebpage, address, offers, agentSectorType, agentType, email, telephone } = this.state;

        return (
            <div>
                <Button type="primary" style={{ float: "right" }} onClick={this.showModal}>
                    New School
        </Button>
                <Modal
                    title="Enter Course Detail"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form onSubmit={this.submitHandler}>
                        <Form.Item label="School Name">
                            <Input
                                placeholder="enter school name"
                                allowClear
                                name="name"
                                value={name}
                                onChange={this.changeHandler}
                            />
                        </Form.Item>

                        <Form.Item label="School Subject Webpage">
                            <Input
                                placeholder="enter school webpage"
                                allowClear
                                name="subjectWebpage"
                                value={subjectWebpage}
                                onChange={this.changeHandler} />
                        </Form.Item>

                        <Form.Item label="School Address">
                            <Input
                                placeholder="enter school address"
                                allowClear
                                name="address"
                                value={address}
                                onChange={this.changeHandler}
                            />
                        </Form.Item>

                        <Form.Item label="School Offers">
                            <Input
                                placeholder="enter school offers"
                                allowClear
                                name="offers"
                                value={offers}
                                onChange={this.changeHandler}
                            />
                        </Form.Item>

                        <Form.Item label="School Agent Sector Type">
                            <Input
                                placeholder="enter school agent sector type"
                                allowClear
                                name="agentSectorType"
                                value={agentSectorType}
                                onChange={this.changeHandler} />
                        </Form.Item>

                        <Form.Item label="School Agent Type">
                            <Input
                                placeholder="enter school agent type"
                                allowClear
                                name="agentType"
                                value={agentType}
                                onChange={this.changeHandler} />
                        </Form.Item>

                        <Form.Item label="School Email">
                            <Input
                                placeholder="enter school email"
                                allowClear
                                name="email"
                                value={email}
                                onChange={this.changeHandler} />
                        </Form.Item>

                        <Form.Item label="School Telephone">
                            <Input
                                placeholder="enter school telephone"
                                allowClear
                                name="telephone"
                                value={telephone}
                                onChange={this.changeHandler} />
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


const SchoolRegisterModal = Form.create()(SchoolModal);

export default SchoolRegisterModal; 