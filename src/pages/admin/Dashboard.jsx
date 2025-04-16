import { useState, useEffect } from 'react';
import { Card, Row, Col, Table } from 'react-bootstrap';
import { FaTicketAlt, FaUsers, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import axios from 'axios';
import DashboardLayout from '../../layouts/DashboardLayout';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalTickets: 0,
    openTickets: 0,
    totalUsers: 0,
    resolvedTickets: 0
  });

  const [recentTickets, setRecentTickets] = useState([]);

  useEffect(() => {
    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('/api/admin/dashboard');
        setStats(response.data.stats);
        setRecentTickets(response.data.recentTickets);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const StatCard = ({ title, value, icon, color }) => (
    <Card className="stat-card">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="text-muted mb-2">{title}</h6>
            <h3 className="mb-0">{value}</h3>
          </div>
          <div className={`icon-circle bg-${color}-light`}>
            {icon}
          </div>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <DashboardLayout>
      <div className="admin-dashboard">
        <h2 className="mb-4">Dashboard Overview</h2>
        
        {/* Statistics Cards */}
        <Row className="mb-4">
          <Col md={6} lg={3}>
            <StatCard
              title="Total Tickets"
              value={stats.totalTickets}
              icon={<FaTicketAlt className="text-primary" />}
              color="primary"
            />
          </Col>
          <Col md={6} lg={3}>
            <StatCard
              title="Open Tickets"
              value={stats.openTickets}
              icon={<FaExclamationTriangle className="text-warning" />}
              color="warning"
            />
          </Col>
          <Col md={6} lg={3}>
            <StatCard
              title="Total Users"
              value={stats.totalUsers}
              icon={<FaUsers className="text-info" />}
              color="info"
            />
          </Col>
          <Col md={6} lg={3}>
            <StatCard
              title="Resolved Tickets"
              value={stats.resolvedTickets}
              icon={<FaCheckCircle className="text-success" />}
              color="success"
            />
          </Col>
        </Row>

        {/* Recent Tickets */}
        <Card>
          <Card.Header>
            <h5 className="mb-0">Recent Tickets</h5>
          </Card.Header>
          <Card.Body>
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {recentTickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>#{ticket.id}</td>
                    <td>{ticket.subject}</td>
                    <td>
                      <span className={`badge bg-${ticket.status === 'open' ? 'warning' : 'success'}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td>
                      <span className={`badge bg-${ticket.priority === 'high' ? 'danger' : ticket.priority === 'medium' ? 'warning' : 'info'}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard; 