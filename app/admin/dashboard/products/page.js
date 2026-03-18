import { createServerSupabaseClient } from '@/lib/supabaseServer'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Pencil } from 'lucide-react'
import DeleteProductButton from '@/components/admin/DeleteProductButton'

export default async function AdminProductsPage() {
  const supabase = await createServerSupabaseClient()
  const { data: products } = await supabase
    .from('products')
    .select('*, categories(name)')
    .order('created_at', { ascending: false })

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-light text-white">Products</h1>
          <p className="text-xs font-body tracking-widest text-[#6B6B6B] uppercase mt-1">
            {products?.length || 0} total products
          </p>
        </div>
        <Link href="/admin/dashboard/products/new" className="btn-gold-filled flex items-center gap-2 text-[10px]">
          <Plus size={14} />
          Add Product
        </Link>
      </div>

      {!products || products.length === 0 ? (
        <div className="border border-[#2A2A2A] py-20 text-center">
          <span className="font-display text-5xl text-[#2A2A2A]">✦</span>
          <p className="font-display text-xl text-[#4A4A4A] mt-3">No products yet</p>
          <Link href="/admin/dashboard/products/new" className="btn-gold mt-6 inline-flex items-center gap-2 text-[10px]">
            <Plus size={12} /> Add First Product
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {products.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-4 bg-[#111111] border border-[#2A2A2A] p-4 hover:border-gold/20 transition-colors"
            >
              {/* Thumbnail */}
              <div className="relative w-16 h-16 shrink-0 bg-[#1E1E1E]">
                {p.images?.[0] ? (
                  <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="64px" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-xl text-[#3A3A3A]">✦</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-display text-base text-white leading-snug line-clamp-1">{p.name}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] font-body tracking-widest text-gold uppercase">
                    {p.categories?.name || '—'}
                  </span>
                  <span className="text-[10px] font-body text-[#6B6B6B]">·</span>
                  <span className="text-[10px] font-body text-[#BFBFBF]">
                    ₹{p.price?.toLocaleString('en-IN')}
                  </span>
                  {p.metal_type && (
                    <>
                      <span className="text-[10px] font-body text-[#6B6B6B]">·</span>
                      <span className="text-[10px] font-body text-[#6B6B6B]">{p.metal_type}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/admin/dashboard/products/${p.id}/edit`}
                  className="w-8 h-8 border border-[#2A2A2A] flex items-center justify-center text-[#BFBFBF] hover:text-gold hover:border-gold/40 transition-colors"
                >
                  <Pencil size={13} />
                </Link>
                <DeleteProductButton id={p.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
