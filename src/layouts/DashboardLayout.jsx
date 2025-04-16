import React from 'react';
import { Container } from 'react-bootstrap';
import CustomNavbar from '../components/Navbar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <CustomNavbar />
      <Container fluid className="content-wrapper">
        {children}
      </Container>
    </div>
  );
};

export default DashboardLayout; 