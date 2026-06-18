import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ClientLayout } from "@/components/ClientLayout"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "NUTZERA — Premium Healthy Nutrition",
  description:
    "Premium dates, nuts and dark chocolate bars made for modern lifestyles. Nature's energy, crafted better.",
  keywords: [
    "nutzera",
    "healthy snacks",
    "nut bars",
    "natural energy",
    "premium nutrition",
    "protein bars",
    "healthy eating",
    "dates bars",
    "dark chocolate bars",
    "organic snacks",
  ],
  openGraph: {
    title: "NUTZERA — Premium Healthy Nutrition",
    description:
      "Premium dates, nuts and dark chocolate bars made for modern lifestyles.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/logo.jpeg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body className="font-sans antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
