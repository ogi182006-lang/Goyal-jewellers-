'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/context/CartContext'
import { X, Plus, Minus, ShoppingBag, MessageCircle, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function CartDrawer() {
  const { cart, removeFromCart, updateQty, total, count, isOpen, setIsOpen, clearCart } = useCart()

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return
    const itemLines = cart
      .map((i) => `• ${i.name} x${i.qty} — ₹${(i.price * i.qty).toLocaleString('en-IN')}`)
      .join('\n')
    const message = encodeURIComponent(
      `Hello Goyal Jewellers! I'd like to place an order:\n\n${itemLines}\n\n*Total: ₹${total.toLocaleString('en-IN')}*\n\nPlease confirm availability.`
    )
    window.open(`https://wa.me/919928529683?text=${message}`, '_blank')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-[#111111] border-l border-[#2A2A2A] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#2A2A2A]">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-gold" />
                <h2 className="font-body text-sm font-600 tracking-[0.2em] uppercase text-white">
                  Your Cart
                </h2>
                {count > 0 && (
                  <span className="text-[10px] font-body tracking-widest bg-gold/10 text-gold border border-gold/30 px-2 py-0.5 rounded-full">
                    {count} item{count !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#6B6B6B] hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
                  <span className="font-display text-6xl text-[#2A2A2A]">✦</span>
                  <p className="font-display text-2xl text-[#4A4A4A] font-light">Your cart is empty</p>
                  <p className="text-xs font-body tracking-widest text-[#6B6B6B] uppercase">
                    Explore our collections
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="btn-gold mt-2 text-[10px]"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-[#1E1E1E]">
                  {cart.map((item) => (
                    <li key={item.id} className="flex gap-4 p-5">
                      {/* Image */}
                      <div className="relative w-20 h-20 shrink-0 bg-[#1E1E1E] border border-[#2A2A2A]">
                        {item.image ? (
                          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[#2A2A2A] font-display text-xl">✦</span>
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/product/${item.id}`}
                          onClick={() => setIsOpen(false)}
                          className="font-display text-base font-medium text-white hover:text-gold transition-colors line-clamp-2 leading-snug"
                        >
                          {item.name}
                        </Link>
                        <p className="font-display text-gold text-sm mt-1">
                          ₹{item.price?.toLocaleString('en-IN')}
                        </p>

                        {/* Qty + Delete */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-[#2A2A2A]">
                            <button
                              onClick={() => updateQty(item.id, item.qty - 1)}
                              className="w-7 h-7 flex items-center justify-center text-[#BFBFBF] hover:text-gold hover:bg-[#1E1E1E] transition-colors"
                            >
                              <Minus size={11} />
                            </button>
                            <span className="w-8 text-center text-xs font-body font-600 text-white">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateQty(item.id, item.qty + 1)}
                              className="w-7 h-7 flex items-center justify-center text-[#BFBFBF] hover:text-gold hover:bg-[#1E1E1E] transition-colors"
                            >
                              <Plus size={11} />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-body text-[#BFBFBF]">
                              ₹{(item.price * item.qty).toLocaleString('en-IN')}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-[#6B6B6B] hover:text-red-400 transition-colors ml-2"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-[#2A2A2A] px-6 py-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-body tracking-widest uppercase text-[#BFBFBF]">Total</span>
                  <span className="font-display text-2xl font-semibold text-gold">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full btn-gold-filled flex items-center justify-center gap-2"
                >
                  <MessageCircle size={15} />
                  Checkout via WhatsApp
                </button>
                <Link
                  href="/cart"
                  onClick={() => setIsOpen(false)}
                  className="w-full btn-gold flex items-center justify-center gap-2 text-[10px]"
                >
                  View Full Cart
                </Link>
                <button
                  onClick={clearCart}
                  className="w-full text-[10px] font-body tracking-widest uppercase text-[#6B6B6B] hover:text-red-400 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
