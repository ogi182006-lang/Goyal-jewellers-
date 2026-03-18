'use client'
import { useCart } from '@/context/CartContext'
import PublicLayout from '@/components/PublicLayout'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, Minus, Trash2, MessageCircle, ShoppingBag, ArrowLeft } from 'lucide-react'

export default function CartPage() {
  const { cart, removeFromCart, updateQty, total, clearCart } = useCart()

  const handleWhatsApp = () => {
    if (cart.length === 0) return
    const lines = cart
      .map((i) => `• ${i.name} x${i.qty} — ₹${(i.price * i.qty).toLocaleString('en-IN')}`)
      .join('\n')
    const msg = encodeURIComponent(
      `Hello Goyal Jewellers! I'd like to place an order:\n\n${lines}\n\n*Total: ₹${total.toLocaleString('en-IN')}*\n\nPlease confirm availability.`
    )
    window.open(`https://wa.me/919928529683?text=${msg}`, '_blank')
  }

  return (
    <PublicLayout>
      <div className="pt-24 md:pt-28 min-h-screen">
        {/* Header */}
        <div className="bg-[#0A0A0A] border-b border-[#2A2A2A]">
          <div className="max-w-5xl mx-auto px-5 py-10">
            <nav className="flex items-center gap-2 text-[10px] font-body tracking-widest uppercase text-[#6B6B6B] mb-4">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#BFBFBF]">Cart</span>
            </nav>
            <div className="flex items-center gap-3">
              <ShoppingBag size={20} className="text-gold" />
              <h1 className="font-display text-4xl font-light text-white">Your Cart</h1>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-5 py-12">
          {cart.length === 0 ? (
            <div className="text-center py-24 border border-[#2A2A2A]">
              <span className="font-display text-7xl text-[#2A2A2A]">✦</span>
              <p className="font-display text-3xl font-light text-[#4A4A4A] mt-4">Your cart is empty</p>
              <p className="text-xs font-body tracking-widest text-[#6B6B6B] uppercase mt-2 mb-8">
                Explore our jewellery collections
              </p>
              <Link href="/#categories" className="btn-gold text-[10px]">
                Browse Collections
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-5 bg-[#111111] border border-[#2A2A2A] p-4 hover:border-gold/20 transition-colors"
                  >
                    {/* Image */}
                    <Link href={`/product/${item.id}`} className="relative w-24 h-24 shrink-0 bg-[#1E1E1E]">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-display text-2xl text-[#2A2A2A]">✦</span>
                        </div>
                      )}
                    </Link>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${item.id}`} className="font-display text-lg text-white hover:text-gold transition-colors line-clamp-2 leading-snug">
                        {item.name}
                      </Link>
                      <p className="font-display text-gold mt-1">
                        ₹{item.price?.toLocaleString('en-IN')} each
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[#2A2A2A]">
                          <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-8 h-8 flex items-center justify-center text-[#BFBFBF] hover:text-gold hover:bg-[#1E1E1E] transition-colors">
                            <Minus size={11} />
                          </button>
                          <span className="w-10 text-center text-sm font-body font-600 text-white">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-8 h-8 flex items-center justify-center text-[#BFBFBF] hover:text-gold hover:bg-[#1E1E1E] transition-colors">
                            <Plus size={11} />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-display text-lg text-gold">
                            ₹{(item.price * item.qty).toLocaleString('en-IN')}
                          </span>
                          <button onClick={() => removeFromCart(item.id)} className="text-[#6B6B6B] hover:text-red-400 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={clearCart}
                  className="text-[10px] font-body tracking-widest uppercase text-[#6B6B6B] hover:text-red-400 transition-colors flex items-center gap-2"
                >
                  <Trash2 size={12} />
                  Clear cart
                </button>
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                <div className="bg-[#111111] border border-[#2A2A2A] p-6 sticky top-24">
                  <h2 className="text-[10px] font-body tracking-[0.3em] uppercase text-[#6B6B6B] mb-5">
                    Order Summary
                  </h2>
                  <div className="space-y-3 mb-5">
                    {cart.map((i) => (
                      <div key={i.id} className="flex justify-between">
                        <span className="text-xs font-body text-[#BFBFBF] line-clamp-1 flex-1 mr-2">{i.name} ×{i.qty}</span>
                        <span className="text-xs font-body text-white shrink-0">₹{(i.price * i.qty).toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-[#2A2A2A] pt-4 mb-6">
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-body tracking-widest uppercase text-[#BFBFBF]">Total</span>
                      <span className="font-display text-2xl text-gold">₹{total.toLocaleString('en-IN')}</span>
                    </div>
                    <p className="text-[9px] font-body text-[#6B6B6B] mt-1">Exclusive of any applicable taxes</p>
                  </div>
                  <button
                    onClick={handleWhatsApp}
                    className="w-full btn-gold-filled flex items-center justify-center gap-2 mb-3"
                  >
                    <MessageCircle size={15} />
                    Checkout via WhatsApp
                  </button>
                  <Link href="/#categories" className="w-full btn-gold flex items-center justify-center gap-2 text-[10px]">
                    <ArrowLeft size={13} />
                    Continue Shopping
                  </Link>
                  <p className="text-[9px] font-body tracking-widest text-[#6B6B6B] text-center mt-4 leading-relaxed">
                    Your order enquiry will be sent via WhatsApp to our team.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  )
}
