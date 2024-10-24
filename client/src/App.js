
import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemCard from "./components/item-card";
import { BidModal, AnimatePresense } from "./components/bid-modal";
import Splash from "./components/splash";
import { motion, AnimatePresence } from "framer-motion"
import NavBar from "./components/navbar"
// const api_base = "http://localhost:3001";
const api_base = "https://crud-silent-auction.onrender.com";

function App() {

  const [bidItems, setBidItems] = useState(getBidItems);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [showSplash, setShowSplash] = useState(true);

  const getBidItems = () => {
    axios
      .get(api_base + "/BidItems")
      .then((res) => res)
      .then((data) => setBidItems(data))
      .catch((err) => console.error("Error: ", err));
  };

  useEffect(() => {
    getBidItems();
    console.log("hello")
  }, [0]);

  function toggleScrollOn() {
    document.body.style.overflow = 'scroll'
    document.body.style.touchAction = "auto"
    setShowSplash(false)
  }

  function toggleScrollOff() {
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = "none"
  }

  const placeBid = (bid, setBid, bidder, setBidder) => {
    const currentBid = currentItem.currentBid;
    if (typeof bidder === 'string' && bidder.trim().length === 0){
      alert("Please enter a name");
      setBidder("")
    }else if (bidder.length > 25){
        alert("Name is too long.");
        setBidder("")
    }else if (bid % 1 !== 0) {
        alert("Sorry, whole numbers only.")
        setBid("")
      }else if (bid > 1000) {
          alert("Please enter an amount under $1000");
          setBid("");
        }else if (bid > currentBid) {
          axios
            .put(`${api_base}/BidItems/update/${currentItem.id}`, {
            bids: {name:bidder.trim(), bid:bid}
          })
            .then(() => closeModal(setBid, setBidder))
            .then(() => getBidItems())
            .catch((err) => console.error("Error: ", err));
          } else {
              alert("Please enter a higher amount than the current bid");
              console.log(currentBid)
              setBid("");
            }
  };

  const closeModal = (setBid, setBidder) => {
    setShowModal(false)
    document.body.style.overflow = 'scroll'
    document.body.style.touchAction = "auto"
    setBid("")
    setBidder("")
  }

  const openModal = (id, itemName, itemDescription, img, currentBidAmount, currentBids) => {
    setShowModal(true);
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = "none"
    let bids
    try {
      let bidsArray = currentBids.sort((a, b) => {return b.bid - a.bid})
      bids = bidsArray.map((x) => {return (<p key={x._id}>{x.name} - {x.bid}</p>)})
    }
    catch {
      bids = 0
    }
    setCurrentItem({
      id: id,
      itemName: itemName,
      itemDescription: itemDescription,
      img: img,
      currentBid: currentBidAmount,
      prevBidders: bids
    })
  };

  if (bidItems === undefined) {
    return <Splash />;
  }

  return (
    <div className="App">
      <NavBar />
      <div className="card-container">
        <AnimatePresence>
          {showSplash ?
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
              onAnimationStart={toggleScrollOff}
              onAnimationComplete={toggleScrollOn}
            >
              <Splash />
            </motion.div>
            : ""}
        </AnimatePresence>
        <BidModal
          id={currentItem}
          showModal={showModal}
          handleClick={placeBid}
          itemName={currentItem.itemName}
          itemDescription={currentItem.itemDescription}
          img={currentItem.img}
          currentBid={currentItem.currentBid || 0}
          handleClose={closeModal}
          prevBidders={currentItem.prevBidders || ""}
        />
        {bidItems.data.map((items) => {
          return (
            <ItemCard
              key={items._id}
              itemName={items.itemName}
              currentBids={items.bids}
              handleClick={openModal}
              id={items._id}
              img={items.img}
              itemDescription={items.itemDescription}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
