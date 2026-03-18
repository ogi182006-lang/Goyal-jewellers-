import { notFound } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabaseServer'
import PublicLayout from '@/components/PublicLayout'
import ProductGallery from '@/components/ProductGallery'
import AddToCartButton from '@/components/AddToCartButton'
import Link from 'next/link'
import { MessageCircle, Tag, Weight, Gem, Coins, ArrowLeft } from 'lucide-react'

export async function generateMetadata({ params }) {
  const supabase = await createServerSupabaseClient()
  const { data: product } = await supabase
    .from('products')
    .select('name, description, images')
    .eq('id', params.id)
    .single()
  if (!product) return { title: 'Product – Goyal Jewellers' }
  return {
    title: `${product.name} – Goyal Jewellers`,
    description: product.description || `Buy ${product.name} at Goyal Jewellers, Chomu, Rajasthan.`,
    openGraph: {
      images: product.images?.[0] ? [{ url: product.images[0] }] : [],
    },
  }
}

export default async function ProductPage({ params }) {
  const supabase = await createServerSupabaseClient()
  const { data: product } = await supabase
    .from('products')
    .select('*, categories(name, slug)')
    .eq('id', params.id)
    .single()

  if (!product) notFound()

  const waMessage = encodeURIComponent(
    `Hello! I'm interested in: ${product.name}\nPrice: ₹${product.price?.toLocaleString('en-IN')}\n\nPlease share more details.`
  )

  const specs = [
    { icon: <Tag size={14} />, label: 'Category', value: product.categories?.name },
    { icon: <Coins size={14} />, label: 'Price', value: `₹${product.price?.toLocaleString('en-IN')}` },
    { icon: <Weight size={14} />, label: 'Weight', value: product.weight ? `${product.weight}g` : null },
    { icon: <Gem size={14} />, label: 'Metal Type', value: product.metal_type },
    { icon: <Coins size={14} />, label: 'Making Charges', value: product.making_charges ? `₹${product.making_charges?.toLocaleString('en-IN')}` : null },
  ].filter((s) => s.value)

  return (
    <PublicLayout>
      <div className="pt-20 md:pt-24 min-h-screen">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-5 pt-8 pb-4">
          <nav className="flex items-center gap-2 text-[10px] font-body tracking-widest uppercase text-[#6B6B6B]">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            {product.categories && (
              <>
                <Link href={`/category/${product.categories.slug}`} className="hover:text-gold transition-colors">
                  {product.categories.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-[#BFBFBF] line-clamp-1">{product.name}</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-5 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Gallery */}
            <ProductGallery images={product.images || []} name={product.name} />

            {/* Details */}
            <div className="lg:py-4">
              {product.categories && (
                <Link
                  href={`/category/${product.categories.slug}`}
                  className="inline-flex text-[10px] font-body tracking-[0.25em] uppercase text-gold hover:text-gold-light transition-colors mb-4"
                >
                  {product.categories.name}
                </Link>
              )}

              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight mb-4">
                {product.name}
              </h1>

              <div className="flex items-end gap-3 mb-8">
                <span className="font-display text-4xl font-semibold text-gold">
                  ₹{product.price?.toLocaleString('en-IN')}
                </span>
                {product.making_charges && (
                  <span className="text-xs font-body text-[#6B6B6B] tracking-widest mb-1">
                    + ₹{product.making_charges?.toLocaleString('en-IN')} making
                  </span>
                )}
              </div>

              <div className="h-px bg-gradient-to-r from-gold/40 via-gold/20 to-transparent mb-8" />

              {/* Specs grid */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {specs.map((s) => (
                  <div key={s.label} className="bg-[#161616] border border-[#2A2A2A] p-3">
                    <div className="flex items-center gap-2 text-[#6B6B6B] mb-1">
                      {s.icon}
                      <span className="text-[9px] font-body tracking-[0.2em] uppercase">{s.label}</span>
                    </div>
                    <p className="text-sm font-body font-600 text-white">{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              {product.description && (
                <div className="mb-8">
                  <p className="text-[10px] font-body tracking-[0.2em] uppercase text-[#6B6B6B] mb-2">Description</p>
                  <p className="text-sm font-body text-[#BFBFBF] leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <AddToCartButton product={product} />
                <a
                  href={`https://wa.me/919928529683?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold flex items-center justify-center gap-2 flex-1"
                >
                  <MessageCircle size={15} />
                  Order on WhatsApp
                </a>
              </div>

              <div className="mt-6 p-4 bg-[#111111] border border-[#2A2A2A]">
                <p className="text-[10px] font-body tracking-widest uppercase text-[#6B6B6B] text-center">
                  📍 Goyal Jewellers · Naya Bajar, Chomu, Rajasthan · Open 10:30 AM – 07:30 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
