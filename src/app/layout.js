import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://wallpanels.id"),
  title: "Wallpanels Indonesia | Interior Cepat Beres !",
  description: "Wallpanels Indonesia - Wall panel elegan dan modern untuk interior yang tak lekang waktu. Tersedia Solid, Wood, Marble, Linen, Stainless & WPC Series. Interior Cepat Beres !",
  keywords: [
    "wall panel indonesia",
    "wallpanel",
    "wall panel elegan",
    "dekorasi dinding",
    "interior modern",
    "wall panel murah",
    "wall panel jakarta",
    "panel dinding dekoratif",
    "interior wall panel",
    "wallpanels id",
  ],
  authors: [{ name: "Wallpanels Indonesia", url: "https://wallpanels.id" }],
  creator: "Wallpanels Indonesia",
  publisher: "Wallpanels Indonesia",
  alternates: {
    canonical: "https://wallpanels.id",
  },
  openGraph: {
    title: "Wallpanels Indonesia | Interior Cepat Beres !",
    description: "Wall panel elegan dan modern untuk interior yang tak lekang waktu. Tersedia Solid, Wood, Marble, Linen, Stainless & WPC Series.",
    url: "https://wallpanels.id",
    siteName: "Wallpanels Indonesia",
    images: [
      {
        url: "/images/product/Hero Portfolio/LV 3.webp",
        width: 1200,
        height: 630,
        alt: "Wallpanels Indonesia - Wall Panel Elegan untuk Interior Modern",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wallpanels Indonesia | Interior Cepat Beres !",
    description: "Wall panel elegan dan modern untuk interior yang tak lekang waktu. Interior Cepat Beres !",
    images: ["/images/product/Hero Portfolio/LV 3.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/logo/wallpanels-logo.webp",
    apple: "/images/logo/wallpanels-logo.webp",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Wallpanels Indonesia",
  description: "Wall panel elegan dan modern untuk interior yang tak lekang waktu.",
  url: "https://wallpanels.id",
  logo: "https://wallpanels.id/images/logo/wallpanels-logo.webp",
  image: "https://wallpanels.id/images/product/Hero Portfolio/LV 3.webp",
  "@id": "https://wallpanels.id",
  priceRange: "$$",
  areaServed: {
    "@type": "Country",
    name: "Indonesia",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Wall Panel Series",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Solid Series Wall Panel" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Wood Series Wall Panel" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Marble Series Wall Panel" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Linen Series Wall Panel" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Stainless Steel Series Wall Panel" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "WPC Series Wall Panel" } },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
