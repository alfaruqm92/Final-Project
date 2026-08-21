import { useCart } from "../../contexts/CartContext";
import Icon from "../atoms/Icon";
import { useNavigate } from "react-router-dom";

function CartDrawer({ isOpen, onClose }) {
  const { cartItems, removeFromCart } = useCart();

  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price_per_day || 0),
    0
  );


  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-screen w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EAECF0] px-5 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FE7F2D]">
              Your Cart
            </p>

            <h2 className="mt-1 text-xl font-bold text-[#233D4D]">
              Rental Equipment
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#233D4D] transition hover:bg-[#EAECF0] hover:text-[#FE7F2D]"
            aria-label="Close cart"
          >
            <Icon name="close" size={22} />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {cartItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EAECF0] text-[#233D4D]/50">
                <Icon name="cart" size={28} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-[#233D4D]">
                Your cart is empty
              </h3>

              <p className="mt-2 max-w-xs text-sm leading-6 text-[#233D4D]/60">
                Add equipment to your cart before continuing to checkout.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="mt-6 rounded-xl bg-[#FE7F2D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#233D4D]"
              >
                Browse Equipment
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-2xl border border-[#EAECF0] bg-white p-3"
                >
                  {/* Image */}
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#EAECF0]">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={`${item.brand} ${item.model}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-[#233D4D]/40">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Information */}
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold text-[#233D4D]">
                      {item.brand} {item.model}
                    </h3>

                    <p className="mt-1 text-xs text-[#233D4D]/60">
                      {item.category?.name || "Equipment"}
                    </p>

                    <p className="mt-2 text-sm font-bold text-[#FE7F2D]">
                      Rp{" "}
                      {Number(item.price_per_day).toLocaleString("id-ID")}
                      <span className="font-normal text-[#233D4D]/50">
                        {" "}
                        / day
                      </span>
                    </p>
                  </div>

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#233D4D]/50 transition hover:bg-red-50 hover:text-red-500"
                    aria-label="Remove item"
                  >
                    <Icon name="close" size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-[#EAECF0] p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#233D4D]/60">
                {cartItems.length} item
                {cartItems.length > 1 ? "s" : ""}
              </span>

              <div className="text-right">
                <p className="text-xs text-[#233D4D]/50">
                  Estimated daily total
                </p>

                <p className="mt-1 text-lg font-bold text-[#233D4D]">
                  Rp {totalPrice.toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                navigate("/checkout");
              }}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FE7F2D] px-5 py-4 font-semibold text-white transition hover:bg-[#233D4D]"
            >
              Continue to Checkout
              <span>→</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

export default CartDrawer;