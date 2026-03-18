'use client'
import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('gj_cart')
    if (stored) {
      try { setCart(JSON.parse(stored)) } catch {}
    }
  }, [])

  const saveCart = (items) => {
    setCart(items)
    localStorage.setItem('gj_cart', JSON.stringify(items))
  }

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id)
      let updated
      if (exists) {
        updated = prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        )
      } else {
        updated = [...prev, { ...product, qty: 1 }]
      }
      localStorage.setItem('gj_cart', JSON.stringify(updated))
      return updated
    })
    setIsOpen(true)
  }

  const removeFromCart = (id) => {
    const updated = cart.filter((i) => i.id !== id)
    saveCart(updated)
  }

  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id)
    const updated = cart.map((i) => (i.id === id ? { ...i, qty } : i))
    saveCart(updated)
  }

  const clearCart = () => saveCart([])

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0)
  const count = cart.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, clearCart, total, count, isOpen, setIsOpen }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
