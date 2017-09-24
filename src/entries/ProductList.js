import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../style/App.css';
import { Form, Row, Col, Input, Button, Icon,Select, DatePicker, Slider,Table } from 'antd';
const FormItem = Form.Item;
import '../style/App.css';
import reqwest from 'reqwest';

class SearchBar extends React.Component {
   constructor(props) {
      super(props);
   }
   handleSearch = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) =>{
         console.log('Received values of form:', values);
      });
   }
   handleReset = (e) => {
       this.props.form.resetFields();
   }
   render() {
      const formItemLayout = {
         labelCol: {span:5},
          wrapperCol:{span:19}
      };
      const {getFieldDecorator} = this.props.form;
      return (
          <Form  onSubmit={this.handleSearch}>
              <Row gutter={40}>
                <Col span={8} key="name">
                    <FormItem {...formItemLayout} label='名称'>
                        {getFieldDecorator('name')(
                            <Input placeholder="名称" />
                        )}
                    </FormItem>
                </Col>

                  <Col span={8} key="author">
                      <FormItem {...formItemLayout} label='作者'>
                          {getFieldDecorator('author')(
                              <Select>
                                  <Option value="1">Option 1</Option>
                                  <Option value="2">Option 2</Option>
                                  <Option value="3">Option 3</Option>
                              </Select>
                          )}
                      </FormItem>
                  </Col>

                  <Col span={8} key="niliao">
                      <FormItem {...formItemLayout} label='泥料'>
                          {getFieldDecorator('niliao')(
                              <Select>
                                  <Option value="1">Option 1</Option>
                                  <Option value="2">Option 2</Option>
                                  <Option value="3">Option 3</Option>
                              </Select>
                          )}
                      </FormItem>
                  </Col>

                  <Col span={8} key="volume">
                      <FormItem {...formItemLayout} label='容量'>
                          {getFieldDecorator('volume')(
                              <Slider range min={0} max={1000} step={20} />
                          )}
                      </FormItem>
                  </Col>

                  <Col span={8} key="date">
                      <FormItem {...formItemLayout} label='上架时间'>
                          <Col span={11}>
                              <FormItem >
                                  {getFieldDecorator('start-time')(
                                    <DatePicker />
                                  )}
                              </FormItem>
                          </Col>
                          <Col span={2}>
                            <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                              -
                            </span>
                          </Col>
                          <Col span={11}>
                              <FormItem>
                                  {getFieldDecorator('end-time')(
                                    <DatePicker />
                                  )}
                              </FormItem>
                          </Col>
                      </FormItem>
                  </Col>
              </Row>
              <Row>
                  <Col span={24} style={{textAlign:'right'}}>
                      <Button type="primary"  htmlType="submit">Search</Button>
                      <Button style={{marginLeft:8}} onClick={this.handleReset}>Clear</Button>
                  </Col>
              </Row>
          </Form>
      );
   }
}
const WrappedSearchForm = Form.create()(SearchBar);

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: name => `${name.first} ${name.last}`,
    width: '20%',
}, {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
    ],
    width: '20%',
}, {
    title: 'Email',
    dataIndex: 'email',
}];

class SearchResult extends React.Component {
    constructor(props) {
       super(props);
    }

    state = {
        data: [],
        pagination: {},
        loading: false,
    };
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    }
    fetch = (params = {}) => {
        console.log('params:', params);
        this.setState({ loading: true });
        reqwest({
            url: 'https://randomuser.me/api',
            method: 'get',
            data: {
                results: 10,
                ...params,
            },
            type: 'json',
        }).then((data) => {
            const pagination = { ...this.state.pagination };
            // Read total count from server
            // pagination.total = data.totalCount;
            pagination.total = 200;
            this.setState({
                loading: false,
                data: data.results,
                pagination,
            });
        });
    }
    componentDidMount() {
        this.fetch();
    }
    render() {
        return (
            <Table columns={columns}
                   rowKey={record => record.registered}
                   dataSource={this.state.data}
                   pagination={this.state.pagination}
                   loading={this.state.loading}
                   onChange={this.handleTableChange}
            />
        );
    }
}

class Search extends React.Component {
    constructor(props) {
       super(props);
    }
    render() {
        return (
            <div>
                <WrappedSearchForm/>
                <SearchResult/>
            </div>
        );
    }
}
ReactDOM.render(<Search/>, document.getElementById("root"));