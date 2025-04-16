import React, { useState, useEffect } from 'react';
import { Table, Badge, Button } from 'react-bootstrap';
import { FaEye, FaFileAlt, FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import ticketService from '../services/ticketService';
import { toast } from 'react-toastify';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const data = await ticketService.getTickets();
      setTickets(data);
    } catch (error) {
      toast.error('Failed to fetch tickets');
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityBadge = (priority) => {
    const variants = {
      low: 'info',
      medium: 'warning',
      high: 'danger',
      critical: 'dark'
    };
    return <Badge bg={variants[priority]}>{priority}</Badge>;
  };

  const getStatusBadge = (status) => {
    const variants = {
      open: 'primary',
      in_progress: 'warning',
      resolved: 'success',
      closed: 'secondary'
    };
    return <Badge bg={variants[status]}>{status.replace('_', ' ')}</Badge>;
  };

  if (loading) {
    return <div>Loading tickets...</div>;
  }

  return (
    <div className="ticket-list">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button
          variant="outline-primary"
          onClick={() => navigate('/dashboard')}
          className="d-flex align-items-center"
        >
          <FaArrowLeft className="me-2" />
          Back to Dashboard
        </Button>
        <h2>My Tickets</h2>
      </div>

      <Table striped hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Created</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.title}</td>
              <td>{getPriorityBadge(ticket.priority)}</td>
              <td>{getStatusBadge(ticket.status)}</td>
              <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
              <td>{new Date(ticket.responseDueDate).toLocaleDateString()}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  className="me-2"
                  onClick={() => navigate(`/tickets/${ticket.id}`)}
                >
                  <FaEye /> View
                </Button>
                {ticket.attachments && ticket.attachments.length > 0 && (
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => navigate(`/tickets/${ticket.id}/attachments`)}
                  >
                    <FaFileAlt /> Files
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TicketList; 