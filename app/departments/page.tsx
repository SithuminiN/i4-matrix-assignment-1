import { employees } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DepartmentsPage() {
  const depts = ["IT", "HR", "Finance"]
  
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Departments</h1>
      <div className="grid grid-cols-3 gap-6">
        {depts.map(d => {
          const count = employees.filter(e => e.department === d).length
          return (
            <Card key={d}>
              <CardHeader><CardTitle>{d} Department</CardTitle></CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{count}</p>
                <p className="text-sm text-slate-500">Employees</p>
                <div className="mt-4">
                  {employees.filter(e=>e.department===d).map(e=>(
                    <div key={e.id} className="text-sm py-1 border-b">{e.name} - {e.role}</div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}