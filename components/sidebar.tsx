"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Sidebar() {
  const path = usePathname()
  const linkClass = (p: string) => `block px-4 py-2 rounded ${path===p ? "bg-white text-black font-bold" : "text-slate-300 hover:bg-slate-800"}`

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-8">i4 System</h2>
      <nav className="space-y-2">
        <Link href="/" className={linkClass("/")}>📊 Dashboard</Link>
        <Link href="/" className={linkClass("/employees")}>👥 Employees</Link>
        <Link href="/departments" className={linkClass("/departments")}>🏢 Departments</Link>
        <Link href="/leaves" className={linkClass("/leaves")}>📅 Leaves</Link>
      </nav>
      <div className="mt-20 p-4 bg-slate-800 rounded">
        <p className="text-sm">Logged as</p>
        <p className="font-bold">Admin - i4</p>
      </div>
    </div>
  )
}
