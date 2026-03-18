import EditProductForm from '@/components/admin/EditProductForm'
import { createServerSupabaseClient } from '@/lib/supabaseServer'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function EditProductPage({ params }) {
  const supabase = await createServerSupabaseClient()
  const [{ data: product }, { data: categories }] = await Promise.all([
    supabase.from('products').select('*').eq('id', params.id).single(),
    supabase.from('categories').select('id,name').order('name'),
  ])

  if (!product) notFound()

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/dashboard/products" className="text-[#6B6B6B] hover:text-gold transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="font-display text-3xl font-light text-white">Edit Product</h1>
          <p className="text-xs font-body tracking-widest text-[#6B6B6B] uppercase mt-1 line-clamp-1">
            {product.name}
          </p>
        </div>
      </div>
      <EditProductForm product={product} categories={categories || []} />
    </div>
  )
}
