import { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Button } from 'react-bootstrap';
import { FaTicketAlt, FaPlus, FaClock, FaCheckCircle, FaQuestionCircle, FaChartLine, FaList } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashboardLayout from '../../layouts/DashboardLayout';
import { toast } from 'react-toastify';

const CustomerDashboard = () => {
  const [stats, setStats] = useState({
    totalTickets: 0,
    openTickets: 0,
    resolvedTickets: 0,
    avgResponseTime: '0h',
    averageResolutionTime: 0
  });

  const [recentTickets, setRecentTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('/api/dashboard/customer');
        setStats(response.data.stats);
        setRecentTickets(response.data.recentTickets);
      } catch (error) {
        toast.error('Failed to fetch dashboard data');
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
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

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <DashboardLayout>
      <div className="customer-dashboard">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>My Dashboard</h2>
          
        </div>
        
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
              title="Avg. Response Time"
              value={stats.averageResolutionTime}
              icon={<FaQuestionCircle className="text-info" />}
              color="info"
            />
          </Col>
        </Row>

        {/* Recent Tickets */}
        <Card className="mb-4">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Recent Tickets</h5>
            {/* <Link to="/customer/tickets" className="btn btn-sm btn-outline-primary">
              View All
            </Link> */}
            <Button
            variant="primary"
            onClick={() => navigate('/tickets')}
            className="d-flex align-items-center"
          >
            <FaList className="me-2" />
            View All Tickets
          </Button>
          </Card.Header>
          <Card.Body>
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Last Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentTickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>#{ticket.id}</td>
                    <td>{ticket.title}</td>
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
                    <td>{new Date(ticket.updatedAt).toLocaleDateString()}</td>
                    <td>
                      <Link
                        to={`/customer/tickets/${ticket.id}`}
                        className="btn btn-sm btn-outline-primary"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* Support Information */}
        <Row>
          <Col md={6}>
            <Card>
              <Card.Header>
                <h5 className="mb-0">Quick Support</h5>
              </Card.Header>
              <Card.Body>
                <p className="text-muted mb-3">
                  Need help? Here are some quick ways to get support:
                </p>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <FaQuestionCircle className="text-primary me-2" />
                    <Link to="/customer/faq">Browse FAQ</Link>
                  </li>
                  <li className="mb-2">
                    <FaTicketAlt className="text-primary me-2" />
                    <Link to="/customer/tickets/new">Create New Ticket</Link>
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Header>
                <h5 className="mb-0">Support Hours</h5>
              </Card.Header>
              <Card.Body>
                <p className="text-muted mb-3">
                  Our support team is available during the following hours:
                </p>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM
                  </li>
                  <li className="mb-2">
                    <strong>Saturday:</strong> 10:00 AM - 4:00 PM
                  </li>
                  <li>
                    <strong>Sunday:</strong> Closed
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard; 