"use client";
import { useState } from "react";

type Employee = {
  id: number;
  name: string;
  email: string;
  department: string;
  status: "Active" | "Inactive";
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: "Nimal Perera", email: "nimal@test.com", department: "IT", status: "Active" },
    { id: 2, name: "Sunil Silva", email: "sunil@test.com", department: "HR", status: "Inactive" },
  ]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", email: "", department: "", status: "Active" as "Active" | "Inactive" });
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!form.name || !form.email || !form.department) { setError("All fields required!"); return; }
    if (editId) {
      setEmployees(employees.map(e => e.id === editId ? { ...e, ...form } : e));
      setEditId(null);
    } else {
      setEmployees([...employees, { ...form, id: Date.now() }]);
    }
    setForm({ name: "", email: "", department: "", status: "Active" });
    setError("");
  };

  const filtered = employees.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Employee Management</h1>
      <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} className="border p-2 rounded mb-4 w-full max-w-sm" />
      <div className="border p-4 rounded mb-4 max-w-md bg-white">
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="border p-2 rounded w-full mb-2" />
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="border p-2 rounded w-full mb-2" />
        <input placeholder="Department" value={form.department} onChange={e=>setForm({...form,department:e.target.value})} className="border p-2 rounded w-full mb-2" />
        <select value={form.status} onChange={e=>setForm({...form,status:e.target.value as any})} className="border p-2 rounded w-full mb-2">
          <option>Active</option><option>Inactive</option>
        </select>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-2">{editId?"Update":"Add"}</button>
      </div>
      <table className="w-full border bg-white">
        <thead className="bg-gray-100"><tr><th className="p-2 border">Name</th><th className="p-2 border">Email</th><th className="p-2 border">Dept</th><th className="p-2 border">Status</th><th className="p-2 border">Action</th></tr></thead>
        <tbody>
          {filtered.map(emp=>(
            <tr key={emp.id}><td className="p-2 border">{emp.name}</td><td className="p-2 border">{emp.email}</td><td className="p-2 border">{emp.department}</td><td className="p-2 border">{emp.status}</td>
            <td className="p-2 border">
              <button onClick={()=>{setForm({name:emp.name,email:emp.email,department:emp.department,status:emp.status});setEditId(emp.id)}} className="bg-yellow-500 text-white px-2 py-1 rounded mr-1">Edit</button>
              <button onClick={()=>setEmployees(employees.filter(x=>x.id!==emp.id))} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}