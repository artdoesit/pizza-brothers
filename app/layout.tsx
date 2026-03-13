import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Pizza Brothers | Best Loaded Pizza in Minal Residency, Bhopal",
  description: "Order delicious loaded cheese pizzas, juicy burgers, and cold coffee from Pizza Brothers. Fast delivery in Minal Residency, Sector E Phase 6, Bhopal.",
  keywords: ["pizza", "bhopal", "minal residency", "burger", "cold coffee", "food delivery", "pizza brothers", "artdoesit"],
  authors: [{ name: "Artdoesit Studio" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}