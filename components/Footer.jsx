import Link from 'next/link'
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#080808] border-t border-[#1E1E1E]">
      {/* Top Gold Line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="max-w-7xl mx-auto px-5 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <h3 className="font-display text-3xl font-semibold gold-shimmer mb-2">Goyal Jewellers</h3>
          <p className="text-[10px] font-body tracking-[0.3em] text-[#6B6B6B] uppercase mb-5">
            Est. in Chomu, Rajasthan
          </p>
          <p className="text-sm font-body text-[#BFBFBF] leading-relaxed">
            Crafting timeless elegance with exquisite gold and diamond jewellery.
            Trusted by generations of families in Chomu and beyond.
          </p>
          <a
            href="https://wa.me/919928529683"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 btn-gold-filled text-[10px]"
          >
            <MessageCircle size={14} />
            Order on WhatsApp
          </a>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-[10px] font-body font-700 tracking-[0.25em] uppercase text-gold mb-6">
            Quick Links
          </h4>
          <ul className="space-y-3">
            {[
              { label: 'Home', href: '/' },
              { label: 'All Collections', href: '/#categories' },
              { label: 'Gold Jewellery', href: '/category/gold-jewellery' },
              { label: 'Diamond Jewellery', href: '/category/diamond-jewellery' },
              { label: 'Bridal Sets', href: '/category/bridal-jewellery' },
              { label: 'Cart', href: '/cart' },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-xs font-body tracking-widest text-[#BFBFBF] hover:text-gold transition-colors uppercase"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[10px] font-body font-700 tracking-[0.25em] uppercase text-gold mb-6">
            Visit Us
          </h4>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
              <span className="text-xs font-body text-[#BFBFBF] leading-relaxed">
                Naya Bajar, Chomu<br />Rajasthan 303702, India
              </span>
            </li>
            <li className="flex gap-3">
              <Phone size={16} className="text-gold mt-0.5 shrink-0" />
              <a href="tel:+919928529683" className="text-xs font-body text-[#BFBFBF] hover:text-gold transition-colors">
                +91 99285 29683
              </a>
            </li>
            <li className="flex gap-3">
              <Clock size={16} className="text-gold mt-0.5 shrink-0" />
              <span className="text-xs font-body text-[#BFBFBF]">
                Monday – Sunday<br />10:30 AM – 07:30 PM
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="gold-divider" />
      <div className="max-w-7xl mx-auto px-5 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-[10px] font-body tracking-widest text-[#6B6B6B] uppercase">
          © {year} Goyal Jewellers. All rights reserved.
        </p>
        <p className="text-[10px] font-body tracking-widest text-[#6B6B6B] uppercase">
          Naya Bajar, Chomu, Rajasthan 303702
        </p>
      </div>
    </footer>
  )
}
