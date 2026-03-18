import Link from 'next/link'
import Image from 'next/image'

export default function CategoryCard({ category }) {
  const image = category.image_url || null

  return (
    <Link href={`/category/${category.slug}`} className="group relative block aspect-[3/4] overflow-hidden bg-[#161616] border border-[#2A2A2A] hover:border-gold/40 transition-all duration-500">
      {image ? (
        <Image
          src={image}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[#161616]">
          <span className="font-display text-5xl text-[#2A2A2A]">✦</span>
        </div>
      )}
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/90 via-[#0D0D0D]/20 to-transparent" />
      {/* Gold line bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="font-display text-xl md:text-2xl font-semibold text-white group-hover:text-[#F5D76E] transition-colors">
          {category.name}
        </h3>
        <p className="text-[10px] font-body tracking-[0.2em] uppercase text-[#D4AF37] mt-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
          Explore Collection
          <span className="text-lg">→</span>
        </p>
      </div>
    </Link>
  )
}
