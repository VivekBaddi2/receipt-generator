import './globals.css'

export const metadata = {
  title: 'Receipt Generator - Professional Receipt Creation',
  description: 'Generate professional, print-ready receipts with database storage',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
