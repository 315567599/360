import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../style/App.css'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class PageLink extends React.Component {
    constructor(props) {
       super(props);
    }

    handleClick = (e) => {
        e.preventDefault();
        this.props.handleClick(e);
    }

    render () {
        return (
            <a data-page={this.props.url} data-title={this.props.title} onClick={this.handleClick}>{this.props.title}</a>
        );
    }
}

class Index extends React.Component {
    state = {
        collapsed: false,
        currentPage: "App.html"
    };
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }
    onPageClick = (e) => {
        let page = e.target.getAttribute("data-page");
        let title = e.target.getAttribute("data-title");
        this.setState({
            currentPage: page,
            title: title
        });
    }
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <SubMenu
                            key="sub1"
                            title={<span><Icon type="shop" /><span>商品管理</span></span>}
                        >
                            <Menu.Item key="3"><PageLink url="./products.html" title="商品列表" handleClick={this.onPageClick} /></Menu.Item>
                            <Menu.Item key="4"><PageLink url="http://zisha360.com/" title="紫砂网" handleClick={this.onPageClick} /></Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={<span><Icon type="team" /><span>Team</span></span>}
                        >
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9">
                            <Icon type="file" />
                            <span>File</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        <iframe
                            id="content"
                            style={{width:'100%',height:'1000px', scrolling:"auto", borderWidth:'0'}}
                            src={this.state.currentPage}
                        > </iframe>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        紫砂网 ©2017 Created by Jiang Chao
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById("root"));