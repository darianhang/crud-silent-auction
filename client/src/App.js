
import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemCard from "./components/item-card";
import { BidModal, AnimatePresense } from "./components/bid-modal";
import Splash from "./components/splash";
import { motion, AnimatePresence } from "framer-motion"
const api_base = "https://gensler-silent-auction.herokuapp.com";

function App() {
  const getBidItems = () => {
    axios
      .get(api_base + "/BidItems")
      .then((res) => res)
      .then((data) => setBidItems(data))
      .catch((err) => console.error("Error: ", err));
  };

  const [bidItems, setBidItems] = useState(getBidItems);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    getBidItems();
  }, []);

  function toggleScrollOn() {
    document.body.style.overflow = 'scroll'
    setShowSplash(false)
  }

  function toggleScrollOff() {
    document.body.style.overflow = 'hidden'
  }

  const updatePrice = (updatedPrice, setBid) => {
    const currentBid = bidItems.data.find((x) => x._id === currentItem.id).currentBid;
    console.log(updatedPrice)
    if (updatedPrice > currentBid) {
      axios
        .put(`${api_base}/BidItems/update/${currentItem.id}`, {
          currentBid: updatedPrice,
        })
        .then((res) => res)
        .then(setBid(""))
        .then(closeModal)
        .then(getBidItems)
        .catch((err) => console.error("Error: ", err));
    } else {
      alert("Please enter a higher amount than the current bid");
    }
  };

  const closeModal = () => {
    setShowModal(false)
    document.body.style.overflow = 'scroll'
  }

  const openModal = (id, itemName, itemDescription, img, currentBid) => {
    setShowModal(true);
    document.body.style.overflow = 'hidden'
    setCurrentItem({
      id: id,
      itemName: itemName,
      itemDescription: itemDescription,
      img: img,
      currentBid: currentBid
    })
    console.log(currentItem)
  };

  if (bidItems === undefined) {
    return <Splash />;
  }

  return (
    <div className="App">
      <div>
        <AnimatePresence>
          {showSplash ? 
            <motion.div
            initial={{ opacity: 1}}
            animate={{ opacity: 0}}
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
              handleClick={updatePrice}
              itemName={currentItem.itemName}
              itemDescription={currentItem.itemDescription}
              img={currentItem.img}
              currentBid={currentItem.currentBid}
              handleClose={closeModal}
            />
        {bidItems.data.map((items) => {
          return (
            <div>
              <ItemCard
                key={items._id}
                itemName={items.itemName}
                currentBid={items.currentBid}
                handleClick={openModal}
                id={items._id}
                img={items.img}
                itemDescription={items.itemDescription}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
