'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Upload, X, Loader2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function EditProductForm({ product, categories }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState(product.images || [])
  const [form, setForm] = useState({
    name: product.name || '',
    category_id: product.category_id || '',
    price: product.price || '',
    weight: product.weight || '',
    metal_type: product.metal_type || '',
    making_charges: product.making_charges || '',
    description: product.description || '',
  })

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (!files.length) return
    setUploading(true)
    try {
      const uploadedUrls = []
      for (const file of files) {
        const formData = new FormData()
        formData.append('file', file)
        const res = await fetch('/api/upload', { method: 'POST', body: formData })
        const data = await res.json()
        if (data.url) uploadedUrls.push(data.url)
      }
      setImages((prev) => [...prev, ...uploadedUrls])
      toast.success(`${uploadedUrls.length} image(s) uploaded`)
    } catch {
      toast.error('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (idx) => setImages((prev) => prev.filter((_, i) => i !== idx))

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.price) return toast.error('Name and price are required')
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.from('products').update({
      name: form.name,
      category_id: form.category_id || null,
      price: parseFloat(form.price),
      weight: form.weight ? parseFloat(form.weight) : null,
      metal_type: form.metal_type || null,
      making_charges: form.making_charges ? parseFloat(form.making_charges) : null,
      description: form.description || null,
      images,
    }).eq('id', product.id)

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Product updated!')
      router.push('/admin/dashboard/products')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Images */}
      <div>
        <label className="text-[10px] font-body tracking-[0.2em] uppercase text-[#6B6B6B] block mb-2">
          Product Images
        </label>
        {images.length > 0 && (
          <div className="grid grid-cols-4 gap-2 mb-3">
            {images.map((url, i) => (
              <div key={i} className="relative aspect-square bg-[#1E1E1E]">
                <Image src={url} alt="" fill className="object-cover" sizes="100px" />
                <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 w-5 h-5 bg-black/70 flex items-center justify-center text-white hover:text-red-400">
                  <X size={10} />
                </button>
                {i === 0 && (
                  <span className="absolute bottom-0 left-0 right-0 bg-gold/80 text-[8px] text-center text-[#0D0D0D] tracking-widest uppercase py-0.5">
                    Main
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
        <label className={`flex flex-col items-center justify-center border-2 border-dashed border-[#2A2A2A] p-6 cursor-pointer hover:border-gold/40 transition-colors ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
          {uploading ? <Loader2 size={20} className="text-gold animate-spin mb-2" /> : <Upload size={20} className="text-[#6B6B6B] mb-2" />}
          <span className="text-xs font-body tracking-widest uppercase text-[#6B6B6B]">
            {uploading ? 'Uploading...' : 'Add more images'}
          </span>
          <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
        </label>
      </div>

      <div>
        <label className="text-[10px] font-body tracking-[0.2em] uppercase text-[#6B6B6B] block mb-1.5">Name *</label>
        <input name="name" value={form.name} onChange={handleChange} className="input-dark" required />
      </div>

      <div>
        <label className="text-[10px] font-body tracking-[0.2em] uppercase text-[#6B6B6B] block mb-1.5">Category</label>
        <select name="category_id" value={form.category_id} onChange={handleChange} className="input-dark">
          <option value="">— None —</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] font-body tracking-[0.2em] uppercase text-[#6B6B6B] block mb-1.5">Price (₹) *</label>
          <input name="price" type="number" step="0.01" min="0" value={form.price} onChange={handleChange} className="input-dark" required />
        </div>
        <div>
          <label className="text-[10px] font-body tracking-[0.2em] uppercase text-[#6B6B6B] block mb-1.5">Weight (g)</label>
          <input name="weight" type="number" step="0.01" min="0" value={form.weight} onChange={handleChange} className="input-dark" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] font-body tracking-[0.2em] uppercase text-[#6B6B6B] block mb-1.5">Metal Type</label>
          <select name="metal_type" value={form.metal_type} onChange={handleChange} className="input-dark">
            <option value="">— None —</option>
            <option value="Gold">Gold</option>
            <option value="Diamond">Diamond</option>
            <option value="Silver">Silver</option>
            <option value="Platinum">Platinum</option>
            <option value="Gold & Diamond">Gold &amp; Diamond</option>
          </select>
        </div>
        <div>
          <label className="text-[10px] font-body tracking-[0.2em] uppercase text-[#6B6B6B] block mb-1.5">Making Charges (₹)</label>
          <input name="making_charges" type="number" step="0.01" min="0" value={form.making_charges} onChange={handleChange} className="input-dark" />
        </div>
      </div>

      <div>
        <label className="text-[10px] font-body tracking-[0.2em] uppercase text-[#6B6B6B] block mb-1.5">Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} className="input-dark resize-none" rows={4} />
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading || uploading} className="btn-gold-filled flex items-center gap-2 disabled:opacity-50">
          {loading && <Loader2 size={14} className="animate-spin" />}
          {loading ? 'Saving...' : 'Update Product'}
        </button>
        <Link href="/admin/dashboard/products" className="btn-gold text-[10px]">Cancel</Link>
      </div>
    </form>
  )
}
