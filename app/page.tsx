"use client"
import { useState } from "react"
import { employees as initialData, Employee } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Page() {
  const [emps, setEmps] = useState<Employee[]>(initialData)
  const [search, setSearch] = useState("")

  // Dashboard stats - Step 2 API enakan mock
  const stats = {
    total: emps.length,
    departments: [...new Set(emps.map(e => e.department))].length,
    active: emps.length,
    itDept: emps.filter(e => e.department === "IT").length
  }

  const filtered = emps.filter(e => e.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      {/* Dashboard Cards - Oya ge main wada */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardHeader><CardTitle>Total Employees</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{stats.total}</CardContent></Card>
        <Card><CardHeader><CardTitle>Departments</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{stats.departments}</CardContent></Card>
        <Card><CardHeader><CardTitle>Active</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{stats.active}</CardContent></Card>
        <Card><CardHeader><CardTitle>IT Team</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{stats.itDept}</CardContent></Card>
      </div>

      {/* Employee List - kalin thibba eka */}
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <CardTitle>Employees</CardTitle>
          <Input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="w-64" />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Dept</TableHead></TableRow></TableHeader>
            <TableBody>
              {filtered.map(e => (
                <TableRow key={e.id}><TableCell>{e.name}</TableCell><TableCell>{e.email}</TableCell><TableCell>{e.department}</TableCell></TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}