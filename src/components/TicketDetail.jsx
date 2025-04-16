import React, { useState, useEffect } from 'react';
import { Card, Badge, Button, Form, Row, Col } from 'react-bootstrap';
import { FaPaperclip, FaDownload, FaReply, FaArrowLeft } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import ticketService from '../services/ticketService';
import { toast } from 'react-toastify';

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState('');
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    try {
      const data = await ticketService.getTicket(id);
      setTicket(data);
    } catch (error) {
      toast.error('Failed to fetch ticket details');
      console.error('Error fetching ticket:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmitResponse = async (e) => {
    e.preventDefault();
    try {
      await ticketService.addResponse(id, {
        content: response,
        attachments: files
      });
      toast.success('Response added successfully');
      setResponse('');
      setFiles([]);
      fetchTicket(); // Refresh ticket data
    } catch (error) {
      toast.error('Failed to add response');
      console.error('Error adding response:', error);
    }
  };

  const handleDownload = async (fileId, filename) => {
    try {
      const blob = await ticketService.downloadFile(fileId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      toast.error('Failed to download file');
      console.error('Error downloading file:', error);
    }
  };

  if (loading) {
    return <div>Loading ticket details...</div>;
  }

  if (!ticket) {
    return <div>Ticket not found</div>;
  }

  return (
    <div className="ticket-detail">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button
          variant="outline-primary"
          onClick={() => navigate('/dashboard')}
          className="d-flex align-items-center"
        >
          <FaArrowLeft className="me-2" />
          Back to Dashboard
        </Button>
        <h2>Ticket #{ticket.id}</h2>
      </div>

      <Card className="mb-4">
        <Card.Header>
          <h3>{ticket.title}</h3>
          <div className="d-flex gap-2">
            <Badge bg="primary">{ticket.priority}</Badge>
            <Badge bg="secondary">{ticket.status}</Badge>
          </div>
        </Card.Header>
        <Card.Body>
          <p>{ticket.description}</p>
          
          <div className="mb-4">
            <h5>Attachments</h5>
            {ticket.attachments && ticket.attachments.length > 0 ? (
              <div className="d-flex flex-wrap gap-2">
                {ticket.attachments.map(file => (
                  <Button
                    key={file.id}
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleDownload(file.id, file.originalname)}
                  >
                    <FaDownload className="me-2" />
                    {file.originalname}
                  </Button>
                ))}
              </div>
            ) : (
              <p>No attachments</p>
            )}
          </div>

          <div className="mb-4">
            <h5>Responses</h5>
            {ticket.responses && ticket.responses.length > 0 ? (
              ticket.responses.map(response => (
                <Card key={response.id} className="mb-3">
                  <Card.Header>
                    <strong>{response.user.name}</strong>
                    <small className="text-muted ms-2">
                      {new Date(response.createdAt).toLocaleString()}
                    </small>
                  </Card.Header>
                  <Card.Body>
                    <p>{response.content}</p>
                    {response.attachments && response.attachments.length > 0 && (
                      <div className="d-flex flex-wrap gap-2 mt-2">
                        {response.attachments.map(file => (
                          <Button
                            key={file.id}
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleDownload(file.id, file.originalname)}
                          >
                            <FaDownload className="me-2" />
                            {file.originalname}
                          </Button>
                        ))}
                      </div>
                    )}
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>No responses yet</p>
            )}
          </div>

          <Form onSubmit={handleSubmitResponse}>
            <Form.Group className="mb-3">
              <Form.Label>Add Response</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Enter your response here..."
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <FaPaperclip className="me-2" />
                Attach Files
              </Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={handleFileChange}
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              <FaReply className="me-2" />
              Submit Response
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TicketDetail; 