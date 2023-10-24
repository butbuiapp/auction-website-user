import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import { useRef, useState } from 'react';
import bidService from '../../services/BidService';
import DisplayMessage from '../layout/DisplayMessage';
import { useContext } from 'react';
import { AuthContext } from '../../services/AuthProvider';

function Deposit({ isShow, setShowDepositModal, productDeposit, productId, resetStatus }) {
  const { email } = useContext(AuthContext);
  const [error, setError] = useState();
  const amountRef = useRef();

  const handleClose = () => {
    setShowDepositModal(false);
  }

  const handleDeposit = async () => {
    const deposit = amountRef.current.value;
    // validate
    if (!validateDeposit(deposit)) return false;

    // save to DB
    const bid = {
      "deposit": deposit,
      "depositDate": new Date(),
      "user": {
        "email": email
      },
      "product": {
        "id": productId
      }
    }
    const res = await bidService.makeDeposit(bid);
    if (res) {
      if (res.success) {
        resetStatus('Successful deposit. Now you can bid.');
        handleClose();
      } else {
        setError(res.message);
      }
    } else {
      setError('There is something wrong. Please try again.');
    }

  }

  function validateDeposit(deposit) {
    if (deposit === '' || deposit === 0) {
      setError('Deposit must be greater than 0');
      return false;
    }
    if (isNaN(deposit)) {
      setError('Deposit must be a number');
      return false;
    }
    if (deposit < productDeposit) {
      setError('Deposit must be greater than or equal to ' + productDeposit);
      return false;
    }
    return true;
  }

  return (
    <>
      <Modal show={isShow} >
        <Modal.Header>
          <Modal.Title>Make a Deposit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="controlInput1">
            <Form.Label>Amount</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
              <Form.Control
                type="text"
                autoFocus
                ref={amountRef}
                maxLength={10}
              />
            </InputGroup>
            <div className='text-danger mt-2'>
              {error && <DisplayMessage message={error} type="error" />}
            </div>
            <Form.Label className='fw-bold'>
              Required minimum deposit:
              <label className='price mt-3 ms-2'>{productDeposit}</label>
            </Form.Label>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDeposit}>
            Deposit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Deposit;