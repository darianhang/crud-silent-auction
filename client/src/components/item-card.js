import React from "react";

export default function ItemCard({
  itemName,
  currentBids,
  handleClick,
  id,
  img,
  itemDescription
}) {

  let currentBidAmount

  try {
    let bidsArray = currentBids.map((x) => x.bid)
    currentBidAmount = bidsArray.sort(function(a, b) {return b - a})[0]
}
  catch {
    currentBidAmount = 0
  }

  return (
    <div className="card">
      <div className="img-container" style={{backgroundImage: `url(${img})`}}>
      </div>
      <div className="item-details">
        <div>
          <h2 className="item-name">{itemName}</h2>
          <div className="current-bid">Current bid: ${currentBidAmount}</div>
        </div>
        <button className="button" onClick={() => handleClick(id, itemName, itemDescription, img, currentBidAmount, currentBids)}>
          Open Listing
        </button>
      </div>
    </div>
  );
}