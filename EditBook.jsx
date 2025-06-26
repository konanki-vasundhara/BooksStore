import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    price: "",
  });

  //Get the book details and setBook
  useEffect(() => {
    axios.get("http://localhost:5000/books/" + id).then((res) => {
      setBook(res.data);
    });
  }, [id]);

  function handleChange(e) {
    const newBook = { ...book };
    newBook[e.target.name] = e.target.value;
    setBook(newBook);
  }

  //write handleSubmit function
  function handleSubmit(e) {
    e.preventDefault();
    axios.put("http://localhost:5000/books/" + id, book).then(() => {
      alert("Book updated");
      navigate("/");
    });
  }
  return (
    // connect handleSubmit
    <form onSubmit={handleSubmit}>
      <h3>Edit Book</h3>
      <input
        name="title"
        value={book.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <br />
      <br />
      <input
        name="author"
        value={book.author}
        onChange={handleChange}
        placeholder="Author"
      />{" "}
      <br />
      <br />
      <input
        name="price"
        value={book.price}
        onChange={handleChange}
        placeholder="Price"
        type="number"
      />
      <br />
      <br />
      <button>Update Book</button>
    </form>
  );
}

export default EditBook;
