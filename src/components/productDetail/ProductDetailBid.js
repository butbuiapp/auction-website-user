import '../../css/components/product/ProductDetail.css';
import ProductDetailBidInfo from './ProductDetailBidInfo';
import ProductDetailCurrentBid from './ProductDetailCurrentBid';
import { isClosingSoon } from '../../util/dateTimeUtil';
import ClosingSoon from './ClosingSoon';

function ProductDetailBid({ product }) {

  return (
    <div className='product-bid'>
      <div className="p-2">
        {isClosingSoon(product.bidDueDate) && <ClosingSoon bidDueDate={product.bidDueDate} />}
      </div>
      <div className="p-2">
        <ProductDetailBidInfo
          bidDueDate={product.bidDueDate}
          bidStartPrice={product.bidStartPrice}
          deposit={product.deposit}
        />
      </div>
      <div className="p-2">
        <ProductDetailCurrentBid productId={product.id} />
      </div>
    </div>
  )
}

export default ProductDetailBid;