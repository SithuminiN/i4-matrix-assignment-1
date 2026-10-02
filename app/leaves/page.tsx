"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

type Leave = { id: string, name: string, type: string, date: string, status: "Pending" | "Approved" | "Rejected" }

export default function LeavesPage() {
  const [leaves, setLeaves] = useState<Leave[]>([
    { id: "1", name: "Kamal Perera", type: "Sick Leave", date: "2026-09-28", status: "Pending" },
    { id: "2", name: "Nimali Silva", type: "Casual Leave", date: "2026-09-30", status: "Approved" },
    { id: "3", name: "Sunil Fernando", type: "Annual Leave", date: "2026-10-05", status: "Pending" },
  ])

  const updateStatus = (id: string, status: Leave["status"]) => {
    setLeaves(leaves.map(l => l.id === id ? {...l, status} : l))
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Leave Management</h1>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card><CardHeader><CardTitle>Pending</CardTitle></CardHeader><CardContent className="text-3xl font-bold text-yellow-600">{leaves.filter(l=>l.status==="Pending").length}</CardContent></Card>
        <Card><CardHeader><CardTitle>Approved</CardTitle></CardHeader><CardContent className="text-3xl font-bold text-green-600">{leaves.filter(l=>l.status==="Approved").length}</CardContent></Card>
        <Card><CardHeader><CardTitle>Rejected</CardTitle></CardHeader><CardContent className="text-3xl font-bold text-red-600">{leaves.filter(l=>l.status==="Rejected").length}</CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Leave Requests</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Employee</TableHead><TableHead>Type</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead><TableHead>Action</TableHead></TableRow></TableHeader>
            <TableBody>
              {leaves.map(l=>(
                <TableRow key={l.id}>
                  <TableCell className="font-medium">{l.name}</TableCell>
                  <TableCell>{l.type}</TableCell>
                  <TableCell>{l.date}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${l.status==="Approved" ? "bg-green-100 text-green-700" : l.status==="Pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{l.status}</span>
                  </TableCell>
                  <TableCell className="flex gap-1">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={()=>updateStatus(l.id, "Approved")}>Approve</Button>
                    <Button size="sm" variant="destructive" onClick={()=>updateStatus(l.id, "Rejected")}>Reject</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
