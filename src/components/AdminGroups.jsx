import React from 'react';
import { Table, Button, Space, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AdminLayout from './AdminLayout';

const AdminGroups = () => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags) => (
        <>
          {tags.map(tag => (
            <Tag key={tag.id} color="blue">{tag.name}</Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Agents',
      dataIndex: 'agents',
      key: 'agents',
      render: (agents) => (
        <>
          {agents.map(agent => (
            <Tag key={agent.id}>{agent.name}</Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary">Edit</Button>
          <Button danger>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />}>
          Add Group
        </Button>
      </div>
      <Table columns={columns} dataSource={[]} />
    </AdminLayout>
  );
};

export default AdminGroups; 