import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-5">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
          <span className="text-[10px] font-body tracking-[0.4em] uppercase text-gold">404</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
        </div>
        <h1 className="font-display text-6xl md:text-8xl font-light text-white mb-4">
          Page Not <em className="text-gold">Found</em>
        </h1>
        <p className="text-sm font-body text-[#6B6B6B] tracking-widest mb-10">
          The page you are looking for does not exist.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/" className="btn-gold-filled">
            Back to Home
          </Link>
          <Link href="/#categories" className="btn-gold">
            View Collections
          </Link>
        </div>
        <p className="mt-12 text-[10px] font-body tracking-widest text-[#4A4A4A] uppercase">
          Goyal Jewellers · Naya Bajar, Chomu, Rajasthan
        </p>
      </div>
    </div>
  )
}
