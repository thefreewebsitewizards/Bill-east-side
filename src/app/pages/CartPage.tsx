import { Link } from 'react-router-dom';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Button } from '@/app/components/ui/button';
import { useCart } from '@/app/hooks/useCart';

export default function CartPage() {
  const { items, subtotal, updateQuantity, updateBoardType, removeItem, clearCart } = useCart();
  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  const total = subtotal;

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-10 text-center">
            <h1 className="text-4xl mb-4" style={{ fontFamily: 'Merriweather, serif' }}>
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 mb-8">Find your next board and start your order.</p>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center bg-[#0C5A7D] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#0A4359] transition-all"
            >
              Browse Boards
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl" style={{ fontFamily: 'Merriweather, serif' }}>
                Your Cart
              </h1>
              <Button type="button" variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>

            <div className="space-y-4">
              {items.map((item) => {
                const unitPrice =
                  item.boardType === 'complete' ? item.completePrice : item.deckOnlyPrice;
                const lineTotal = unitPrice * item.quantity;
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col gap-6"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="relative h-40 w-full md:w-48 rounded-lg overflow-hidden bg-gray-100">
                        <ImageWithFallback
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-3">
                        <Link
                          to={`/product/${item.slug}`}
                          className="text-2xl hover:text-[#0C5A7D] transition-colors"
                          style={{ fontFamily: 'Merriweather, serif' }}
                        >
                          {item.name}
                        </Link>
                        <div className="flex flex-wrap items-center gap-4 text-gray-600">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-700">Board Type</span>
                            <select
                              value={item.boardType}
                              onChange={(event) =>
                                updateBoardType(item.id, event.target.value as 'complete' | 'deck')
                              }
                              className="border border-gray-200 rounded-md px-3 py-1 text-sm"
                            >
                              <option value="complete">
                                Complete ({formatter.format(item.completePrice)})
                              </option>
                              <option value="deck">
                                Deck Only ({formatter.format(item.deckOnlyPrice)})
                              </option>
                            </select>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-700">Quantity</span>
                            <div className="flex items-center border border-gray-200 rounded-md">
                              <button
                                type="button"
                                className="px-3 py-1 text-lg"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                -
                              </button>
                              <span className="px-3 py-1 text-sm">{item.quantity}</span>
                              <button
                                type="button"
                                className="px-3 py-1 text-lg"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex md:flex-col items-center md:items-end gap-4 md:gap-2">
                        <div className="text-xl font-semibold text-[#0C5A7D]">
                          {formatter.format(lineTotal)}
                        </div>
                        <button
                          type="button"
                          className="text-sm text-red-600 hover:text-red-700"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full lg:w-96">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
              <h2 className="text-2xl mb-6" style={{ fontFamily: 'Merriweather, serif' }}>
                Order Summary
              </h2>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">{formatter.format(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between text-lg">
                  <span>Total</span>
                  <span className="font-semibold">{formatter.format(total)}</span>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <Link
                  to="/custom"
                  className="w-full inline-flex items-center justify-center bg-[#0C5A7D] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0A4359] transition-all"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  to="/shop"
                  className="w-full inline-flex items-center justify-center border-2 border-[#0C5A7D] text-[#0C5A7D] px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
