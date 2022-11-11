const BestSellingBooks = () => {
  return (
    <div className="best-selling-books" id="best">
      <p className="best-selling-books-paragraph">Best Selling Books</p>
      <h2 className="best-selling-books-header">Top 3 Best Selling Books</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam</p>

      <div className="best-selling-books-cards">
        <div className="best-selling-books-card">
          <img src="../assets/book3.png" alt="" />
          <h2>Harry Potter</h2>
          <p>
            This is the best booking site ever to collect a number of bookings
          </p>
          <div className="star-rating">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            (4/5)
          </div>
        </div>
        <div className="best-selling-books-card">
          <img src="../assets/book3.png" alt="" />

          <h2>Shakespare</h2>
          <p>
            This is the best booking site ever to collect a number of bookings
          </p>
          <div className="star-rating">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            (5/5)
          </div>
        </div>
        <div className="best-selling-books-card">
          <img src="../assets/book3.png" alt="" />

          <h2>Moon Light </h2>
          <p>
            This is the best booking site ever to collect a number of bookings
          </p>
          <div className="star-rating">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            (3/5)
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellingBooks;
