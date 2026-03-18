import PublicLayout from '@/components/PublicLayout'
import HeroSection from '@/components/HeroSection'
import CategoryCard from '@/components/CategoryCard'
import ProductCard from '@/components/ProductCard'
import { createServerSupabaseClient } from '@/lib/supabaseServer'
import { MapPin, Phone, Clock, Sparkles } from 'lucide-react'

export const metadata = {
  title: 'Goyal Jewellers – Gold & Diamond Jewellery in Chomu, Rajasthan',
  description:
    'Visit Goyal Jewellers at Naya Bajar, Chomu, Rajasthan for exquisite gold jewellery, diamond jewellery, bridal sets, rings, necklaces, earrings, and bangles.',
}

async function getHomeData() {
  const supabase = await createServerSupabaseClient()
  const [{ data: categories }, { data: products }] = await Promise.all([
    supabase.from('categories').select('*').order('name'),
    supabase
      .from('products')
      .select('*, categories(name,slug)')
      .order('created_at', { ascending: false })
      .limit(8),
  ])
  return { categories: categories || [], products: products || [] }
}

export default async function HomePage() {
  const { categories, products } = await getHomeData()

  return (
    <PublicLayout>
      {/* HERO */}
      <HeroSection />

      {/* CATEGORIES */}
      <section id="categories" className="section-pad bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-5">
          {/* Section header */}
          <div className="text-center mb-14">
            <p className="text-[10px] font-body tracking-[0.4em] uppercase text-gold mb-3">
              Our Collections
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-4">
              Jewellery <em>Categories</em>
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/40" />
              <span className="text-gold text-sm">✦</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/40" />
            </div>
          </div>

          {categories.length === 0 ? (
            <div className="text-center py-16 text-[#6B6B6B]">
              <p className="font-display text-2xl font-light">No categories yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <CategoryCard key={cat.id} category={cat} />
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="gold-divider" />

      {/* LATEST PRODUCTS */}
      <section id="products" className="section-pad bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-14">
            <p className="text-[10px] font-body tracking-[0.4em] uppercase text-gold mb-3">
              New Arrivals
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-4">
              Latest <em>Products</em>
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/40" />
              <span className="text-gold text-sm">✦</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/40" />
            </div>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-20 border border-[#2A2A2A]">
              <span className="font-display text-6xl text-[#2A2A2A]">✦</span>
              <p className="font-display text-2xl font-light text-[#4A4A4A] mt-4">
                No products available yet.
              </p>
              <p className="text-xs font-body tracking-widest text-[#6B6B6B] uppercase mt-2">
                Check back soon — our collection is coming.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              {products.length >= 8 && (
                <div className="text-center mt-12">
                  <a href="/category/all" className="btn-gold text-[10px]">
                    View All Products
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <div className="gold-divider" />

      {/* ABOUT */}
      <section id="about" className="section-pad bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <p className="text-[10px] font-body tracking-[0.4em] uppercase text-gold mb-4">
                Our Story
              </p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-6">
                Crafting <em className="text-gold">Timeless</em><br />Elegance
              </h2>
              <div className="h-px w-12 bg-gradient-to-r from-gold to-transparent mb-6" />
              <p className="font-body text-sm text-[#BFBFBF] leading-relaxed mb-4">
                Goyal Jewellers has been a trusted name in fine jewellery in Chomu, Rajasthan. 
                We specialise in exquisite gold and diamond jewellery, bridal sets, and custom 
                pieces — crafted with unmatched artistry and attention to detail.
              </p>
              <p className="font-body text-sm text-[#BFBFBF] leading-relaxed mb-8">
                Every piece in our collection tells a story. From the finest gold ornaments 
                to stunning diamond jewellery, we bring the best of Rajasthan's legendary 
                jewellery tradition to your doorstep.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Pure Gold', desc: 'BIS Hallmarked' },
                  { label: 'Certified', desc: 'Diamonds' },
                  { label: 'Custom', desc: 'Orders Welcome' },
                ].map((item) => (
                  <div key={item.label} className="border border-[#2A2A2A] p-4 hover:border-gold/40 transition-colors">
                    <Sparkles size={14} className="text-gold mb-2" />
                    <p className="text-xs font-body font-600 text-white tracking-wider">{item.label}</p>
                    <p className="text-[10px] font-body text-[#6B6B6B] tracking-widest uppercase mt-0.5">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Decorative block */}
            <div className="relative">
              <div className="aspect-[4/5] bg-[#161616] border border-[#2A2A2A] relative overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <span className="font-display text-8xl text-[#1E1E1E]">✦</span>
                  <p className="font-display text-3xl font-light text-[#2A2A2A] italic text-center px-8">
                    Where every jewel has a story
                  </p>
                </div>
                {/* Corner ornaments */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-gold/40" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-gold/40" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-gold/40" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold/40" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-gold text-[#0D0D0D] px-5 py-3">
                <p className="font-body text-[9px] font-700 tracking-[0.2em] uppercase">Chomu's Finest</p>
                <p className="font-display text-lg font-semibold leading-none">Jewellers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* STORE INFO + MAP */}
      <section id="contact" className="section-pad bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-14">
            <p className="text-[10px] font-body tracking-[0.4em] uppercase text-gold mb-3">
              Find Us
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-4">
              Visit Our <em>Showroom</em>
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/40" />
              <span className="text-gold text-sm">✦</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/40" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Info card */}
            <div className="bg-[#111111] border border-[#2A2A2A] p-8 space-y-8">
              <div>
                <h3 className="font-display text-3xl font-semibold gold-shimmer mb-1">Goyal Jewellers</h3>
                <p className="text-[10px] font-body tracking-[0.3em] text-[#6B6B6B] uppercase">
                  Jewellery Showroom
                </p>
              </div>
              <div className="space-y-5">
                {[
                  {
                    icon: <MapPin size={18} className="text-gold mt-0.5 shrink-0" />,
                    label: 'Address',
                    value: 'Naya Bajar, Chomu\nRajasthan 303702, India',
                  },
                  {
                    icon: <Phone size={18} className="text-gold mt-0.5 shrink-0" />,
                    label: 'Phone',
                    value: '+91 99285 29683',
                    href: 'tel:+919928529683',
                  },
                  {
                    icon: <Clock size={18} className="text-gold mt-0.5 shrink-0" />,
                    label: 'Hours',
                    value: 'Monday – Sunday\n10:30 AM – 07:30 PM',
                  },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4 pb-5 border-b border-[#1E1E1E] last:border-0 last:pb-0">
                    {item.icon}
                    <div>
                      <p className="text-[10px] font-body tracking-[0.2em] uppercase text-[#6B6B6B] mb-1">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a href={item.href} className="text-sm font-body text-[#BFBFBF] hover:text-gold transition-colors whitespace-pre-line">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-body text-[#BFBFBF] whitespace-pre-line">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="https://wa.me/919928529683"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-filled w-full justify-center gap-2"
              >
                💬 Chat on WhatsApp
              </a>
            </div>

            {/* Google Map embed */}
            <div className="border border-[#2A2A2A] overflow-hidden relative min-h-[400px]">
              <iframe
                title="Goyal Jewellers Location – Naya Bajar, Chomu, Rajasthan"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3555.8!2d75.7282!3d27.1562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c9c5a5a5a5a5a%3A0x5a5a5a5a5a5a5a5a!2sNaya+Bajar%2C+Chomu%2C+Rajasthan+303702!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px', filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
