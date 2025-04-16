import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { FaPaperclip } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ticketService from '../services/ticketService';
import { toast } from 'react-toastify';

const CreateTicket = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    tagIds: []
  });
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await ticketService.createTicket({
        ...formData,
        attachments: files
      });
      toast.success('Ticket created successfully');
      navigate('/tickets');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to create ticket');
      console.error('Error creating ticket:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="create-ticket">
      <Card.Header>
        <h3>Create New Ticket</h3>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter ticket title"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Priority</Form.Label>
                <Form.Select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your issue in detail"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <FaPaperclip className="me-2" />
              Attachments
            </Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={handleFileChange}
            />
            <Form.Text className="text-muted">
              You can attach multiple files (max 5MB each)
            </Form.Text>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Ticket'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CreateTicket; 