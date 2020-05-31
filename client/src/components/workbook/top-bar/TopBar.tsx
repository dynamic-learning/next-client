import React, { useState } from 'react'
import { Menu } from 'antd';
import { LeftOutlined, LoginOutlined, EditOutlined, FileOutlined, RedditOutlined, BorderOuterOutlined } from '@ant-design/icons';


const { SubMenu } = Menu;

const TopBar = () => {
    
    const [current, setCurrent] = useState([])

    const handleClick = (e:any) => {
        console.log('click ', e);
        setCurrent(e.key)
    };

    return (
    <>
        <style>{style}</style>
        <div className='topbar-container'>
            <Menu onClick={handleClick} selectedKeys={ current } mode="horizontal" theme='dark'>
                <SubMenu title="File" key='file' icon={<FileOutlined />}>
                    <Menu.ItemGroup>
                        <Menu.Item key="file:setting:1">New</Menu.Item>
                        <Menu.Item key="file:setting:2">Save</Menu.Item>
                        <Menu.Item key="file:setting:3">Examples</Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
                <SubMenu title="Edit" key="edit" icon={<EditOutlined />}>
                    <Menu.ItemGroup>
                        <Menu.Item key="edit:setting:1">Tidy Code</Menu.Item>
                        <Menu.Item key="edit:setting:2">Find</Menu.Item>
                        <Menu.Item key="edit:setting:3">Find Next</Menu.Item>
                        <Menu.Item key="edit:setting:4">Find Previous</Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
                <SubMenu title="Sketch" key="sketch" icon={<BorderOuterOutlined />}>
                    <Menu.ItemGroup>
                        <Menu.Item key="sketch:setting:1">Add File</Menu.Item>
                        <Menu.Item key="sketch:setting:2">Add Folder</Menu.Item>
                        <Menu.Item key="sketch:setting:3">Run</Menu.Item>
                        <Menu.Item key="sketch:setting:4">Stop</Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
                <SubMenu title="Help" key="help" icon={<RedditOutlined />}>
                    <Menu.ItemGroup>
                        <Menu.Item key="help:setting:1">Keyboard Shortcuts</Menu.Item>
                        <Menu.Item key="help:setting:2">Reference</Menu.Item>
                        <Menu.Item key="help:setting:3">About</Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
                <div className='navitems-right'>
                    <Menu mode='horizontal' theme='dark'>
                        <Menu.Item key="login" icon={<LoginOutlined />}>
                            Login
                        </Menu.Item>
                        <Menu.Item key="signup" icon={<LeftOutlined />}>
                            Sign Up
                        </Menu.Item>
                    </Menu>
                </div>
            </Menu>
        </div>
    </>
)}

const style=`
    .topbar-container {
    }
    .navitems-right {
        float: right;
        margin-right: 10px;
    }
`

export default TopBar