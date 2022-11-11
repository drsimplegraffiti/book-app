import React from "react";

const ShowMore = ({ showMore }) => {
  return (
    <div className="show-more">
      <button onClick={() => showMore()}>Show More</button>
    </div>
  );
};

export default ShowMore;
