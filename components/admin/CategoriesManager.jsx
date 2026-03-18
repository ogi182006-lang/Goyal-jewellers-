'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { Plus, Trash2, Loader2 } from 'lucide-react'

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export default function CategoriesManager({ initialCategories }) {
  const [categories, setCategories] = useState(initialCategories)
  const [name, setName] = useState('')
  const [adding, setAdding] = useState(false)
  const [deleting, setDeleting] = useState(null)

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!name.trim()) return
    setAdding(true)
    const supabase = createClient()
    const slug = slugify(name)
    const { data, error } = await supabase
      .from('categories')
      .insert([{ name: name.trim(), slug }])
      .select()
      .single()
    if (error) {
      toast.error(error.message)
    } else {
      setCategories((prev) => [...prev, data].sort((a, b) => a.name.localeCompare(b.name)))
      setName('')
      toast.success(`Category "${data.name}" added`)
    }
    setAdding(false)
  }

  const handleDelete = async (id, catName) => {
    if (!confirm(`Delete category "${catName}"? Products in this category won't be deleted.`)) return
    setDeleting(id)
    const supabase = createClient()
    const { error } = await supabase.from('categories').delete().eq('id', id)
    if (error) {
      toast.error(error.message)
    } else {
      setCategories((prev) => prev.filter((c) => c.id !== id))
      toast.success('Category deleted')
    }
    setDeleting(null)
  }

  return (
    <div className="space-y-6">
      {/* Add form */}
      <form onSubmit={handleAdd} className="flex gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-dark flex-1"
          placeholder="e.g. Gold Jewellery"
          required
        />
        <button
          type="submit"
          disabled={adding}
          className="btn-gold-filled flex items-center gap-2 whitespace-nowrap disabled:opacity-50"
        >
          {adding ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
          Add
        </button>
      </form>

      {/* List */}
      {categories.length === 0 ? (
        <div className="border border-[#2A2A2A] py-12 text-center">
          <p className="font-display text-xl text-[#4A4A4A]">No categories yet</p>
          <p className="text-[10px] font-body text-[#6B6B6B] uppercase tracking-widest mt-1">
            Add your first category above
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          {categories.map((c) => (
            <li
              key={c.id}
              className="flex items-center justify-between bg-[#111111] border border-[#2A2A2A] px-4 py-3 hover:border-gold/20 transition-colors"
            >
              <div>
                <p className="font-body text-sm text-white">{c.name}</p>
                <p className="text-[10px] font-body text-[#6B6B6B] tracking-widest">/category/{c.slug}</p>
              </div>
              <button
                onClick={() => handleDelete(c.id, c.name)}
                disabled={deleting === c.id}
                className="text-[#6B6B6B] hover:text-red-400 transition-colors disabled:opacity-50"
              >
                {deleting === c.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
