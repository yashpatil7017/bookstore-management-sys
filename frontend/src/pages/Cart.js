import { useCart } from "../context/CartContext";
import api from "../services/api";

function Cart() {
  const { cart, incrementQty, decrementQty, removeFromCart, totalPrice } =
    useCart();

  const checkout = async () => {
    try {
      await api.post("/orders", {
        items: cart,
        totalPrice,
      });

      alert("Order placed successfully 🎉");

      window.location.href = "/";
    } catch (err) {
      alert("Login required to checkout");
    }
  };

  return (
    <div className="container app-container mt-5">

      <div className="d-flex align-items-end justify-content-between gap-3 mb-3">
        <div>
          <h2 className="brand-title mb-1">🛒 Your Cart</h2>
          <div className="text-secondary">
            {cart.length === 0 ? "No items yet" : `${cart.length} item(s)`}
          </div>
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="p-4 rounded-4 bg-white border">
          <div className="fw-semibold mb-1">Your cart is empty.</div>
          <div className="text-secondary">Add a few books to get started.</div>
        </div>
      ) : (
        <>
          <div className="row g-4 mt-1">
            <div className="col-lg-8">
              <div className="d-flex flex-column gap-3">
                {cart.map((item) => (
                  <div key={item._id} className="cart-item p-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="thumb" aria-hidden="true" />

                      <div className="flex-grow-1">
                        <div className="fw-bold">{item.title}</div>
                        <div className="text-secondary small">
                          ₹{item.price} each
                        </div>
                      </div>

                      <div className="d-flex flex-column align-items-end gap-2">
                        <div className="qty-control">
                          <button
                            type="button"
                            className="qty-btn"
                            onClick={() => decrementQty(item._id)}
                            aria-label={`Decrease quantity of ${item.title}`}
                          >
                            –
                          </button>
                          <div className="qty-num">{item.qty}</div>
                          <button
                            type="button"
                            className="qty-btn"
                            onClick={() => incrementQty(item._id)}
                            aria-label={`Increase quantity of ${item.title}`}
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => removeFromCart(item._id)}
                        >
                          Remove
                        </button>
                      </div>

                      <div className="text-end" style={{ minWidth: 110 }}>
                        <div className="fw-bold">₹{item.price * item.qty}</div>
                        <div className="text-secondary small">Item total</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="total-card p-4 position-sticky" style={{ top: 24 }}>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="fw-semibold">Total</div>
                  <div className="total-amount">₹{totalPrice}</div>
                </div>

                <div className="text-secondary small mt-2">
                  Taxes and shipping (if any) are calculated at checkout.
                </div>

                <button
                  className="btn btn-brand btn-pill w-100 mt-3"
                  onClick={checkout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
