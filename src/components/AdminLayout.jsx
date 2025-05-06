import React from 'react';
import { Layout } from 'antd';
import AdminSidebar from './AdminSidebar';

const { Content } = Layout;

const AdminLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AdminSidebar />
      <Layout style={{ marginLeft: 100 }}>
        <Content style={{  
        
          background: '#fff',
          minHeight: 280,
        }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout; 