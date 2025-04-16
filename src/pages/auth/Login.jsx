import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FaUser, FaLock, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        console.log('Attempting login...');
        const user = await login(values.email, values.password);
        toast.success('Login successful!');
        
        // Navigate based on user role
        switch (user.role) {
          case 'admin':
            navigate('/dashboard');
            break;
          case 'agent':
            navigate('/dashboard');
            break;
          case 'customer':
            navigate('/dashboard');
            break;
          default:
            navigate('/');
        }
      } catch (error) {
        console.error('Login error:', error);
        toast.error(error.response?.data?.error || 'Login failed. Please check your credentials.');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="login-page">
      <Container fluid className="h-100">
        <Row className="h-100">
          {/* Left side - Image/Background */}
          <Col lg={6} className="d-none d-lg-flex align-items-center justify-content-center login-bg">
            <div className="text-center text-white p-5">
              <h1 className="display-4 fw-bold mb-4">Welcome to Ticket System</h1>
              <p className="lead">Streamline your support process with our advanced ticketing system</p>
            </div>
          </Col>

          {/* Right side - Login Form */}
          <Col lg={6} className="d-flex align-items-center justify-content-center">
            <div className="login-form-container p-4 p-md-5">
              <div className="text-center mb-5">
                <h2 className="fw-bold mb-3">Sign In</h2>
                <p className="text-muted">Enter your credentials to access your account</p>
              </div>

              <Form onSubmit={formik.handleSubmit} className="login-form">
                <div className="form-group mb-4">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaUser />
                    </span>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.email && formik.errors.email}
                      className="form-control-lg"
                    />
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <div className="invalid-feedback d-block">
                      {formik.errors.email}
                    </div>
                  )}
                </div>

                <div className="form-group mb-4">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaLock />
                    </span>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.password && formik.errors.password}
                      className="form-control-lg"
                    />
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <div className="invalid-feedback d-block">
                      {formik.errors.password}
                    </div>
                  )}
                </div>

                <div className="d-grid mb-4">
                  <Button
                    type="submit"
                    className="btn-primary btn-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                    ) : (
                      <FaArrowRight className="me-2" />
                    )}
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </div>

                <div className="text-center">
                  <p className="mb-0">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary fw-bold">
                      Register here
                    </Link>
                  </p>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login; 