import http from './HttpService';

class AdminService {

    settleProductBid = async (productId) => {
        try {
            const res = await http.post(`/admin/bids/settle/${productId}`);
            return res.data;
        } catch (error) {
            return null;
        }
    }

    getProductBids = async () => {
        try {
            const res = await http.get(`/admin/bids`);
            return res.data;
        } catch (error) {
            return null;
        }
    }

}

const adminService = new AdminService();
export default adminService;