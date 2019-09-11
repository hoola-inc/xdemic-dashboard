import React from 'react';
import { Modal, Button, Form, Input, DatePicker } from 'antd';

class SchoolRegisterModal extends React.Component {
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
                        <Form.Item label="school Name">
                            <Input
                                placeholder="enter school name"
                                allowClear />
                        </Form.Item>

                        <Form.Item label="School Logo">
                            <Input
                                placeholder="enter school logo"
                                allowClear />
                        </Form.Item>

                        <Form.Item label="School Contact Info">
                            <Input
                                placeholder="enter school contact info"
                                allowClear />
                        </Form.Item>

                        <Form.Item label="School Branded Url">
                            <Input
                                placeholder="school branded url"
                                allowClear />
                        </Form.Item>

                    </Form>
                </Modal>
            </div>
        );
    }
}

export default SchoolRegisterModal; 