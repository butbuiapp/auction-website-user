import React, { useEffect, useState } from 'react';
import bidService from '../services/BidService';
import "../css/pages/BidHistory.css";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { formatDate } from '../util/dateTimeUtil';


function BidHistory() {
    const [bids, setBids] = useState([]);

    useEffect(() => {
        async function fetchBids() {
            try {
                const response = await bidService.getMyBidHistory();
                setBids(response || []);
            } catch (error) {
                console.error('Error fetching bids', error);
            }
        }

        fetchBids();
    }, []);

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); 
    const years = (!bids || bids.length === 0) ? [selectedYear] : 
    [...new Set(bids?.map(bid => new Date(bid.bidDate || bid.depositDate).getFullYear()))] ;
    
    const filteredBids = bids?.filter(bid => 
        new Date(bid.bidDate || bid.depositDate).getFullYear() === parseInt(selectedYear)     
    );

    const groupedBids = filteredBids?.reduce((acc, bid) => {
        acc[bid.product.id] = acc[bid.product.id] || [];
        acc[bid.product.id].push(bid);
        return acc;
    }, {});
    const [expanded, setExpanded] = useState({});
    const toggleExpand = (productId) => {
        setExpanded((prev) => ({ ...prev, [productId]: !prev[productId] }));
    };
    return (
        <div className='bid-history'>
            <h3>My Bid History</h3>
            
            {bids && bids !== null && bids.length > 0 && 
            <div 
            style={{marginTop: "20px",marginBottom: "20px", fontSize: "calc(1.3rem + .6vw)"}}>
            Select year: {" "}
            <select
                onChange={e => {setSelectedYear(e.target.value); setExpanded({})}} 
                value={selectedYear}
            >{years !== null && years?.length > 0 && years.map(year => <option key={year} value={year}>{year}</option>)}</select>
            </div>
            }
            
            {Object.keys(groupedBids).length > 0 ? (
                Object.keys(groupedBids).map((productId, index) => (
                    <div key={productId} 
                    style={{background: "#f6d97f6e",
                            borderColor: "#f93e3e",
                            borderRadius: "4px",
                            boxShadow: "0 0 3px rgba(0,0,0,.19)",
                            margin: "0 0 15px"
                        }}>
                    <button 
                            className="btn swagger-btn" 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target={`#collapse${index}`} 
                            aria-expanded="false" 
                            onClick={() => toggleExpand(productId)}
                        >
                            {expanded[productId] ? <KeyboardArrowDownIcon/> : <KeyboardArrowRightIcon/>}
                            Product ID: {productId}
                        </button>
                        <div className="collapse collapse-container" id={`collapse${index}`}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Value</th>
                                        <th>Bid Date</th>
                                        <th>Winner</th>
                                        <th>Product Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {groupedBids[productId].map(bid => (
                                        <tr key={bid.id} className={`${bid.deposit === 0 ? "history-bid" : "history-deposit"} ${bid.winner ? "history-winner" : ""}`}>
                                            <td>{bid.deposit === 0 ? "Bid" : "Deposit"}</td>
                                            <td>${bid.deposit === 0 ? bid.bidPrice : bid.deposit}</td>
                                            <td>{formatDate(bid.bidDate || bid.depositDate)}</td>
                                            <td>{bid.winner ? "Yes" : "No"}</td>
                                            <td>{bid.product.name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))
            ) : (
                <p>You have not placed any bids yet.</p>
            )}
        </div>
    );
}

export default BidHistory;
