import React from 'react';
import { Layout, Menu } from 'antd';
import { 
  DashboardOutlined, 
  TeamOutlined, 
  UserOutlined 
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/admin/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/admin/groups',
      icon: <TeamOutlined />,
      label: 'Groups',
    },
    {
      key: '/admin/users',
      icon: <UserOutlined />,
      label: 'Users',
    },
  ];

  return (
    <Sider
      width={200}
      style={{
        background: '#fff',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        boxShadow: '2px 0 8px 0 rgba(29,35,41,.05)',
      }}
    >
      <div style={{ 
        height: '64px', 
        padding: '16px', 
        display: 'flex', 
        alignItems: 'center',
        borderBottom: '1px solid #f0f0f0'
      }}>
        <h2 style={{ margin: 0, color: '#1890ff' }}>Admin Panel</h2>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{ height: '100%', borderRight: 0 }}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  );
};

export default AdminSidebar; 