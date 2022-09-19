import React from "react";

export default function ItemCard({
  itemName,
  currentBid,
  handleClick,
  id,
  img,
  itemDescription
}) {

  return (
    <div className="card">
      <img className="item-img" src={img}></img>
      <div className="item-details">
        <div>
          <h2 className="item-name">{itemName}</h2>
          <div className="current-bid">Current bid: ${currentBid}</div>
        </div>
        <button className="button" onClick={() => handleClick(id, itemName, itemDescription, img, currentBid)}>
          Open Listing
        </button>
      </div>
    </div>
  );
}
 