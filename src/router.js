import { createBrowserRouter } from 'react-router-dom';
import CustomerRole from './components/layout/CustomerRole';
import SellerRole from './components/layout/SellerRole';
import Error from './components/layout/Error';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import RegisterUser from './pages/RegisterUser';
import BidHistory from './pages/BidHistory';
import ProductList from './pages/seller/ProductList';
import CreateProduct from './pages/seller/CreateProduct';
import Logout from './pages/Logout';
import NotFound from './components/layout/NotFound';
import AdminRole from './components/layout/AdminRole';
import BidSettlement from './pages/admin/BidSettlement';


const router = createBrowserRouter([
  {
    path: '/',
    element: <CustomerRole />,
    errorElement: <Error />,
    children: [
      {
        path: '',
        element: <>
        <Home /></>
      },
      {
        path: 'product/detail',
        element: <ProductDetail />
      },
      {
        path: 'bid-history',
        element: <BidHistory />
      }
    ]
  },
  {
    path: '/seller/',
    element: <SellerRole />,
    errorElement: <Error />,
    children: [
      {
        path: 'products',
        element: <ProductList />
      },
      {
        path: 'products/add',
        element: <CreateProduct />
      },
      {
        path: 'products/edit/:id',
        element: <CreateProduct />
      }
    ]
  },
  {
    path: '/admin/',
    element: <AdminRole />,
    errorElement: <Error />,
    children: [
      {
        path: 'bid-settlement',
        element: <BidSettlement />
      }
    ]
  },
  {
    path: '/register',
    element: <RegisterUser />
  },
  {
    path: '/login',
    element: <Login />
  }, 
  {
    path: '/logout',
    element: <Logout />
  },
  {
    path: '/404',
    element: <NotFound />
  }
]);

export default router;