import React, { Component } from "react";
import { Modal, Button, Input, Form, message } from "antd";

class UpdatePersonModal extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    this.enterLoading();
    // this.handleSubmit()
    this.sendCourse();
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Update Person
        </Button>
        <Modal
          title="Person"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form onSubmit={this.submitHandler}>
            <Form.Item label="Name">
              <Input placeholder={`Enter name`} allowClear name="name" />
            </Form.Item>

            <Form.Item label="Date of birth">
              <Input
                placeholder={`Enter date of birth`}
                allowClear
                name="birthDate"
              />
            </Form.Item>

            <Form.Item label="Gender">
              <Input placeholder={`Enter gender`} allowClear name="gender" />
            </Form.Item>

            <Form.Item label="Email">
              <Input placeholder={`Enter email`} allowClear name="email" />
            </Form.Item>

            <Button type="primary" ghost>
              Submit
            </Button>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default UpdatePersonModal;
