import { useState } from 'react';
import { Layout, Menu, Row, Col, Drawer } from 'antd';
import { MenuOutlined, ScheduleOutlined, UserOutlined } from '@ant-design/icons';
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import Authentication from "../../stores/auth.store";
import { useContext } from 'react';
import { observer } from "mobx-react";


const Bar = () => {
  let navigate = useNavigate();
  const auth = useContext(Authentication);
  const { logout } = auth;
  const { Sider } = Layout;
  const { SubMenu } = Menu;
  const [visible, setVisible] = useState<boolean>(false);

  const showMenu = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const userLogout = () => {
    logout();
    navigate("/login");
  };


  return (
    <div className='bar'>
      <Row className='box-bar-mobile'>
        <Col span={12} className='logo'>TODO</Col>
        <Col span={12} className='icon-col'><MenuOutlined className='icon-menu' type='button' onClick={showMenu} /></Col>
      </Row>

      <Drawer
        placement='top'
        closable={false}
        onClose={onClose}
        visible={visible}
        key='top'
      >
        <div><ScheduleOutlined className='mr-1' />Activity</div>
        <div className='ml-2'><Link to="/">All</Link></div>
        <div className='ml-2'>Biology</div>
        <div className='ml-2'>Finance</div>
        <div className='ml-2'>Chemistry</div>
        <div className='ml-2'>Engineering</div>
        <div className='ml-2'>Health</div>
        <div className='ml-2'>Society</div>
        <div className='ml-2'>Art</div>
        <div><UserOutlined className='mr-1' />User</div>
        <div className='ml-2'>Account</div>
        <div className='ml-2'><div onClick={userLogout}>Logout</div></div>
      </Drawer>

      <Sider className='box-slider'>
        <div className='logo center mt-1 mb-1'>TODO</div>
        <Menu mode="inline" defaultSelectedKeys={['activity']}>
          <SubMenu key="activity" icon={<ScheduleOutlined />} title="Activity">
            <Menu.Item key="/all"><Link to="/">All</Link></Menu.Item>
            <Menu.Item key="/biology">Biology</Menu.Item>
            <Menu.Item key="/finance">Finance</Menu.Item>
            <Menu.Item key="/chemistry">Chemistry</Menu.Item>
            <Menu.Item key="/engineering">Engineering</Menu.Item>
            <Menu.Item key="/health">Health</Menu.Item>
            <Menu.Item key="/society">Society</Menu.Item>
            <Menu.Item key="/space">Space</Menu.Item>
            <Menu.Item key="/art">Art</Menu.Item>
          </SubMenu>
          <SubMenu key="user" icon={<UserOutlined />} title="User">
            <Menu.Item key="/account">Account</Menu.Item>
            <Menu.Item key="/logout" ><div onClick={userLogout}>Logout</div></Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    </div>
  );
}

export default observer(Bar);