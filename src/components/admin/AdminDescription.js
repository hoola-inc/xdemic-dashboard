import React from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  DatePicker,
  Icon,
  message,
  Divider
} from "antd";
import axios from "axios";

// const { Option } = Select;
// const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

function onChange(date, dateString) {
  console.log(date, dateString);
}

class PersonalDetails extends React.Component {
  constructor(props) {
    super(props);
    this.myVideo = React.createRef();
    this.state = {
      name: "",
      userId: "",
      department: "",
      height: "",
      weight: "",
      email: "",
      dateOfBirth: ""
    };
  }



  ChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    console.log(this.myVideo.current.value);
    // axios
    //   .post("https://jazzfit-api.herokuapp.com/user", this.state)
    //   .then(response => {
    //     console.log(response.data);
    //     if (response.data.success) {
    //       message.success(" record sumited successfully");
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };
  render() {
    const {
      name,
      userId,
      department,
      email,
      dateOfBirth,
      height,
      weight
    } = this.state;
    return (
      <div>
        <Row>
          <Row>
            <Col span={8} offset={1} style={{ margin: "1%" }}>
              <h3 className="personal-details-text" style ={{textAlign:"start"}}>
                Please enter the required details to complete your profile
              </h3>
            </Col>
          </Row>
          <Col span={12}>
            <Form labelCol={{ span: 5 }}   wrapperCol={{ span: 16 }} onSubmit={this.submitHandler}>
              <div className="flex-container">
                <div className="flex-item flex2">
                  <span className="personal-details-text">Full Name</span>
                </div>
                <div className="flex-item flex1">
                  <Form.Item hasFeedback validateStatus="success">
                    <Input
                      type="text"
                      size="large"
                      name="name"
                      value={name}
                      onChange={this.ChangeHandler}
                      ref = {this.myVideo}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="flex-container">
                <div className="flex-item flex2">
                  <span className="personal-details-text">Id</span>
                </div>
                <div className="flex-item flex1">
                  <Form.Item hasFeedback validateStatus="success">
                    <Input
                      type="text"
                      size="large"
                      name="userId"
                      value={userId}
                      onChange={this.ChangeHandler}
                    ></Input>
                  </Form.Item>
                </div>
              </div>

              <div className="flex-container">
                <div className="flex-item flex2">
                  <span className="personal-details-text">Department</span>
                </div>
                <div className="flex-item flex1">
                  <Form.Item>
                    <Input
                      type="text"
                      size="large"
                      name="department"
                      value={department}
                      onChange={this.ChangeHandler}
                    ></Input>
                  </Form.Item>
                </div>
              </div>

              <div style={{ paddingTop: "7%" }}></div>
              <div className="flex-container">
                <div className="flex-item flex2">
                  <span className="personal-details-text">Date Of Birth</span>
                </div>
                <div className="flex-item flex1">
                  <Form.Item>
                    <DatePicker
                      onChange={onChange}
                      size="large"
                      name="dateOfBirth"
                      value={dateOfBirth}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="flex-container">
                <div className="flex-item flex2">
                  <span className="personal-details-text">Gender</span>
                </div>
                <div className="flex-item flex1">
                  <Form.Item style={{ width: "100%" }}>
                    <Button
                      type="primary"
                      size="large"
                      style={{ margin: "1% 1% 1% 1%", width: "31.2%" }}
                    >
                      Male
                    </Button>
                    <Button
                      type="dashed"
                      size="large"
                      style={{ margin: "1% 1% 1% 1%", width: "31.2%" }}
                    >
                      Female
                    </Button>
                    <Button
                      type="dashed"
                      size="large"
                      style={{ margin: "1% 1% 1% 1%", width: "31.2%" }}
                    >
                      Other
                    </Button>
                  </Form.Item>
                </div>
              </div>
            </Form>
          </Col>
          <Col span={12}>
            <Form
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 16 }}
              onSubmit={this.submitHandler}
            >
              <div className="flex-container">
                <div className="flex-item flex2">
                  <span className="personal-details-text">Date Of Birth</span>
                </div>
                <div className="flex-item flex1">
                  <Form.Item hasFeedback validateStatus="error">
                    <Input
                      prefix={<Icon type="mail" />}
                      placeholder="Enter Email Address"
                      name="email"
                      size="large"
                      value={email}
                      placeholder="me@example.com"
                      required
                      onChange={this.ChangeHandler}
                    />
                  </Form.Item>
                </div>
              </div>
              <div style={{ paddingTop: "21%" }}></div>

              <div className="flex-container">
                <div className="flex-item flex2">
                  <span className="personal-details-text">Height</span>
                </div>
                <div className="flex-item flex1">
                  <Form.Item>
                    <Col span={8}>
                      <Input
                        type="text"
                        size="large"
                        placeholder="e.g 5'10"
                        name="height"
                        value={height}
                        onChange={this.ChangeHandler}
                      ></Input>
                    </Col>
                  </Form.Item>
                </div>
              </div>

              <div className="flex-container">
                <div className="flex-item flex2">
                  <span className="personal-details-text">Weight</span>
                </div>
                <div className="flex-item flex1">
                  <Form.Item>
                    <Col span={8}>
                      <Input
                        type="text"
                        size="large"
                        placeholder="e.g 67kg"
                        name="weight"
                        value={weight}
                        onChange={this.ChangeHandler}
                      ></Input>
                    </Col>
                    {/* TODO change here  */}
                  </Form.Item>
                </div>
              </div>
              <div>
                <Button type="primary" onClick={this.submitHandler} >
                  Submit
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PersonalDetails;