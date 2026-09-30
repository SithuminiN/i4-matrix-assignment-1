import "./globals.css"
import { Sidebar } from "@/components/sidebar"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex">
        <Sidebar />
        <div className="flex-1">
          {children}
        </div>
      </body>
    </html>
  )
}