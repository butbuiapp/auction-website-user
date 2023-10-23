import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import productService from "../../services/ProductService";
import '../../css/pages/Seller.css';
import { PRODUCT_STATUS } from "../../util/constant";
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { formatDate } from "../../util/dateTimeUtil";


const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getProductsBySeller();
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching the products!", error);
      }
    };

    fetchProducts();
  }, []);

  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate =useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedId(id);
    setShow(true);
  };

  const handleDelete = async (productId) => {
    try {
      await productService.deleteProduct(productId);
      setProducts(products.filter((product) => product.id !== productId));
      toast.success('Product deleted successfully!');
    } catch (error) {
      console.error("Error deleting the product!", error);
      toast.error('There was an error deleting the product.');
    }
  };

  return (
    <div className="container mt-3">
        <div style={{ position: 'relative', textAlign: 'center' }}>
            <h2>My Products</h2>
            <Link to="add" className="btn btn-primary btn-lg" style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>
                Create Product
            </Link>
        </div>


      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Thumbnail</th>
            <th>Starting Price</th>
            <th>Deposit</th>
            <th>Bid Due</th>
            <th>Payment Due</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
              <b className="btn-link" style={{cursor:"pointer"}} onClick={()=>{navigate("/product/detail", {state: product.id});}} >
                    {product.name}
                  </b>
                </td>
              <td>
                <img 
                    src={productService.getProductImage(product?.images[0]?.name)} 
                    alt={product?.images[0]?.name} 
                    style={{width: '5vw', height: '5vw'}}
                />
              </td>
              {/* <td>{product.description}</td> */}
              <td>${product.bidStartPrice?.toFixed(2)}</td>
              <td>${product.deposit?.toFixed(2)}</td>
              <td>{formatDate(product.bidDueDate)}</td>
              <td>{formatDate(product.paymentDueDate)}</td>
              <td>{product.status}</td>
              <td>
                {(product.status===PRODUCT_STATUS.DRAFT || product.bidCount === 0) && (
                  <Link
                    to={`edit/${product.id}`}
                    className="btn btn-warning btn-sm me-2 mb-2 w-100"
                  >
                    Edit
                  </Link>
                )}
                <button
                  onClick={() => handleShow(product.id)}
                  className="btn btn-danger btn-sm w-100"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDelete(selectedId);
              handleClose();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductList;
