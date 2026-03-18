'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Upload, X, ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [categories, setCategories] = useState([])
  const [images, setImages] = useState([])
  const [form, setForm] = useState({
    name: '',
    category_id: '',
    price: '',
    weight: '',
    metal_type: '',
    making_charges: '',
    description: '',
  })

  useEffect(() => {
    const fetchCategories = async () => {
      const supabase = createClient()
      const { data } = await supabase.from('categories').select('id, name').order('name')
      setCategories(data || [])
    }
    fetchCategories()
  }, [])

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
        else toast.error(`Failed to upload ${file.name}`)
      }
      setImages((prev) => [...prev, ...uploadedUrls])
      if (uploadedUrls.length) toast.success(`${uploadedUrls.length} image(s) uploaded`)
    } catch {
      toast.error('Image upload failed')
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
    const { error } = await supabase.from('products').insert([{
      name: form.name,
      category_id: form.category_id || null,
      price: parseFloat(form.price),
      weight: form.weight ? parseFloat(form.weight) : null,
      metal_type: form.metal_type || null,
      making_charges: form.making_charges ? parseFloat(form.making_charges) : null,
      description: form.description || null,
      images,
    }])
    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Product added!')
      router.push('/admin/dashboard/products')
    }
    setLoading(false)
  }

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/dashboard/products" className="text-[#6B6B6B] hover:text-gold transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="font-display text-3xl font-light text-white">Add Product</h1>
          <p className="text-xs font-body tracking-widest text-[#6B6B6B] uppercase mt-1">New jewellery item</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Image Upload */}
        <div>
          <label className="text-[10px] font-body tracking-[0.2em] uppercase text-[#6B6B6B] block mb-2">
            Product Images
          </label>
          {images.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mb-3">
              {images.map((url, i) => (
                <div key={i} className="relative aspect-square bg-[#1E1E1E]">
                  <Image src={url} alt={`upload-${i}`} fill className="object-cover" sizes="100px" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 w-5 h-5 bg-black/70 flex items-center justify-center text-white hover:text-red-400"
                  >
                    <X size={10} />
                  </button>
                  {i === 0 && (
                    <span className="absolute bottom-0 left-0 right-0 bg-gold/80 text-[8px] font-body text-center text-[#0D0D0D] tracking-widest uppercase py-0.5">
                      Main
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
          <label className={`flex flex-col items-center justify-center border-2 border-dashed border-[#2A2A2A] p-8 cursor-pointer hover:border-gold/40 transition-colors ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
            {uploading ? (
              <Loader2 size={24} className="text-gold animate-spin mb-2" />
            ) : (
              <Upload size={24} className="text-[#6B6B6B] mb-2" />
            )}
            <span className="text-xs font-body tracking-widest uppercase text-[#6B6B6B]">
              {uploading ? 'Uploading...' : 'Click to upload images'}
            </span>
            <span className="text-[10px] font-body text-[#4A4A4A] mt-1">JPG, PNG, WEBP</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Name */}
        <div>
          <label className="text-[10px] font-body tracking-[0.2em] uppercase text-[#6B6B6B] block mb-1.5">
            Product Name *
          </label>
          <input name="name" value={form.name} onChange={handleChange} className="input-dark" placeholder="e.g. 22K Gold Kundan Necklace" required />
        </div>

        {/* Category */}
        <div>
          <label className="text-[10px] font-body tracking-[0.2em] uppercase text-[#6B6B6B] block mb-1.5">
            Category
          </label>
          <select name="category_id" value={form.category_id} onChange={handleChange} className="input-dark">
            <option value="">— Select Category —</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Price + Weight */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-body tracking-[0.2em] uppercase text-[#6B6B6B] block mb-1.5">
              Price (₹) *
            </label>
            <input name="price" type="number" step="0.01" min="0" value={form.price} onChange={handleChange} className="input-dark" placeholder="50000" required />
          </div>
          <div>
            <label className="text-[10px] font-body tracking-[0.2em] uppercase text-[#6B6B6B] block mb-1.5">
              Weight (g)
            </label>
            <input name="weight" type="number" step="0.01" min="0" value={form.weight} onChange={handleChange} className="input-dark" placeholder="12.5" />
          </div>
        </div>

        {/* Metal Type + Making Charges */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-body tracking-[0.2em] uppercase text-[#6B6B6B] block mb-1.5">
              Metal Type
            </label>
            <select name="metal_type" value={form.metal_type} onChange={handleChange} className="input-dark">
              <option value="">— Select —</option>
              <option value="Gold">Gold</option>
              <option value="Diamond">Diamond</option>
              <option value="Silver">Silver</option>
              <option value="Platinum">Platinum</option>
              <option value="Gold & Diamond">Gold &amp; Diamond</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-body tracking-[0.2em] uppercase text-[#6B6B6B] block mb-1.5">
              Making Charges (₹)
            </label>
            <input name="making_charges" type="number" step="0.01" min="0" value={form.making_charges} onChange={handleChange} className="input-dark" placeholder="2000" />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-[10px] font-body tracking-[0.2em] uppercase text-[#6B6B6B] block mb-1.5">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="input-dark resize-none"
            rows={4}
            placeholder="Describe this jewellery piece..."
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading || uploading}
            className="btn-gold-filled flex items-center gap-2 disabled:opacity-50"
          >
            {loading && <Loader2 size={14} className="animate-spin" />}
            {loading ? 'Saving...' : 'Save Product'}
          </button>
          <Link href="/admin/dashboard/products" className="btn-gold text-[10px]">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
