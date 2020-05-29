import React, { useState } from 'react'
import { Menu } from 'antd';
import { LeftOutlined, LoginOutlined, PicCenterOutlined, FileAddOutlined, SaveOutlined } from '@ant-design/icons';


const { SubMenu } = Menu;

const TopBar = () => {
    
    const [current, setCurrent] = useState(null)

    const handleClick = (e:any) => {
        console.log('click ', e);
        setCurrent(e.key)
    };

    return (
    <>
        <style>{style}</style>
        <div className='topbar-container'>
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                <SubMenu icon={<FileAddOutlined />} title="Add Simulation">
                    <Menu.ItemGroup >
                        <Menu.Item key="setting:1">Add Simulation</Menu.Item>
                        <Menu.Item key="setting:2">Options</Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
                <Menu.Item key="mail" icon={<SaveOutlined />}>
                    Save
                </Menu.Item>
                <Menu.Item key="mail" icon={<PicCenterOutlined />}>
                    Canvas Size
                </Menu.Item>
                <Menu.Item key="mail" icon={<LoginOutlined />}>
                    Login
                </Menu.Item>
                <Menu.Item key="mail" icon={<LeftOutlined />}>
                    Back
                </Menu.Item>
            </Menu>
        </div>
    </>
)}

const style=`
    .topbar-container {
    }
`

export default TopBar