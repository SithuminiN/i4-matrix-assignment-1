"use client"
import { useState } from "react"
import { employees as initialData, Employee } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function Page() {
  const [emps, setEmps] = useState<Employee[]>(initialData)
  const [search, setSearch] = useState("")
  const [form, setForm] = useState({ name: "", email: "", department: "IT", role: "" })
  const [editing, setEditing] = useState<Employee | null>(null)
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const filtered = emps.filter(e => e.name.toLowerCase().includes(search.toLowerCase()))

  const addEmployee = () => {
    if(!form.name) return
    const newEmp: Employee = { id: Date.now().toString(), name: form.name, email: form.email, department: form.department, role: form.role || "Staff", status: "Active" }
    setEmps([...emps, newEmp])
    setOpenAdd(false)
  }

  const deleteEmployee = (id: string) => {
    if(confirm("Delete?")) setEmps(emps.filter(e => e.id !== id))
  }

  const saveEdit = () => {
    if(!editing) return
    setEmps(emps.map(e => e.id === editing.id ? editing : e))
    setOpenEdit(false)
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">i4 - Employee Management</h1>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card><CardHeader><CardTitle>Total</CardTitle></CardHeader><CardContent>{emps.length}</CardContent></Card>
        <Card><CardHeader><CardTitle>Active</CardTitle></CardHeader><CardContent>{emps.filter(e=>e.status==="Active").length}</CardContent></Card>
        <Card><CardHeader><CardTitle>Depts</CardTitle></CardHeader><CardContent>3</CardContent></Card>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Employees</CardTitle>
          <div className="flex gap-2">
            <Input placeholder="Search" value={search} onChange={e=>setSearch(e.target.value)} className="w-24" />
            <Dialog open={openAdd} onOpenChange={setOpenAdd}>
              <DialogTrigger asChild><Button>Add</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Add</DialogTitle></DialogHeader>
                <Input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
                <Input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
                <Button onClick={addEmployee} className="w-full">Save</Button>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Role</TableHead><TableHead>Action</TableHead></TableRow></TableHeader>
            <TableBody>
              {filtered.map(e=>(
                <TableRow key={e.id}>
                  <TableCell>{e.name}</TableCell>
                  <TableCell>{e.role}</TableCell>
                  <TableCell className="flex gap-1">
                    <Button size="sm" variant="outline" onClick={()=>{setEditing(e); setOpenEdit(true)}}>Edit</Button>
                    <Button size="sm" variant="destructive" onClick={()=>deleteEmployee(e.id)}>Del</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-2">
              <Label>Name</Label><Input value={editing.name} onChange={e=>setEditing({...editing, name: e.target.value})} />
              <Label>Role</Label><Input value={editing.role} onChange={e=>setEditing({...editing, role: e.target.value})} />
              <Button onClick={saveEdit} className="w-full">Update</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}