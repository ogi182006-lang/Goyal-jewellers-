'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, MessageCircle } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import toast from 'react-hot-toast'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const image = product.images?.[0] || null

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: image,
    })
    toast.success(`${product.name} added to cart`, {
      icon: '✦',
    })
  }

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="bg-[#161616] border border-[#2A2A2A] overflow-hidden transition-all duration-400 group-hover:border-[#D4AF37]/40 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.07)]">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-[#1a1a1a]">
          {image ? (
            <Image
              src={image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-4xl text-[#2A2A2A]">✦</span>
            </div>
          )}
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
          {/* Quick actions */}
          <div className="absolute bottom-0 left-0 right-0 p-3 flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-[#D4AF37] text-[#0D0D0D] py-2 text-[10px] font-body font-700 tracking-widest uppercase hover:bg-[#F5D76E] transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingBag size={12} />
              Add to Cart
            </button>
            <a
              href={`https://wa.me/919928529683?text=Hi, I'm interested in: ${product.name} (₹${product.price?.toLocaleString('en-IN')})`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center w-9 bg-[#25D366] text-white hover:bg-[#20bf5b] transition-colors"
              aria-label="Order on WhatsApp"
            >
              <MessageCircle size={14} />
            </a>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-[9px] font-body font-600 tracking-[0.2em] uppercase text-[#D4AF37] mb-1">
            {product.categories?.name || product.metal_type || 'Jewellery'}
          </p>
          <h3 className="font-display text-lg font-medium text-white leading-snug line-clamp-2 mb-2 group-hover:text-[#F5D76E] transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="font-display text-xl font-semibold text-[#D4AF37]">
              ₹{product.price?.toLocaleString('en-IN')}
            </span>
            {product.weight && (
              <span className="text-[10px] font-body tracking-widest text-[#6B6B6B] uppercase">
                {product.weight}g
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
