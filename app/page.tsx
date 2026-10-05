"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const employees = [
  { id: 1, name: "Kasun Perera", email: "kasun@company.com", role: "Developer" },
  { id: 2, name: "Nimali Silva", email: "nimali@company.com", role: "Designer" },
  { id: 3, name: "Sithumini N", email: "sithu@company.com", role: "Manager" },
]

export default function Dashboard() {
  const [search, setSearch] = useState("")

  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Employee Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card><CardHeader><CardTitle>Total: {employees.length}</CardTitle></CardHeader></Card>
        <Card><CardHeader><CardTitle>Active: {employees.length}</CardTitle></CardHeader></Card>
        <Card><CardHeader><CardTitle>Departments: 3</CardTitle></CardHeader></Card>
      </div>

      {/* Employee List - kalin thibba eka */}
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <CardTitle>Employees</CardTitle>
          <Input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="max-w-[200px]" />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Role</TableHead></TableRow></TableHeader>
            <TableBody>
              {filtered.map(e => (
                <TableRow key={e.id}><TableCell>{e.name}</TableCell><TableCell>{e.email}</TableCell><TableCell>{e.role}</TableCell></TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}