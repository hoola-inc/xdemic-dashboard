import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Modal, Button, Input, Form, DatePicker, Select } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Option } = Select;


function onChangeDate(dates, dateStrings) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
}



function onBlur() {
    console.log('blur');
}

function onFocus() {
    console.log('focus');
}

function onSearch(val) {
    console.log('search:', val);
}

class CreateNewCourseModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            loading: false,
            iconLoading: false,
            name: '',
            creditUnitType: '',
            creditUniteValue: '',
            ctid: '',
            subjectWebpage: '',
            prerequisite: '',
            uri: '',
            courseCode: ''
        };

        this.onChange = this.onChange.bind(this);
    }
    

    onChange(value) {
        console.log(`selected ${value}`);

        this.setState({
            creditUnitType: value
        })
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
        this.setState({ [e.target.name]: e.target.value });
    }

    submitHandler = e => {
        e.preventDefault();
        this.enterLoading();
        this.sendCourse();
    }

    sendCourse = () => {
        axios.post('https://xdemic-api.herokuapp.com/course', this.state)
            .then(res => {
                if (res.data.status) {
                    this.setState({ loading: false });
                    this.handleCancel();
                    Swal.fire('Course', 'created and live on url', 'success');
                }
                else {
                    this.setState({ loading: false });
                    this.handleCancel();
                    Swal.fire('Oho...', 'An Error Occured', 'error');
                }
            })
            .catch(err => {
                this.setState({ loading: false });
                this.handleCancel();
                Swal.fire('Error', 'An error occured', 'error');
            });
    }

    render() {
        const { name, creditUniteValue, ctid, subjectWebpage, prerequisite, uri, courseCode } = this.state;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Button block size="small" onClick={this.showModal}>
                    +
        </Button>
                <Modal
                    title="Enter Course Detail"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form onSubmit={this.submitHandler}>
                        <Form.Item label="Course Name">
                            {
                                getFieldDecorator('foo', {
                                    rules: [{
                                        required: true,
                                        message: 'this field is required'
                                    }]
                                })
                                    (
                                        <Input
                                            placeholder="enter course name"
                                            allowClear
                                            require
                                            name="name"
                                            value={name}
                                            onChange={this.changeHandler}
                                        />
                                    )
                            }
                        </Form.Item>

                        <Form.Item label="Course Code">
                            <Input
                                placeholder="enter Course Code"
                                allowClear
                                name="courseCode"
                                value={courseCode}
                                onChange={this.changeHandler} />
                        </Form.Item>

                        <Form.Item label="Course Credit Unit Type">
                            {/* <Input
                                placeholder="enter credit unit type"
                                allowClear
                                name="creditUnitType"
                                value={creditUnitType}
                                onChange={this.changeHandler} /> */}

                            <Select
                                showSearch
                                style={{ width: 470 }}
                                placeholder="Select credit unit type"
                                optionFilterProp="children"
                                onChange={this.onChange}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                                <Option value="4">4</Option>
                                <Option value="5">5</Option>
                                <Option value="6">6</Option>
                                <Option value="7">7</Option>
                                <Option value="8">8</Option>
                                <Option value="9">9</Option>
                                <Option value="10">10</Option>
                                <Option value="11">11</Option>
                                <Option value="12">12</Option>
                            </Select>


                        </Form.Item>

                        <Form.Item label="Course Credit Unite Value">
                            <Input
                                placeholder="enter credit unite value"
                                allowClear
                                name="creditUniteValue"
                                value={creditUniteValue}
                                onChange={this.changeHandler}
                            />
                        </Form.Item>

                        <Form.Item label="Course Ctid" style={{display: 'none'}}>
                            <Input
                                placeholder="enter course ctid"
                                allowClear
                                name="ctid"
                                value={ctid}
                                onChange={this.changeHandler}
                            />
                        </Form.Item>

                        <Form.Item label="Course Subject Web Page">
                            <Input
                                placeholder="enter course subject web page"
                                allowClear
                                name="subjectWebpage"
                                value={subjectWebpage}
                                onChange={this.changeHandler} />
                        </Form.Item>

                        <Form.Item label="Course Pre Requisite">
                            <Input
                                placeholder="enter pre requisite"
                                allowClear
                                name="prerequisite"
                                value={prerequisite}
                                onChange={this.changeHandler} />
                        </Form.Item>

                        <Form.Item label="Course Uri" style={{display: 'none'}}>
                            <Input
                                placeholder="enter course uri"
                                allowClear
                                name="uri"
                                value={uri}
                                onChange={this.changeHandler} />
                        </Form.Item>



                        <Form.Item label="Select Date">
                            <RangePicker
                                ranges={{
                                    Today: [moment(), moment()],
                                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                                }}
                                onChange={onChangeDate}
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

const CreateCourseModal = Form.create()(CreateNewCourseModal);

export default CreateCourseModal;