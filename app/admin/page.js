'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { Eye, EyeOff, Lock } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) return toast.error('Please fill in all fields')
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      toast.error(error.message)
      setLoading(false)
    } else {
      toast.success('Welcome back!')
      // Force hard redirect instead of soft navigation
      setTimeout(() => {
        window.location.href = '/admin/dashboard'
      }, 800)
    }
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(212,175,55,0.04)_0%,transparent_70%)]" />

      <div className="relative w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl font-semibold gold-shimmer">Goyal Jewellers</h1>
          <p className="text-[10px] font-body tracking-[0.35em] uppercase text-[#6B6B6B] mt-2">
            Admin Panel
          </p>
        </div>

        <div className="bg-[#111111] border border-[#2A2A2A] p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 border border-gold/40 flex items-center justify-center">
              <Lock size={14} className="text-gold" />
            </div>
            <div>
              <h2 className="text-sm font-body font-600 tracking-widest uppercase text-white">
                Sign In
              </h2>
              <p className="text-[10px] font-body text-[#6B6B6B]">Admin access only</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[10px] font-body tracking-[0.2em] uppercase text-[#6B6B6B] block mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@goyaljewellers.com"
                className="input-dark"
                required
                autoComplete="email"
              />
            </div>
            <div>
              <label className="text-[10px] font-body tracking-[0.2em] uppercase text-[#6B6B6B] block mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-dark pr-10"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6B6B] hover:text-gold transition-colors"
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-gold-filled w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-[10px] font-body tracking-widest text-[#6B6B6B] uppercase">
          Goyal Jewellers · Chomu, Rajasthan
        </p>
      </div>
    </div>
  )
}
