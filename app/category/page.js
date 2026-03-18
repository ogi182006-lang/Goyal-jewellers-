import { notFound } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabaseServer'
import PublicLayout from '@/components/PublicLayout'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'

export async function generateMetadata({ params }) {
  const supabase = await createServerSupabaseClient()
  if (params.slug === 'all') {
    return {
      title: 'All Products – Goyal Jewellers',
      description: 'Browse our complete collection of gold and diamond jewellery at Goyal Jewellers, Chomu, Rajasthan.',
    }
  }
  const { data: cat } = await supabase
    .from('categories')
    .select('name')
    .eq('slug', params.slug)
    .single()
  if (!cat) return { title: 'Collection – Goyal Jewellers' }
  return {
    title: `${cat.name} – Goyal Jewellers`,
    description: `Explore our ${cat.name} collection at Goyal Jewellers, Chomu, Rajasthan. Exquisite handcrafted pieces for every occasion.`,
  }
}

async function getCategoryData(slug) {
  const supabase = await createServerSupabaseClient()

  if (slug === 'all') {
    const { data: products } = await supabase
      .from('products')
      .select('*, categories(name,slug)')
      .order('created_at', { ascending: false })
    return { category: { name: 'All Products', slug: 'all' }, products: products || [] }
  }

  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!category) return null

  const { data: products } = await supabase
    .from('products')
    .select('*, categories(name,slug)')
    .eq('category_id', category.id)
    .order('created_at', { ascending: false })

  return { category, products: products || [] }
}

export default async function CategoryPage({ params }) {
  const data = await getCategoryData(params.slug)
  if (!data) notFound()

  const { category, products } = data

  return (
    <PublicLayout>
      <div className="pt-24 md:pt-28">
        {/* Breadcrumb + Header */}
        <div className="bg-[#0A0A0A] border-b border-[#2A2A2A]">
          <div className="max-w-7xl mx-auto px-5 py-10">
            <nav className="flex items-center gap-2 text-[10px] font-body tracking-widest uppercase text-[#6B6B6B] mb-6">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span>/</span>
              <Link href="/#categories" className="hover:text-gold transition-colors">Collections</Link>
              <span>/</span>
              <span className="text-[#BFBFBF]">{category.name}</span>
            </nav>
            <h1 className="font-display text-4xl md:text-6xl font-light text-white mb-2">
              {category.name}
            </h1>
            <p className="text-[10px] font-body tracking-widest uppercase text-[#6B6B6B]">
              {products.length} product{products.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Products grid */}
        <div className="max-w-7xl mx-auto px-5 py-14">
          {products.length === 0 ? (
            <div className="text-center py-24 border border-[#2A2A2A]">
              <span className="font-display text-7xl text-[#2A2A2A]">✦</span>
              <p className="font-display text-3xl font-light text-[#4A4A4A] mt-4">
                No products available yet.
              </p>
              <p className="text-xs font-body tracking-widest text-[#6B6B6B] uppercase mt-2 mb-8">
                This collection is coming soon.
              </p>
              <Link href="/" className="btn-gold text-[10px]">
                Back to Home
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  )
}
