import CategoriesManager from '@/components/admin/CategoriesManager'
import { createServerSupabaseClient } from '@/lib/supabaseServer'

export default async function AdminCategoriesPage() {
  const supabase = await createServerSupabaseClient()
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, slug, image_url')
    .order('name')

  return (
    <div className="p-6 md:p-8 max-w-xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-light text-white">Categories</h1>
        <p className="text-xs font-body tracking-widest text-[#6B6B6B] uppercase mt-1">
          Manage jewellery categories
        </p>
      </div>
      <CategoriesManager initialCategories={categories || []} />
    </div>
  )
}
