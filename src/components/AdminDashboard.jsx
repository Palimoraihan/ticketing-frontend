import React, { useState, useEffect } from "react";
import { Card, Row, Col, Table, Tag, Statistic } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  TagsOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import axios from "axios";
import AdminLayout from "./AdminLayout";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      tickets: {
        total: 0,
        open: 0,
        resolved: 0,
        closed: 0,
      },
      users: {
        total: 0,
        agents: 0,
        customers: 0,
      },
      groups: {
        total: 0,
      },
    },
    recentTickets: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get("/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDashboardData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "blue";
      case "resolved":
        return "green";
      case "closed":
        return "red";
      default:
        return "default";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "green";
      default:
        return "default";
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => <a href={`/tickets/${record.id}`}>{text}</a>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => (
        <Tag color={getPriorityColor(priority)}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </Tag>
      ),
    },
    {
      title: "Customer",
      dataIndex: ["customer", "username"],
      key: "customer",
    },
    {
      title: "Agent",
      dataIndex: ["agent", "username"],
      key: "agent",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags) => (
        <>
          {tags.map((tag) => (
            <Tag key={tag.id} color="blue">
              {tag.name}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleString(),
    },
  ];

  return (
    <>
      <div className="row">
        <div className="col-1"></div>

        <div className="col">
          <h1 className="mb-5">Admin Dashboard</h1>

          {/* Statistics Cards */}
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Total Tickets"
                  value={dashboardData.stats.tickets.total}
                  prefix={<FileTextOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Open Tickets"
                  value={dashboardData.stats.tickets.open}
                  prefix={<ClockCircleOutlined />}
                  valueStyle={{ color: "#1890ff" }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Resolved Tickets"
                  value={dashboardData.stats.tickets.resolved}
                  prefix={<CheckCircleOutlined />}
                  valueStyle={{ color: "#52c41a" }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Closed Tickets"
                  value={dashboardData.stats.tickets.closed}
                  prefix={<CloseCircleOutlined />}
                  valueStyle={{ color: "#f5222d" }}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Total Users"
                  value={dashboardData.stats.users.total}
                  prefix={<UserOutlined />}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Agents"
                  value={dashboardData.stats.users.agents}
                  prefix={<TeamOutlined />}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Groups"
                  value={dashboardData.stats.groups.total}
                  prefix={<TagsOutlined />}
                />
              </Card>
            </Col>
          </Row>

          {/* Recent Tickets Table */}
          <Card title="Recent Tickets" style={{ marginBottom: 24 }}>
            <Table
              columns={columns}
              dataSource={dashboardData.recentTickets}
              rowKey="id"
              loading={loading}
              pagination={false}
              scroll={{ x: 200 }}
            />
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
