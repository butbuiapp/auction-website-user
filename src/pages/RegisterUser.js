import DisplayMessage from '../components/layout/DisplayMessage';
import "../css/pages/Login.css";
import { useContext, useState } from 'react';
import Footer from '../components/layout/Footer';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import userService from '../services/UserService';
import { AuthContext } from '../services/AuthProvider';
import { setAuthorizationHeader } from '../services/HttpService';

function RegisterUser() {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [user, setUser] = useState({ role: 'ROLE_CUSTOMER', email: '', name: '', licenseNumber: '', password: '', confirmPassword: '' });

  function changeHandler(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function submitHandler(e) {
    e.preventDefault();

    if (user.confirmPassword !== user.password) {
      setError('Password and confirm password do not match');
      return;
    }

    userService.register(user).then(token => {
      setToken(token); // let user login after registration
      setAuthorizationHeader(token);
      navigate("/", { replace: true });
    }).catch(error => {
      setError(error.message);
    });
  }

  function cancelHandler() {
    navigate('/login');
  }

  return (
    <Form className='login' onSubmit={submitHandler}>
      <div className='box'>
        <h1>Register User</h1>
        <div className='text-danger mt-2'>
          {error && <DisplayMessage message={error} type="error" />}
        </div>
        <Form.Group className="mt-4 mb-3" controlId="roleGroup">
          <Form.Label>User type</Form.Label>
          <Form.Select value={user.role} onChange={changeHandler} name="role" autoFocus>
            <option value="ROLE_CUSTOMER">Customer</option>
            <option value="ROLER_SELLER">Seller</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="emailGroup">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name='email'
            onChange={changeHandler} required value={user.email} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="nameGroup">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name='name'
            onChange={changeHandler} required value={user.name} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="licenseGroup">
          <Form.Label>License number</Form.Label>
          <Form.Control type="text" name='licenseNumber'
            onChange={changeHandler} required value={user.licenseNumber} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="passwordGroup">
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' name='password' value={user.password}
            onChange={changeHandler} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPasswordGroup">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control type='password' name='confirmPassword' value={user.confirmPassword}
            onChange={changeHandler} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="btnGroup">
          <Button variant="secondary" onClick={cancelHandler} className='me-2'>Cancel</Button>
          <Button variant="primary" onClick={submitHandler}>Register</Button>
        </Form.Group>
        <Form.Group className="mb-3" controlId="registerGroup">
          <span className='me-2'>Already have an account?</span>
          <a href="/login">Login</a>
        </Form.Group>
      </div>
      <Footer />
    </Form>
  )
}

export default RegisterUser;