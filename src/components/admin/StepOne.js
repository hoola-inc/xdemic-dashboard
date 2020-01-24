import React from "react";
import { Form, Input, Radio, Select, Row, Col, AutoComplete } from "antd";
import { connect } from "react-redux";
import { addAdmin } from "../../containers/Admin/actions";
import { fetchSchool } from "../../containers/School/actions";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class StepOne extends React.Component {
  // constructor(props){
  //   super(props);
  // }
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    gender: this.props.gender
  };

  componentDidMount() {
    // this.props.addAdmin({
    //   fullName: "rizwan zaheer",
    //   age: 36,
    //   birthDate: "30-sep-1992",
    //   mobile: "03135561765",
    //   email: "rizwan@hoola.tech",
    //   did: "this is did",
    //   type: "dev",
    //   gender: "Male",
    //   department: "Software Engineer"
    // });
  }
  onGenderChange = e => {
    console.log("radio checked", e.target.value);
    this.setState({
      gender: e.target.value
    });
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

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    const {
      fullName,
      age,
      birthDate,
      mobile,
      email,
      did,
      type,
      gender,
      department
    } = this.props;
    console.log("fullName is: ", fullName);

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
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "86"
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form
        {...formItemLayout}
        onSubmit={this.handleSubmit}
        style={{ marginTop: 50 }}
      >
        <Row>
          <Col span={6} offset={4}>
            <Form.Item label="Full Name">
              <Input size="large" value={fullName} disabled />
            </Form.Item>
          </Col>
          <Col span={6} offset={2}>
            <Form.Item label="Email">
              <Input size="large" value={email} disabled />
            </Form.Item>
          </Col>
          <Col span={6} offset={4}>
            <Form.Item label="ID">
              <Input size="large" value={did} disabled />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={6} offset={4}>
            <Form.Item label="Department">
              <Input size="large" value={department} disabled />
            </Form.Item>
          </Col>

          <Col span={6} offset={2}>
            <Form.Item label="Mobile Number">
              <Input size="large" value={mobile} disabled />
            </Form.Item>
          </Col>

          <Col span={6} offset={4}>
            <Form.Item label="Date of birth">
              <Input size="large" value={birthDate} disabled />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={6} offset={4}>
            <Form.Item label="Gender">
              <Radio.Group
                onChange={this.onGenderChange}
                value={gender}
                disabled
              >
                <Radio value={"Male"}>Male</Radio>
                <Radio value={"Female"}>Female</Radio>
                <Radio value={"Others"}>Others</Radio>
              </Radio.Group>
              {/* <Button size="default" type="primary">
                Male
              </Button>
              <Button size="default" type="default" style={{ marginLeft: 5 }}>
                Female
              </Button>
              <Button size="default" type="default" style={{ marginLeft: 5 }}>
                Other
              </Button> */}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedStepOne = Form.create()(StepOne);

const mapStateToProps = state => {
  const {
    fullName,
    age,
    birthDate,
    mobile,
    email,
    did,
    type,
    gender,
    department
  } = state.admin.userData;
  const localUserData = JSON.parse(localStorage.getItem("userData"));
  return {
    // testingState: state.global.error,
    fullName: fullName || localUserData.fullName,
    age: age || localUserData.age,
    birthDate: birthDate || localUserData.birthDate,
    mobile: mobile || localUserData.mobile,
    email: email || localUserData.email,
    did: did || localUserData.did,
    type: type || localUserData.type,
    gender: gender || localUserData.gender,
    department: department || localUserData.department
  };
};

const mapActionToProps = dispatch => {
  return {
    addAdmin: data => {
      dispatch(addAdmin(data));
    },
    fetchSchool: data => {
      dispatch(fetchSchool(data));
    }
  };
};

export default connect(mapStateToProps, mapActionToProps)(WrappedStepOne);
