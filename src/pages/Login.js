import DisplayMessage from '../components/layout/DisplayMessage';
import "../css/pages/Login.css";
import { useContext, useEffect, useState } from 'react';
import Footer from '../components/layout/Footer';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AuthContext } from "../services/AuthProvider";
import { useNavigate } from "react-router-dom";
import userService from '../services/UserService';
import { setAuthorizationHeader } from '../services/HttpService';

function Login() {
  const { token, setToken, hasAdminRole, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState();
  const [user, setUser] = useState({ email: '', password: '' });

  useEffect(() => {
    // clean the token cached unexpectedly due to improper logout
    if (token) {
      handleLogout();
    }
  }, []);

  function changeHandler(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function submitHandler(e) {
    e.preventDefault();
    userService.login(user).then(token => {
      setToken(token);
      setAuthorizationHeader(token);
      if (hasAdminRole()) {
        navigate("/admin/bid-settlement");
      } else {
        navigate("/");
      }
    }).catch(error => {
      setError(error.message);
      return false;
    });
  }

  return (
    <Form className='login'>
      <div className='box'>
        <h1>Login</h1>
        <div className='text-danger mt-2'>
          {error && <DisplayMessage message={error} type="error" />}
        </div>
        <Form.Group className="mb-3  mt-4" controlId="emailGroup">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" name='email'
            onChange={changeHandler} required value={user.email} autoFocus />
        </Form.Group>
        <Form.Group className="mb-3" controlId="passwordGroup">
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' name='password' value={user.password}
            onChange={changeHandler} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="btnGroup">
          <Button variant="primary" onClick={submitHandler}>Login</Button>
        </Form.Group>
        <Form.Group className="mb-3" controlId="registerGroup">
          <span className='me-2'>No account?</span>
          <a href="/register">Register</a>
        </Form.Group>
      </div>
      <Footer />
    </Form>
  )
}

export default Login;