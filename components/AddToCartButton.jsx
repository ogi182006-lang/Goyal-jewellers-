'use client'
import { useCart } from '@/context/CartContext'
import { ShoppingBag, Check } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handle = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || null,
    })
    toast.success(`${product.name} added to cart ✦`)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button
      onClick={handle}
      className={`btn-gold-filled flex items-center justify-center gap-2 flex-1 transition-all duration-300 ${
        added ? 'bg-green-600 border-green-600 text-white' : ''
      }`}
    >
      {added ? <Check size={15} /> : <ShoppingBag size={15} />}
      {added ? 'Added!' : 'Add to Cart'}
    </button>
  )
}
