import React from "react";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import countryList from "react-select-country-list";
import { Form, Input, Row, Col, Button, Avatar, message, Upload } from "antd";
import { connect } from "react-redux";
import { addAdmin } from "../../containers/Admin/actions";
import { fetchSchool, addNewSchool } from "../../containers/School/actions";

const UserList = ["U", "Lucy", "Tom", "Edward"];
const colorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}
class StepTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      user: UserList[0],
      color: colorList[0],

      options: this.options,
      value: null,

      name: "",
      email: "",
      phone: "",
      streetAddress: "",
      addressCountry: "",
      addressLocality: ""
    };

    this.options = countryList().getData();
    this.submitHandler = this.submitHandler.bind(this);
  }

  onChange = value => {
    this.setState({
      addressCountry: value
    });
    console.log(`selected ${value}`);
  };

  onBlur = () => {
    console.log("blur");
  };

  onFocus = () => {
    console.log("focus");
  };

  onSearch = val => {
    console.log("search:", val);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = [".com", ".org", ".net"].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  changeUser = () => {
    const index = UserList.indexOf(this.state.user);
    this.setState({
      user: index < UserList.length - 1 ? UserList[index + 1] : UserList[0],
      color: index < colorList.length - 1 ? colorList[index + 1] : colorList[0]
    });
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  yo = value => {
    this.setState({ value });
  };

  submitHandler = e => {
    e.preventDefault();
    this.createNewSchoolObj();
  };

  createNewSchoolObj = () => {
    console.log(this.state);
    const newObj = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      address: {
        streetAddress: this.state.streetAddress,
        addressCountry: this.state.addressCountry,
        addressLocality: this.state.addressLocality
      }
    };

    this.addNewSchool(newObj);
  };

  addNewSchool = async (obj) => {


    try {
      const schoolAdded = await this.props.addSchool(obj);
      // do something with response
    } catch (error) {
      // do something with error
    }


    // try {
    //   const createSchool = await axios.post(
    //     "https://xdemic-api.herokuapp.com/school",
    //     obj
    //   );
    //   message
    //     .loading("Action in progress..", createSchool, onclose)
    //     .then(afterClose => {
    //       message.success("school created successfully!");
    //     });
    // } catch (error) {
    //   message.error(error.message);
    // }
  };
  handleChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      );
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const {
      name,
      email,
      streetAddress,
      addressLocality,
      imageUrl
    } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    // const prefixSelector = getFieldDecorator('prefix', {
    //     initialValue: '86',
    // })(
    //     <Select style={{ width: 70 }}>
    //         <Option value="86">+86</Option>
    //         <Option value="87">+87</Option>
    //     </Select>,
    // );

    // const websiteOptions = autoCompleteResult.map(website => (
    //     <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    // ));

    const uploadButton = (
      <div>
        {/* <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div> */}
        <Button
          size="small"
          style={{ marginLeft: 36, verticalAlign: "middle" }}
        // onClick={this.handleChange}
        >
          upload
        </Button>
      </div>
    );

    return (
      <Form
        {...formItemLayout}
        onSubmit={this.handleSubmit}
        style={{ marginTop: 50 }}
      >
        <Row>
          <Col span={6} offset={15}>
            <div style={{ padding: 25 }}>
              <Avatar src={imageUrl} alt="Avatar"></Avatar>
              {/* <Button
                                size="small"
                                style={{ marginLeft: 16, verticalAlign: 'middle' }}
                                onClick={this.handleChange}
                            >
                                Change
                        </Button> */}
              <Upload
                name="avatar"
                // listType="picture-card"
                // className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {imageUrl ? uploadButton : uploadButton}
              </Upload>
            </div>
          </Col>
          <Col span={6} offset={4}>
            <Form.Item label="School Name">
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true,
                    message: "Please input your school name!"
                  }
                ]
              })(
                <Input
                  size="large"
                  allowClear
                  name="name"
                  value={name}
                  onChange={this.changeHandler}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={6} offset={2}>
            <Form.Item label="Street Address">
              {getFieldDecorator("streetAddress", {
                rules: [
                  {
                    required: true,
                    message: "Please input your street address!"
                  }
                ]
              })(
                <Input
                  size="large"
                  allowClear
                  name="streetAddress"
                  value={streetAddress}
                  onChange={this.changeHandler}
                />
              )}
            </Form.Item>
          </Col>

          <Col span={6} offset={4}>
            <Form.Item label="Email Address">
              {getFieldDecorator("email", {
                rules: [
                  {
                    required: true,
                    message: "Please input your E-mail!"
                  }
                ]
              })(
                <Input
                  size="large"
                  allowClear
                  name="email"
                  value={email}
                  onChange={this.changeHandler}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={6} offset={2}>
            <Form.Item label="City">
              {getFieldDecorator("addressLocality", {
                rules: [
                  {
                    required: true,
                    message: "Please input your city!"
                  }
                ]
              })(
                <Input
                  size="large"
                  allowClear
                  name="addressLocality"
                  value={addressLocality}
                  onChange={this.changeHandler}
                />
              )}
            </Form.Item>
          </Col>

          <Col span={6} offset={4}>
            <Form.Item label="Phone Number">
              {getFieldDecorator("phone", {
                rules: [
                  {
                    required: true,
                    message: "Please input your phone number!"
                  }
                ]
              })(
                <PhoneInput
                  id="PhoneInput"
                  country={"us"}
                  value={this.state.phone}
                  name="phone"
                  onChange={phone => this.setState({ phone })}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={6} offset={2}>
            {/* <Form.Item label="Country">
                    {getFieldDecorator('addressCountry', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your country!',
                            },
                        ],
                    })(<Input size="large" allowClear name="addressCountry" value={addressCountry} onChange={this.changeHandler} />)}
                </Form.Item> */}

            <Form.Item label="Country">
              <Select
                options={this.state.options}
                value={this.state.value}
                onChange={this.yo}
              />
            </Form.Item>
          </Col>
        </Row>

        <div style={{ textAlign: "center", marginTop: 50 }}>
          <Button type="default" size="large" onClick={this.submitHandler}>
            Add New School
          </Button>
        </div>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  const { currentSchool } = state.school.currentSchool;
  return {
    // testingState: state.global.error,
    currentSchool
  };
};

const mapActionToProps = dispatch => {
  return {
    addAdmin: data => {
      dispatch(addAdmin(data));
    },
    fetchSchool: data => {
      dispatch(fetchSchool(data));
    },
    addSchool: data => {
      dispatch(addNewSchool(data));
    }
  };
};

const WrappedStepTwo = Form.create()(StepTwo);

export default connect(mapStateToProps, mapActionToProps)(WrappedStepTwo);
