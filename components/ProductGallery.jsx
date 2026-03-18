'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function ProductGallery({ images, name }) {
  const [active, setActive] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-[#161616] border border-[#2A2A2A] flex items-center justify-center">
        <span className="font-display text-8xl text-[#2A2A2A]">✦</span>
      </div>
    )
  }

  const prev = () => setActive((a) => (a - 1 + images.length) % images.length)
  const next = () => setActive((a) => (a + 1) % images.length)

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-square bg-[#161616] border border-[#2A2A2A] overflow-hidden group">
        <Image
          src={images[active]}
          alt={`${name} – image ${active + 1}`}
          fill
          className="object-cover transition-all duration-500"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 backdrop-blur-sm border border-[#2A2A2A] flex items-center justify-center text-white hover:border-gold/40 hover:text-gold transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 backdrop-blur-sm border border-[#2A2A2A] flex items-center justify-center text-white hover:border-gold/40 hover:text-gold transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronRight size={16} />
            </button>
            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === active ? 'bg-gold w-4' : 'bg-white/40'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative aspect-square bg-[#161616] border overflow-hidden transition-all ${
                i === active ? 'border-gold' : 'border-[#2A2A2A] hover:border-[#4A4A4A]'
              }`}
            >
              <Image src={img} alt={`${name} thumbnail ${i + 1}`} fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
