import { useState, useEffect } from "react";
import Zoom from "react-reveal/Zoom";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showMore, setShowMore] = useState(4);

  useEffect(() => {
    fetch("http://localhost:5678/api/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setFilteredBooks(data);
      });
  }, []);

  useEffect(() => {
    setFilteredBooks(
      books.filter(
        (book) =>
          book.title.toLowerCase().includes(search.toLowerCase()) ||
          book.author.toLowerCase().includes(search.toLowerCase()) ||
          book.genre.toLowerCase().includes(search.toLowerCase()) ||
          book.summary.toLowerCase().includes(search.toLowerCase()) ||
          book.ISBN.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, books]);

  return (
    <>
      <div className="book-container" id="find">
        <div className="book-heading">
          <h2 className="book-header" id="search">
            Search and Explore
          </h2>
        </div>
        <div className="search-bar">
          <select
            className="filter-genre"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          >
            <option value="">Filter by Genre</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Biography">Biography</option>
            <option value="History">History</option>
            <option value="Poetry">Poetry</option>
            <option value="Science">Science</option>
            <option value="Technology">Technology</option>
            <option value="Action">Action</option>
          </select>
          <input
            type="search"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <i
            className="fas fa-sync-alt"
            onClick={() => {
              setSearch("");
            }}
          ></i>
        </div>
      </div>
      <div className="card-contain">
        {filteredBooks.slice(0, showMore).map((book) => (
          <div className="card-book" key={book._id}>
            <img src={book.bookImage} alt="book" />
            <h3>Title: {book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>{book.summary}</p>
            <p>ISBN: {book.ISBN}</p>
          </div>
        ))}
      </div>
      {showMore < filteredBooks.length && (
        <button
          id="show-button"
          className="show-more"
          onClick={() => setShowMore(showMore + 4)}
        >
          Show more
        </button>
      )}
    </>
  );
};

export default Books;
