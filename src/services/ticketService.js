import axios from 'axios';

const API_URL = '/api/tickets';

const ticketService = {
  // Create a new ticket
  createTicket: async (ticketData) => {
    const formData = new FormData();
    
    // Add ticket data
    formData.append('title', ticketData.title);
    formData.append('description', ticketData.description);
    formData.append('priority', ticketData.priority);
    if (ticketData.tagIds) {
      formData.append('tagIds', JSON.stringify(ticketData.tagIds));
    }
    
    // Add files if any
    if (ticketData.attachments) {
      ticketData.attachments.forEach(file => {
        formData.append('attachments', file);
      });
    }

    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  // Get all tickets
  getTickets: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  // Get a single ticket
  getTicket: async (ticketId) => {
    const response = await axios.get(`${API_URL}/${ticketId}`);
    return response.data;
  },

  // Update a ticket
  updateTicket: async (ticketId, ticketData) => {
    const response = await axios.patch(`${API_URL}/${ticketId}`, ticketData);
    return response.data;
  },

  // Add a response to a ticket
  addResponse: async (ticketId, responseData) => {
    const formData = new FormData();
    formData.append('content', responseData.content);
    
    if (responseData.attachments) {
      responseData.attachments.forEach(file => {
        formData.append('attachments', file);
      });
    }

    const response = await axios.post(`${API_URL}/${ticketId}/responses`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  // Download a file attachment
  downloadFile: async (fileId) => {
    const response = await axios.get(`${API_URL}/attachments/${fileId}`, {
      responseType: 'blob'
    });
    return response.data;
  }
};

export default ticketService; 