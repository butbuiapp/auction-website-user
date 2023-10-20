import React, { useState } from 'react';
import productService from '../../services/ProductService';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import ImageUpload from '../../components/layout/ImageUpload';
import {useNavigate} from "react-router-dom";

const CreateProduct = () => {
    const [product, setProduct] = useState({ 
        name: '', 
        description: '', 
        categories: '',
        deposit: '', 
        bidStartPrice: '', 
        bidDueDate: '',
        paymentDueDate: '',
        status: '',
        images:[]
    });
    const navigate = useNavigate();
    const setImages = (images)=>{
        setProduct({ ...product, images});
        console.log(product,images);
    }

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSave = async (release) => {
        try {
            const newProduct = { ...product, status: release };
            console.log(newProduct);
            await productService.addProduct(newProduct);
            alert('Product saved successfully');
        } catch (error) {
            console.error('There was an error!', error);
        }
        navigate("/seller/products");
    };

    return (
        <div className="container mt-3 seller-product-add-container">
            <h2>Add Product</h2>
            <form className='seller-product-add-form' onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <input 
                        type="text" 
                        name="name" 
                        value={product.name} 
                        onChange={handleChange} 
                        className="form-control" 
                        placeholder="Name"
                        required 
                    />
                </div>

                <div className="form-group">
                    <textarea 
                        name="description" 
                        value={product.description} 
                        onChange={handleChange} 
                        className="form-control"
                        placeholder="Description"
                        required 
                    />
                </div>

                <div className="form-group">
                    <input 
                        type="text" 
                        name="categories" 
                        value={product.categories} 
                        onChange={handleChange} 
                        className="form-control" 
                        placeholder="Categories"
                        required 
                    />
                </div>

                <div className="form-group">
                    <input 
                        type="number" 
                        name="bidStartPrice" 
                        value={product.bidStartPrice} 
                        onChange={handleChange} 
                        className="form-control" 
                        placeholder="Starting Price"
                        required 
                    />
                </div>

                <div className="form-group">
                    <input 
                        type="number" 
                        name="deposit" 
                        value={product.deposit} 
                        onChange={handleChange} 
                        className="form-control" 
                        placeholder="Deposit"
                        required 
                    />
                </div>

                <div className="form-group">
                    <input 
                        type="date" 
                        name="bidDueDate" 
                        value={product.bidDueDate} 
                        onChange={handleChange} 
                        className="form-control"
                        placeholder="Bid Due Date"
                        required 
                    />
                </div>

                <div className="form-group">
                    <input 
                        type="date" 
                        name="paymentDueDate" 
                        value={product.paymentDueDate} 
                        onChange={handleChange} 
                        className="form-control" 
                        placeholder="Payment Due Date"
                        required 
                    />
                </div>
                <ImageUpload imgs={product.images} setImgs={setImages} />
                <div>
                    
                <button 
                    type="button" 
                    onClick={() => handleSave(false)}
                    style={{width:"50%"}}
                    className="btn btn-primary mr-5">
                    Save Without Release
                </button>

                <button 
                    type="button" 
                    onClick={() => handleSave(true)} 
                    style={{width:"50%"}}
                    className="btn btn-success">
                    Save and Release
                </button>
                
                </div>
            </form>
        </div>
    );
};

export default CreateProduct;
