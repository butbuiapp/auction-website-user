import React, { useEffect, useState } from "react";
import adminService from '../../services/AdminService';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';


const BidSettlement = () => {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'bidDueDate', headerName: 'Bid Due Date', width: 200 },
        { field: 'bidStartPrice', headerName: 'Bid Starting Price', type: 'number', width: 130 },
        {
            field: 'conditionOfSale',
            headerName: 'Condition',
            width: 90,
        },
        {
            field: 'description',
            headerName: 'Description',
            sortable: false,
            width: 300
        },
        {
            field: 'shippingInformation',
            headerName: 'Shipping Information',
            sortable: false,
            width: 180
        },
        {
            field: 'status',
            headerName: 'Status',
            sortable: false,
            width: 90
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
                    <button
                        onClick={() => settleProduct(params.row.id)}
                        style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px' }}
                    >
                        Settle Product Bids
                    </button>
                </div>
            ),
        }
    ];

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await adminService.getProductBids();
                setProducts(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching the active products!", error);
            }
        };

        fetchProducts();
    }, []);

    const settleProduct = async (productId) => {
        try {
            const response = await adminService.settleProductBid(productId);
            if (response.success) {
                setProducts(products.filter((product) => product.id !== productId));
                toast.success('Product bid settled successfully!');
            }
            console.log(response);
        } catch (error) {
            toast.error('Error settling the product bid!');
            console.error("Error settling the product bid!", error);
        }
    }

    return (
        <>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={products}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            </div>
        </>
    )
}
export default BidSettlement;
