import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, ProgressBar, Button } from 'react-bootstrap';
import { FaTicketAlt, FaClock, FaCheckCircle, FaChartLine, FaList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashboardLayout from '../../layouts/DashboardLayout';
import { toast } from 'react-toastify';

const AgentDashboard = () => {
  const [stats, setStats] = useState({
    assignedTickets: 0,
    pendingTickets: 0,
    resolvedTickets: 0,
    avgResolutionTime: '0h'
  });

  const [recentTickets, setRecentTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/api/dashboard/agent');
      setStats(response.data.stats);
      setRecentTickets(response.data.recentTickets);
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color, subtitle }) => (
    <Card className="stat-card">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="text-muted mb-2">{title}</h6>
            <h3 className="mb-0">{value}</h3>
            {subtitle && <small className="text-muted">{subtitle}</small>}
          </div>
          <div className={`icon-circle bg-${color}-light`}>
            {icon}
          </div>
        </div>
      </Card.Body>
    </Card>
  );

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <DashboardLayout>
      <div className="agent-dashboard">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Agent Dashboard</h2>
          <Button
            variant="primary"
            onClick={() => navigate('/tickets')}
            className="d-flex align-items-center"
          >
            <FaList className="me-2" />
            View All Tickets
          </Button>
        </div>
        
        {/* Statistics Cards */}
        <Row className="mb-4">
          <Col md={6} lg={3}>
            <StatCard
              title="Assigned Tickets"
              value={stats.assignedTickets}
              icon={<FaTicketAlt className="text-primary" />}
              color="primary"
            />
          </Col>
          <Col md={6} lg={3}>
            <StatCard
              title="Pending Tickets"
              value={stats.pendingTickets}
              icon={<FaClock className="text-warning" />}
              color="warning"
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
          <Col md={6} lg={3}>
            <StatCard
              title="Avg. Resolution Time"
              value={stats.avgResolutionTime}
              icon={<FaChartLine className="text-info" />}
              color="info"
            />
          </Col>
        </Row>

        {/* Assigned Tickets */}
        <Card className="mb-4">
          <Card.Header>
            <h5 className="mb-0">Your Assigned Tickets</h5>
          </Card.Header>
          <Card.Body>
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Subject</th>
                  <th>Customer</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {recentTickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>#{ticket.id}</td>
                    <td>{ticket.subject}</td>
                    <td>{ticket.customerName}</td>
                    <td>
                      <span className={`badge bg-${ticket.priority === 'high' ? 'danger' : ticket.priority === 'medium' ? 'warning' : 'info'}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td>
                      <span className={`badge bg-${ticket.status === 'open' ? 'warning' : 'success'}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td>{new Date(ticket.dueDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <Card.Header>
            <h5 className="mb-0">Performance Metrics</h5>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Ticket Resolution Rate</span>
                    <span>85%</span>
                  </div>
                  <ProgressBar now={85} variant="success" />
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Customer Satisfaction</span>
                    <span>92%</span>
                  </div>
                  <ProgressBar now={92} variant="primary" />
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AgentDashboard; 