export type Employee = {
  id: string; name: string; email: string; department: string; role: string; status: "Active" | "On Leave";
};
export const employees: Employee[] = [
  { id: "1", name: "Kamal Perera", email: "kamal@i4.lk", department: "IT", role: "Developer", status: "Active" },
  { id: "2", name: "Nimali Silva", email: "nimali@i4.lk", department: "HR", role: "Manager", status: "Active" },
  { id: "3", name: "Sunil Fernando", email: "sunil@i4.lk", department: "Finance", role: "Analyst", status: "On Leave" },
];