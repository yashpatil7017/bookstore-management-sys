import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";

function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  // ⭐ pagination states
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { addToCart, cart } = useCart();


  // ================= FETCH BOOKS WITH PAGINATION =================
  const fetchBooks = async (pageNo = 1) => {
    try {
      const res = await api.get(`/books?page=${pageNo}&limit=8`);

      setBooks(res.data.books);          // backend sends books array
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log(err);
    }
  };


  // fetch whenever page changes
  useEffect(() => {
    fetchBooks(page);
  }, [page]);


  // ================= SEARCH =================
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="container app-container" style={{ paddingTop: 28, paddingBottom: 48 }}>

      {/* Top bar */}
      <div className="topbar mb-4">
        <div>
          <h2 className="brand-title mb-1">
            <span className="logo">
              <span className="logo-icon" aria-hidden="true">📚</span>
              <span className="logo-title">BookStore</span>
            </span>
          </h2>
          <div className="subtitle">Find your next read in seconds.</div>
        </div>

        <div className="d-flex align-items-center gap-3">
          <Link to="/cart" className="btn btn-outline-success btn-pill">
            <span aria-hidden="true">🛒</span> Cart{" "}
            <span className="ms-1">({cart.length})</span>
          </Link>

          <Link to="/login" className="btn btn-brand btn-pill">
            Admin
          </Link>
        </div>
      </div>


      {/* Search */}
      <input
        className="form-control app-input search-input mb-4"
        placeholder="Search by title or author..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />


      {/* Books Grid */}
      <div className="row g-4">
        {filteredBooks.map((book) => (
          <div key={book._id} className="col-md-3">
            <div className="book-card p-3 h-100 d-flex flex-column gap-2">
              <div className="book-cover" aria-hidden="true" />

              <div className="mt-1">
                <div className="book-title">{book.title}</div>
                <div className="book-author">{book.author}</div>
              </div>

              <div className="d-flex align-items-center justify-content-between mt-auto pt-2">
                <div className="book-price">₹{book.price}</div>

                <button
                  type="button"
                  className="btn btn-brand icon-btn"
                  onClick={() => addToCart(book)}
                  aria-label={`Add ${book.title} to cart`}
                  title="Add to Cart"
                >
                  🛒+
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>


      {/* ================= PAGINATION UI ================= */}
      <div className="d-flex justify-content-center mt-4 gap-3">

        <button
          className="btn btn-outline-secondary btn-pill"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span className="align-self-center pagination-chip">
          Page {page} of {totalPages}
        </span>

        <button
          className="btn btn-outline-secondary btn-pill"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>

      </div>

    </div>
  );
}

export default Books;
