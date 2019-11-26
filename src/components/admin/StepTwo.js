import React from 'react';
import axios from 'axios';
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
    DatePicker,
    Avatar,
    message
} from 'antd';


const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;


const UserList = ['U', 'Lucy', 'Tom', 'Edward'];
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

class StepTwo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            user: UserList[0],
            color: colorList[0],

            name: '',
            email: '',
            phone: '',
            streetAddress: '',
            addressCountry: '',
            addressLocality: ''
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    handleWebsiteChange = value => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    };

    changeUser = () => {
        const index = UserList.indexOf(this.state.user);
        this.setState({
            user: index < UserList.length - 1 ? UserList[index + 1] : UserList[0],
            color: index < colorList.length - 1 ? colorList[index + 1] : colorList[0],
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
        }

        console.log('OBJ ::: ', newObj);

        axios.post('https://xdemic-api.herokuapp.com/school', newObj)
            .then(res => {
                message.loading('Action in progress..', res, onclose)
                    .then(afterClose => {
                        message.success('school created!');
                    });

                this.setState({
                    name: '',
                    email: '',
                    phone: '',
                    streetAddress: '',
                    addressCountry: '',
                    addressLocality: ''
                });
            })
            .catch(err => {
                message.error(err.message);
            })

    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const { name, email, phone, streetAddress, addressCountry, addressLocality } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>,
        );

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));



        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginTop: 50 }}>
                <Row>

                    <Col span={6} offset={15}>
                        <div style={{ padding: 25 }}>
                            <Avatar style={{ backgroundColor: this.state.color, verticalAlign: 'middle' }} size="large">
                                {this.state.user}
                            </Avatar>
                            <Button
                                size="small"
                                style={{ marginLeft: 16, verticalAlign: 'middle' }}
                                onClick={this.changeUser}
                            >
                                Change
                        </Button>
                        </div>
                    </Col>
                    <Col span={6} offset={4}>
                        <Form.Item label="School Name">
                            {getFieldDecorator('name', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your school name!',
                                    },
                                ],
                            })(<Input size="large" allowClear name="name" value={name} onChange={this.changeHandler} />)}
                        </Form.Item>
                    </Col>
                    <Col span={6} offset={2}>
                        <Form.Item label="Street Address">
                            {getFieldDecorator('streetAddress', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your street address!',
                                    },
                                ],
                            })(<Input size="large" allowClear name="streetAddress" value={streetAddress} onChange={this.changeHandler} />)}
                        </Form.Item>
                    </Col>

                    <Col span={6} offset={4}>
                        <Form.Item label="Email Address">
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ],
                            })(<Input size="large" allowClear name="email" value={email} onChange={this.changeHandler} />)}
                        </Form.Item>
                    </Col>
                    <Col span={6} offset={2}>
                        <Form.Item label="City">
                            {getFieldDecorator('addressLocality', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your city!',
                                    },
                                ],
                            })(<Input size="large" allowClear name="addressLocality" value={addressLocality} onChange={this.changeHandler} />)}
                        </Form.Item>
                    </Col>

                    <Col span={6} offset={4}>
                        <Form.Item label="Phone Number">
                            {getFieldDecorator('phone', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your phone number!',
                                    },
                                ],
                            })(<Input size="large" allowClear name="phone" value={phone} onChange={this.changeHandler} />)}
                        </Form.Item>
                    </Col>
                    <Col span={6} offset={2}>
                        <Form.Item label="Country">
                            {getFieldDecorator('addressCountry', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your country!',
                                    },
                                ],
                            })(<Input size="large" allowClear name="addressCountry" value={addressCountry} onChange={this.changeHandler} />)}
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

const WrappedStepTwo = Form.create()(StepTwo);

export default WrappedStepTwo;