'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { ShoppingBag, Menu, X, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Collections', href: '/#categories' },
  { label: 'Products', href: '/#products' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
]

export default function Navbar() {
  const { count, setIsOpen } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#0D0D0D]/95 backdrop-blur-md border-b border-[#2A2A2A]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span className="font-display text-xl md:text-2xl font-semibold gold-shimmer tracking-wide">
              Goyal Jewellers
            </span>
            <span className="text-[9px] font-body tracking-[0.25em] text-[#BFBFBF] uppercase">
              Chomu, Rajasthan
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] font-body font-600 tracking-[0.15em] uppercase text-[#BFBFBF] hover:text-gold transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+919928529683"
              className="hidden lg:flex items-center gap-2 text-[11px] font-body tracking-widest text-[#BFBFBF] hover:text-gold transition-colors"
            >
              <Phone size={13} />
              <span>+91 99285 29683</span>
            </a>

            <button
              onClick={() => setIsOpen(true)}
              className="relative flex items-center justify-center w-10 h-10 text-[#BFBFBF] hover:text-gold transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag size={20} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold text-[#0D0D0D] text-[9px] font-bold flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>

            <button
              className="md:hidden text-[#BFBFBF] hover:text-gold transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#0D0D0D]/98 backdrop-blur-md flex flex-col pt-20 px-8"
          >
            <div className="gold-divider mb-8" />
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-4 text-2xl font-display font-light text-white hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <div className="gold-divider mt-8 mb-6" />
            <a
              href="tel:+919928529683"
              className="flex items-center gap-2 text-[11px] font-body tracking-widest text-[#BFBFBF]"
            >
              <Phone size={14} className="text-gold" />
              +91 99285 29683
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
