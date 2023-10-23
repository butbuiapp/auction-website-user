import { useContext, useEffect } from 'react';
import ProductList from "../components/product/ProductList";
import { AuthContext } from '../services/AuthProvider';
import { useNavigate } from 'react-router';

function Home() {

  const navigate = useNavigate();
  const { hasAdminRole } = useContext(AuthContext);

  useEffect(() => {
    if (hasAdminRole()) {
      navigate("/admin/bid-settlement");
      return;
    }
  }, []);


  return (
    <div>
      { !hasAdminRole() && <ProductList /> }
    </div>
  )
}

export default Home;