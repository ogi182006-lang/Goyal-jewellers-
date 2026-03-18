import { Toaster } from 'react-hot-toast'
import { CartProvider } from '@/context/CartContext'
import './globals.css'

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://goyaljewellers.vercel.app'),
  title: {
    default: 'Goyal Jewellers – Gold & Diamond Jewellery in Chomu, Rajasthan',
    template: '%s | Goyal Jewellers',
  },
  description:
    'Goyal Jewellers – Your trusted jewellery showroom in Chomu, Rajasthan. Explore exquisite gold jewellery, diamond jewellery, bridal sets, rings, necklaces, bangles & more. Visit us at Naya Bajar, Chomu.',
  keywords: [
    'jewellery shop in Chomu',
    'gold jewellers in Chomu',
    'best jewellery showroom in Chomu',
    'bridal jewellery in Rajasthan',
    'diamond jewellery Chomu',
    'Goyal Jewellers',
    'gold jewellery Rajasthan',
    'jewellery near Chomu',
  ],
  authors: [{ name: 'Goyal Jewellers' }],
  creator: 'Goyal Jewellers',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'Goyal Jewellers',
    title: 'Goyal Jewellers – Gold & Diamond Jewellery in Chomu, Rajasthan',
    description:
      'Explore exquisite gold and diamond jewellery at Goyal Jewellers, Naya Bajar, Chomu, Rajasthan.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Goyal Jewellers – Gold & Diamond Jewellery in Chomu',
    description: 'Explore exquisite jewellery at Goyal Jewellers, Chomu, Rajasthan.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Josefin+Sans:wght@100;200;300;400;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'JewelryStore',
              name: 'Goyal Jewellers',
              description: 'Exquisite gold and diamond jewellery showroom in Chomu, Rajasthan',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://goyaljewellers.vercel.app',
              telephone: '+91-99285-29683',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Naya Bajar',
                addressLocality: 'Chomu',
                addressRegion: 'Rajasthan',
                postalCode: '303702',
                addressCountry: 'IN',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '27.1562',
                longitude: '75.7282',
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday',
                ],
                opens: '10:30',
                closes: '19:30',
              },
              priceRange: '₹₹₹',
            }),
          }}
        />
      </head>
      <body className="noise-bg">
        <CartProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#1E1E1E',
                color: '#FFFFFF',
                border: '1px solid #2A2A2A',
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '13px',
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  )
}
