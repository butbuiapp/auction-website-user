import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../services/AuthProvider';
import bidService from '../../services/BidService';
import DisplayMessage from '../layout/DisplayMessage';
import Deposit from '../bid/Deposit';
import productService from '../../services/ProductService';

function ProductDetailCurrentBid({ productId }) {
  const { email } = useContext(AuthContext);
  const [error, setError] = useState();
  const bidPriceRef = useRef();
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [bid, setBid] = useState({currentBid: 0, 
                                  totalBids: 0, 
                                  bidStartPrice: 0, 
                                  deposit: 0,
                                  productOwner: false
                                });

  async function getCurrentBid(id) {
    const res = await productService.getCurrentBidByProductId(id);

    if (res) {
      if (res.success) {
        // console.log('getCurrentBid', res);
        setBid({...res.data});
      } else {
        setError(res.message);
      }
    } else {
      setError('There is something wrong. Please try again.');
    }
  }

  useEffect(() => {
    getCurrentBid(productId);
  }, [productId]);

  const handleBid = async () => {
    setError('');
    const bidPrice = bidPriceRef.current.value;

    // validate
    if (!validateBid(bidPrice)) return false;

    // save to DB
    const bid = {
      "bidDate": new Date(),
      "bidPrice": bidPrice,
      "user": {
        "email": email
      },
      "product": {
        "id": productId
      }
    }
    
    const res = await bidService.saveBid(bid);
    if (res) {
      if (res.success) {
        setError('Your bid was registered successfully');
        getCurrentBid(productId);
      } else {
        if (res.requiredDeposit) {
          // show deposit dialog
          setShowDepositModal(true);
        }
        setError(res.message);
      }
    } else {
      setError('There is something wrong. Please try again.');
    }
  }

  function validateBid(bidPrice) {
    if (bidPrice === '' || bidPrice === 0) {
      setError('Your bid must be greater than 0');
      return false;
    }
    if (isNaN(bidPrice)) {
      setError('Your bid must be a number');
      return false;
    }

    if (bid.currentBid === 0 && bidPrice < bid.bidStartPrice) {
      setError('Your bid must be greater than start price');
      return false;
    }
    if (bidPrice <= bid.currentBid) {
      setError('Your bid must be greater than current bid');
      return false;
    }    
    return true;
  }

  return (
    <div className='box'>
      <div className='left py-2'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-tag-fill" viewBox="0 0 16 16">
          <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
        </svg>
      </div>
      <div className='right'>
        <div>
          <b>CURRENT BID:</b>
          <label className='current-bid ms-2'>{bid.currentBid}</label>
        </div>
        <div className='py-2'>
          <b>Total Bids:</b>
          <label className='ms-2'>{bid.totalBids}</label>
        </div>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
          <Form.Control
            placeholder="Bid price"
            aria-label="bidPrice"
            aria-describedby="basic-addon1"
            ref={bidPriceRef}
            maxLength={10}
          />
        </InputGroup>
        <Button variant={bid.productOwner ? "secondary" : "primary"} size="lg" className='btn-large' 
                onClick={handleBid} disabled={bid.productOwner}>
          Bid
        </Button>
        <div className='text-danger mt-2'>
          {error && <DisplayMessage message={error} type="error" />}
        </div>
      </div>

      {showDepositModal && <Deposit isShow={showDepositModal} 
                                    setShowDepositModal={setShowDepositModal}
                                    productDeposit={bid.deposit}
                                    productId={productId}
                                    resetStatus={setError}
                            />}
    </div>

    
  )
}

export default ProductDetailCurrentBid;