import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./BookList.css";

function BookList() {
  const [books, setBooks] = useState([]);

  const deleteBook = (id) => {
    axios.delete("http://localhost:5000/books/" + id).then(() => {
      setBooks(books.filter((b) => b._id !== id));
    });
  };
  //fetch the books from
  useEffect(() => {
    axios
      .get("http://localhost:5000/books")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <div className="booklist-container">
      <h3>Book List</h3>
      <div className="book-card-container">
        {books.map((book) => (
          // fill the values
          <div className="book-card" key={book._id}>
            <div className="book-title">{book.title}</div>
            <div className="book-author">{book.author}</div>
            <div className="book-price">Price: ₹ {book.price}</div>
            <div className="book-actions">
              <Link to={`/edit/${book._id}`}>Edit</Link>
              {/* connect delete onClick handler */}
              <button onClick={() => deleteBook(book._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;
