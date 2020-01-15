import React from "react";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  DatePicker
} from "antd";
import { connect } from "react-redux";
import { addAdmin } from "../../containers/Admin/actions";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

function onChange(date, dateString) {
  console.log(date, dateString);
}

const residences = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake"
          }
        ]
      }
    ]
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men"
          }
        ]
      }
    ]
  }
];

class StepOne extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  componentDidMount() {
    this.props.addAdmin({
      name: "rizwan zaheer",
      age: 36,
      type: "dev",
      gender: "M"
    });
  }
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
    const { userName } = this.props;
    console.log("userName is: ", userName);

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
              <Input size="large" value={userName} disabled />
            </Form.Item>
          </Col>
          <Col span={6} offset={2}>
            <Form.Item label="Email">
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "The input is not valid E-mail!"
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!"
                  }
                ]
              })(<Input size="large" />)}
            </Form.Item>
          </Col>
          <Col span={6} offset={4}>
            <Form.Item label="ID">
              {getFieldDecorator("text", {
                rules: [
                  {
                    type: "text",
                    message: "The input is not valid id!"
                  },
                  {
                    required: true,
                    message: "Please input your id!"
                  }
                ]
              })(<Input size="large" />)}
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={6} offset={4}>
            <Form.Item label="Department">
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "text",
                    message: "The input is not valid department!"
                  },
                  {
                    required: true,
                    message: "Please input your department!"
                  }
                ]
              })(<Input size="large" />)}
            </Form.Item>
          </Col>

          <Col span={6} offset={2}>
            <Form.Item label="Mobile Number">
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "text",
                    message: "The input is not valid phone number!"
                  },
                  {
                    required: true,
                    message: "Please input your phone number!"
                  }
                ]
              })(<Input size="large" />)}
            </Form.Item>
          </Col>

          <Col span={6} offset={4}>
            <Form.Item label="Date of birth">
              {getFieldDecorator("text", {
                rules: [
                  {
                    type: "date",
                    message: "The input is not valid birth date!"
                  },
                  {
                    required: true,
                    message: "Please input your birth date!"
                  }
                ]
              })(<DatePicker onChange={onChange} size="large" />)}
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={6} offset={4}>
            <Form.Item label="Gender">
              <Button size="default" type="primary">
                Male
              </Button>
              <Button size="default" type="default" style={{ marginLeft: 5 }}>
                Female
              </Button>
              <Button size="default" type="default" style={{ marginLeft: 5 }}>
                Other
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedStepOne = Form.create()(StepOne);

const mapStateToProps = state => {
  return {
    // testingState: state.global.error,
    userName: state.admin.userData.name || [{ name: "Hamza" }]
  };
};

const mapActionToProps = dispatch => {
  return {
    addAdmin: data => {
      dispatch(addAdmin(data));
    }
  };
};

export default connect(mapStateToProps, mapActionToProps)(WrappedStepOne);
