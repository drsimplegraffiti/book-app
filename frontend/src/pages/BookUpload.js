import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormData from "form-data";
import { useAuthContext } from "../hooks/useAuthContext";

const BookUpload = () => {
  const { user, dispatch } = useAuthContext();

  const [title, setTitle] = useState("");
  const [numberOfPages, setNumberOfPages] = useState("");
  const [ISBN, setISBN] = useState("");
  const [author, setAuthor] = useState("");
  const [summary, setSummary] = useState("");
  const [price, setPrice] = useState("");
  const [genre, setGenre] = useState("");
  const [bookUrl, setBookUrl] = useState("");
  const [bookImage, setBookImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const bookData = new FormData();
    bookData.append("title", title);
    bookData.append("numberOfPages", numberOfPages);
    bookData.append("ISBN", ISBN);
    bookData.append("author", author);
    bookData.append("summary", summary);
    bookData.append("price", price);
    bookData.append("genre", genre);
    bookData.append("bookUrl", bookUrl);
    bookData.append("image", bookImage);


    try {
      // if (!user) {
      //   navigate("/login");
      // }

      const response = await fetch("http://localhost:5678/api/books", {
        method: "POST",
        body: bookData,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        setLoading(false);
      } else {
        setLoading(false);
        navigate("/");
      }

      if (response.ok) {
        dispatch({ type: "ADD_BOOK", payload: data });
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="upload-container">
        <Link to="/"></Link>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="numberOfPages">Number of Pages</label>
              <input
                type="number"
                id="numberOfPages"
                className="form-control"
                value={numberOfPages}
                onChange={(e) => setNumberOfPages(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="ISBN">ISBN</label>
              <input
                type="text"
                id="ISBN"
                className="form-control"
                value={ISBN}
                onChange={(e) => setISBN(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                id="author"
                className="form-control"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="summary">Summary</label>
              <input
                type="text"
                className="form-control"
                id="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price ($)</label>
              <input
                type="number"
                id="price"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="genre">Genre</label>
              <select
                className="form-control"
                id="genre"
                name="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              >
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Biography">Biography</option>
                <option value="History">History</option>
                <option value="Poetry">Poetry</option>
                <option value="Science">Science</option>
                <option value="Technology">Technology</option>
                <option value="Self-Help">Self-Help</option>
                <option value="Travel">Travel</option>
                <option value="Children">Children</option>
                <option value="Religion">Religion</option>
                <option value="Spirituality">Spirituality</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="bookUrl">Book URL</label>
              <input
                type="text"
                id="bookUrl"
                className="form-control"
                value={bookUrl}
                onChange={(e) => setBookUrl(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bookImage">Book Image</label>
              <input
                type="file"
                className="form-control"
                id="bookImage"
                onChange={(e) => setBookImage(e.target.files[0])}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              {loading ? "Loading..." : "Upload"}
            </button>
          </form>
        </div>
        {loading && <p>Loading...</p>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}{" "}
        <Link to="/" className="back-home">
          Back
        </Link>
      </div>
    </>
  );
};

export default BookUpload;
