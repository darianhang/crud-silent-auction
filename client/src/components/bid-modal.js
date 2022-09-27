import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"

export function BidModal({ prevBidders, handleClick, showModal, itemName, itemDescription, img, handleClose, currentBid }) {
  const [bid, setBid] = useState("");
  const [bidder, setBidder] = useState("");

  function handleChangeBid(event) {
    setBid(event.target.value);
    console.log(event.target.value);
  }

  function handleChangeBidder(event) {
    setBidder(event.target.value);
    console.log(event.target.value);
  }

  return (
    <div style={{ display: showModal ? "" : "none" }} className="modal-bg">
      <AnimatePresence>
        {showModal ? 
            <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="bid-modal"
            >
            <header className="modal-header-container">
              <div className="modal-header">
                <h1 className="modal-title">{itemName}</h1>
                <div href="#" className="close" onClick={() => {handleClose(setBid, setBidder)}}></div>
              </div>
              <div className="current-bid">Current bid: ${currentBid}</div>
            </header>
            <div className="modal-body">
              <div className="modal-img-container">
              <img className="modal-item-img" src={img}></img>
              </div>
              <p>{itemDescription}</p>
            </div>
              <h3 className="bids-title">Previous bids:</h3>
              <div className="bids">
                {prevBidders}
              </div>
            <footer className="modal-footer">
              <input className="modal-inputname" placeholder="Name" value={bidder} onChange={handleChangeBidder}></input>
              <input className="modal-inputbid" placeholder="$" value={bid} onChange={handleChangeBid}></input>
              <button className="modal-btn" onClick={() => handleClick(bid, setBid, bidder, setBidder)}>Place Bid</button>
            </footer>
            </motion.div>
        : ""}
      </AnimatePresence>
    </div>
  );
}
