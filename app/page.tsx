"use client";

import React, { useState } from "react";

// TypeScript Interface with Joined Date field
interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: "Active" | "On Leave" | "Inactive";
  joinedDate: string;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  // Dynamic Logged-in User State
  const [currentUser, setCurrentUser] = useState({
    name: "Sithumini Navodya",
    email: "navodyasithumini6@gmail.com",
    role: "Frontend Intern @ i4Matrix",
  });

  // Profile Edit Modal State
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({ ...currentUser });

  // Initial Employee Data State
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: "Amaya Perera",
      email: "amaya.perera@northstar.io",
      phone: "+94 77 123 4567",
      department: "Design",
      position: "Product Designer",
      status: "Active",
      joinedDate: "Mar 18, 2024",
    },
    {
      id: 2,
      name: "Kasun Silva",
      email: "kasun@example.com",
      phone: "+94 71 987 6543",
      department: "Design",
      position: "UI/UX Designer",
      status: "Active",
      joinedDate: "Nov 6, 2023",
    },
    {
      id: 3,
      name: "Nimal Fernando",
      email: "nimal@example.com",
      phone: "+94 75 456 7890",
      department: "Management",
      position: "Project Manager",
      status: "On Leave",
      joinedDate: "Aug 21, 2023",
    },
    {
      id: 4,
      name: "Dilini Jayawardena",
      email: "dilini@example.com",
      phone: "+94 78 321 6549",
      department: "Human Resources",
      position: "HR Executive",
      status: "Active",
      joinedDate: "Apr 12, 2023",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Employee Modal States
  const [modalMode, setModalMode] = useState<"ADD" | "EDIT" | "VIEW" | null>(
    null,
  );
  const [selectedEmp, setSelectedEmp] = useState<Employee | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState<Omit<Employee, "id" | "joinedDate">>(
    {
      name: "",
      email: "",
      phone: "",
      department: "Engineering",
      position: "",
      status: "Active",
    },
  );

  // Open Handlers
  const handleOpenAdd = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      department: "Engineering",
      position: "",
      status: "Active",
    });
    setModalMode("ADD");
  };

  const handleOpenEdit = (emp: Employee) => {
    setSelectedEmp(emp);
    setFormData({
      name: emp.name,
      email: emp.email,
      phone: emp.phone,
      department: emp.department,
      position: emp.position,
      status: emp.status,
    });
    setModalMode("EDIT");
  };

  const handleOpenView = (emp: Employee) => {
    setSelectedEmp(emp);
    setModalMode("VIEW");
  };

  // Profile Save Handler
  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser(profileForm);
    setIsProfileModalOpen(false);
  };

  // Submit Handler for Add & Edit
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.position) return;

    if (modalMode === "ADD") {
      const newEmployee: Employee = {
        id: Date.now(),
        ...formData,
        joinedDate: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };
      setEmployees([newEmployee, ...employees]);
    } else if (modalMode === "EDIT" && selectedEmp) {
      setEmployees(
        employees.map((emp) =>
          emp.id === selectedEmp.id ? { ...emp, ...formData } : emp,
        ),
      );
    }

    setModalMode(null);
  };

  // Confirm Delete
  const confirmDelete = () => {
    if (deleteId !== null) {
      setEmployees(employees.filter((emp) => emp.id !== deleteId));
      setDeleteId(null);
    }
  };

  // Stats Calculations
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.status === "Active").length;
  const onLeaveEmployees = employees.filter(
    (e) => e.status === "On Leave",
  ).length;

  const departmentCounts = employees.reduce(
    (acc, emp) => {
      acc[emp.department] = (acc[emp.department] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const totalDepartments = Object.keys(departmentCounts).length;

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div style={styles.container}>
      {/* Sidebar Navigation */}
      <aside style={styles.sidebar}>
        <div style={styles.brand}>
          <span style={styles.brandIcon}>👥</span>
          {/* Brand Name Updated Here */}
          <h2 style={styles.brandText}>EMS</h2>
        </div>
        <nav style={styles.navMenu}>
          {["Dashboard", "Employees", "Departments", "Settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                ...styles.navItem,
                ...(activeTab === tab ? styles.navItemActive : {}),
              }}
            >
              {tab === "Dashboard" && "📊 "}
              {tab === "Employees" && "👨‍💼 "}
              {tab === "Departments" && "🏢 "}
              {tab === "Settings" && "⚙ "}
              {tab}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main style={styles.mainContent}>
        {/* Header Section */}
        <header style={styles.header}>
          <div>
            <h1 style={styles.pageTitle}>{activeTab}</h1>
            <p style={styles.pageSubtitle}>
              Welcome back, <strong>{currentUser.name}</strong>! Here is your
              employee summary.
            </p>
          </div>

          <div style={styles.headerRight}>
            <button style={styles.addButton} onClick={handleOpenAdd}>
              + Add Employee
            </button>

            {/* Clickable Profile Component for Editing */}
            <div
              style={{ ...styles.userProfile, cursor: "pointer" }}
              title="Click to edit profile"
              onClick={() => {
                setProfileForm({ ...currentUser });
                setIsProfileModalOpen(true);
              }}
            >
              <div style={styles.avatar}>{getInitials(currentUser.name)}</div>
              <div>
                <div style={styles.userName}>{currentUser.name} ✏️</div>
                <div style={styles.userRole}>{currentUser.role}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Overview Metric Cards */}
        <section style={styles.cardsGrid}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.cardTitle}>Total Employees</span>
              <span
                style={{
                  ...styles.cardIcon,
                  backgroundColor: "#0284c715",
                  color: "#38bdf8",
                }}
              >
                👥
              </span>
            </div>
            <div style={styles.cardValue}>{totalEmployees}</div>
            <div style={styles.cardSubtext}>Total registered workforce</div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.cardTitle}>Active Employees</span>
              <span
                style={{
                  ...styles.cardIcon,
                  backgroundColor: "#05966915",
                  color: "#34d399",
                }}
              >
                ✅
              </span>
            </div>
            <div style={styles.cardValue}>{activeEmployees}</div>
            <div style={styles.cardSubtext}>
              {totalEmployees > 0
                ? Math.round((activeEmployees / totalEmployees) * 100)
                : 0}
              % of active team
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.cardTitle}>On Leave</span>
              <span
                style={{
                  ...styles.cardIcon,
                  backgroundColor: "#d9770615",
                  color: "#fbbf24",
                }}
              >
                🏖
              </span>
            </div>
            <div style={styles.cardValue}>{onLeaveEmployees}</div>
            <div style={styles.cardSubtext}>Currently away on leave</div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.cardTitle}>Departments</span>
              <span
                style={{
                  ...styles.cardIcon,
                  backgroundColor: "#7c3aed15",
                  color: "#a78bfa",
                }}
              >
                🏢
              </span>
            </div>
            <div style={styles.cardValue}>{totalDepartments}</div>
            <div style={styles.cardSubtext}>Active operational units</div>
          </div>
        </section>

        {/* Lower Grid: Department Summary & Employee Table */}
        <div style={styles.detailsGrid}>
          {/* Department Breakdown */}
          <div style={styles.sectionCard}>
            <h3 style={styles.sectionTitle}>Department Summary</h3>
            <p style={styles.sectionSub}>
              Employee distribution across departments
            </p>
            <div style={styles.deptList}>
              {Object.entries(departmentCounts).map(([dept, count]) => {
                const percentage =
                  totalEmployees > 0
                    ? Math.round((count / totalEmployees) * 100)
                    : 0;
                return (
                  <div key={dept} style={styles.deptItem}>
                    <div style={styles.deptInfo}>
                      <span style={styles.deptName}>{dept}</span>
                      <span style={styles.deptCount}>
                        {count} {count === 1 ? "Employee" : "Employees"} (
                        {percentage}%)
                      </span>
                    </div>
                    <div style={styles.progressBarBg}>
                      <div
                        style={{
                          ...styles.progressBarFill,
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Employee Directory Overview */}
          <div style={styles.sectionCard}>
            <div style={styles.tableHeaderArea}>
              <div>
                <h3 style={styles.sectionTitle}>Employee Directory</h3>
                <p style={styles.sectionSub}>Quick overview of team members</p>
              </div>
              <input
                type="text"
                placeholder="Search employee..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Employee</th>
                    <th style={styles.th}>Department</th>
                    <th style={styles.th}>Position</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Joined</th>
                    <th style={{ ...styles.th, textAlign: "right" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        style={{
                          ...styles.td,
                          textAlign: "center",
                          padding: "20px",
                        }}
                      >
                        No employees found matching your search.
                      </td>
                    </tr>
                  ) : (
                    filteredEmployees.map((emp) => (
                      <tr key={emp.id} style={styles.tr}>
                        <td style={styles.td}>
                          <div style={styles.empCol}>
                            <div style={styles.avatarSmall}>
                              {getInitials(emp.name)}
                            </div>
                            <div>
                              <div style={styles.empName}>{emp.name}</div>
                              <div style={styles.empRole}>{emp.email}</div>
                            </div>
                          </div>
                        </td>

                        <td style={styles.td}>
                          <span style={{ color: "#38bdf8" }}>●</span>{" "}
                          {emp.department}
                        </td>

                        <td style={styles.td}>{emp.position}</td>

                        <td style={styles.td}>
                          <span
                            style={
                              emp.status === "Active"
                                ? styles.badgeActive
                                : emp.status === "On Leave"
                                  ? styles.badgeLeave
                                  : styles.badgeInactive
                            }
                          >
                            ● {emp.status}
                          </span>
                        </td>

                        <td style={styles.td}>{emp.joinedDate}</td>

                        <td style={{ ...styles.td, textAlign: "right" }}>
                          <div style={styles.actionGroup}>
                            <button
                              title="View Details"
                              style={styles.actionIconBtn}
                              onClick={() => handleOpenView(emp)}
                            >
                              👁️
                            </button>
                            <button
                              title="Edit Employee"
                              style={styles.actionIconBtn}
                              onClick={() => handleOpenEdit(emp)}
                            >
                              ✏️
                            </button>
                            <button
                              title="Delete Employee"
                              style={styles.actionIconBtn}
                              onClick={() => setDeleteId(emp.id)}
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* EDIT LOGGED-IN USER PROFILE MODAL */}
      {isProfileModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Edit Logged-In User</h2>
              <button
                style={styles.closeBtn}
                onClick={() => setIsProfileModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleProfileSave} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Your Name *</label>
                <input
                  type="text"
                  required
                  style={styles.input}
                  value={profileForm.name}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, name: e.target.value })
                  }
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email Address *</label>
                <input
                  type="email"
                  required
                  style={styles.input}
                  value={profileForm.email}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, email: e.target.value })
                  }
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Role / Title *</label>
                <input
                  type="text"
                  required
                  style={styles.input}
                  value={profileForm.role}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, role: e.target.value })
                  }
                />
              </div>

              <div style={styles.modalActions}>
                <button
                  type="button"
                  style={styles.cancelBtn}
                  onClick={() => setIsProfileModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" style={styles.submitBtn}>
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD / EDIT / VIEW EMPLOYEE MODAL */}
      {modalMode && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {modalMode === "ADD" && "Add New Employee"}
                {modalMode === "EDIT" && "Edit Employee Details"}
                {modalMode === "VIEW" && "Employee Details"}
              </h2>
              <button
                style={styles.closeBtn}
                onClick={() => setModalMode(null)}
              >
                ✕
              </button>
            </div>

            {modalMode === "VIEW" && selectedEmp ? (
              <div
                style={{
                  color: "#cbd5e1",
                  fontSize: "14px",
                  lineHeight: "1.8",
                }}
              >
                <p>
                  <strong>Name:</strong> {selectedEmp.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedEmp.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedEmp.phone}
                </p>
                <p>
                  <strong>Department:</strong> {selectedEmp.department}
                </p>
                <p>
                  <strong>Position:</strong> {selectedEmp.position}
                </p>
                <p>
                  <strong>Status:</strong> {selectedEmp.status}
                </p>
                <p>
                  <strong>Joined Date:</strong> {selectedEmp.joinedDate}
                </p>
                <div style={styles.modalActions}>
                  <button
                    style={styles.cancelBtn}
                    onClick={() => setModalMode(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitForm} style={styles.form}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Full Name *</label>
                  <input
                    type="text"
                    required
                    style={styles.input}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Email Address *</label>
                  <input
                    type="email"
                    required
                    style={styles.input}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Phone Number</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Position *</label>
                  <input
                    type="text"
                    required
                    style={styles.input}
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Department</label>
                  <select
                    style={styles.input}
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Management">Management</option>
                    <option value="Human Resources">Human Resources</option>
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Status</label>
                  <select
                    style={styles.input}
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as Employee["status"],
                      })
                    }
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div style={styles.modalActions}>
                  <button
                    type="button"
                    style={styles.cancelBtn}
                    onClick={() => setModalMode(null)}
                  >
                    Cancel
                  </button>
                  <button type="submit" style={styles.submitBtn}>
                    {modalMode === "ADD" ? "Save Employee" : "Update Details"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId !== null && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <h3 style={{ margin: "0 0 10px 0", color: "#f8fafc" }}>
              Confirm Deletion
            </h3>
            <p
              style={{
                color: "#94a3b8",
                fontSize: "14px",
                marginBottom: "20px",
              }}
            >
              Are you sure you want to delete this employee record? This action
              cannot be undone.
            </p>
            <div style={styles.modalActions}>
              <button
                style={styles.cancelBtn}
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
              <button
                style={{ ...styles.submitBtn, backgroundColor: "#ef4444" }}
                onClick={confirmDelete}
              >
                Delete Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Styles remains untouched
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#0f172a",
    color: "#f8fafc",
    fontFamily: "'Segoe UI', Roboto, sans-serif",
  },
  sidebar: {
    width: "240px",
    backgroundColor: "#1e293b",
    borderRight: "1px solid #334155",
    padding: "24px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    paddingLeft: "8px",
  },
  brandIcon: { fontSize: "24px" },
  brandText: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#38bdf8",
    margin: 0,
  },
  navMenu: { display: "flex", flexDirection: "column", gap: "8px" },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 14px",
    borderRadius: "8px",
    color: "#94a3b8",
    backgroundColor: "transparent",
    border: "none",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    textAlign: "left",
  },
  navItemActive: {
    backgroundColor: "#0284c720",
    color: "#38bdf8",
    fontWeight: "600",
  },
  mainContent: { flex: 1, padding: "30px", overflowY: "auto" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    borderBottom: "1px solid #334155",
    paddingBottom: "20px",
  },
  headerRight: { display: "flex", alignItems: "center", gap: "16px" },
  addButton: {
    backgroundColor: "#0284c7",
    color: "#ffffff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
  },
  pageTitle: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#f8fafc",
    margin: 0,
  },
  pageSubtitle: {
    fontSize: "14px",
    color: "#94a3b8",
    marginTop: "4px",
    margin: 0,
  },
  userProfile: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    backgroundColor: "#1e293b",
    padding: "6px 14px",
    borderRadius: "30px",
    border: "1px solid #334155",
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "#0284c7",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "13px",
  },
  avatarSmall: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "#fef3c7",
    color: "#d97706",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "11px",
  },
  userName: { fontSize: "14px", fontWeight: "600", color: "#f8fafc" },
  userRole: { fontSize: "11px", color: "#94a3b8" },
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: "12px",
    padding: "20px",
    border: "1px solid #334155",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  cardTitle: { fontSize: "13px", color: "#94a3b8", fontWeight: "600" },
  cardIcon: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
  },
  cardValue: {
    fontSize: "30px",
    fontWeight: "700",
    color: "#f8fafc",
    marginBottom: "4px",
  },
  cardSubtext: { fontSize: "12px", color: "#64748b" },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
    gap: "24px",
  },
  sectionCard: {
    backgroundColor: "#1e293b",
    borderRadius: "12px",
    padding: "24px",
    border: "1px solid #334155",
  },
  tableHeaderArea: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  searchInput: {
    backgroundColor: "#0f172a",
    border: "1px solid #334155",
    borderRadius: "6px",
    padding: "6px 12px",
    color: "#fff",
    fontSize: "13px",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#f8fafc",
    margin: 0,
  },
  sectionSub: {
    fontSize: "13px",
    color: "#94a3b8",
    marginTop: "4px",
    marginBottom: "20px",
  },
  deptList: { display: "flex", flexDirection: "column", gap: "16px" },
  deptItem: { display: "flex", flexDirection: "column", gap: "6px" },
  deptInfo: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
  },
  deptName: { color: "#e2e8f0", fontWeight: "500" },
  deptCount: { color: "#94a3b8" },
  progressBarBg: {
    height: "8px",
    backgroundColor: "#0f172a",
    borderRadius: "4px",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#38bdf8",
    borderRadius: "4px",
  },
  table: { width: "100%", borderCollapse: "collapse", textAlign: "left" },
  th: {
    borderBottom: "1px solid #334155",
    padding: "10px",
    fontSize: "12px",
    color: "#94a3b8",
    fontWeight: "600",
  },
  tr: { borderBottom: "1px solid #334155" },
  td: { padding: "12px 10px", fontSize: "13px", color: "#cbd5e1" },
  empCol: { display: "flex", alignItems: "center", gap: "10px" },
  empName: { fontWeight: "600", color: "#f8fafc" },
  empRole: { fontSize: "11px", color: "#94a3b8" },
  badgeActive: { color: "#34d399", fontSize: "12px", fontWeight: "600" },
  badgeLeave: { color: "#fbbf24", fontSize: "12px", fontWeight: "600" },
  badgeInactive: { color: "#f87171", fontSize: "12px", fontWeight: "600" },
  actionGroup: { display: "flex", justifyContent: "flex-end", gap: "10px" },
  actionIconBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modalBox: {
    backgroundColor: "#1e293b",
    padding: "24px",
    borderRadius: "12px",
    width: "420px",
    border: "1px solid #334155",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  modalTitle: { fontSize: "18px", margin: 0, color: "#f8fafc" },
  closeBtn: {
    background: "transparent",
    border: "none",
    color: "#94a3b8",
    fontSize: "16px",
    cursor: "pointer",
  },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  formGroup: { display: "flex", flexDirection: "column", gap: "4px" },
  label: { fontSize: "12px", color: "#94a3b8" },
  input: {
    backgroundColor: "#0f172a",
    border: "1px solid #334155",
    borderRadius: "6px",
    padding: "8px 12px",
    color: "#fff",
    fontSize: "13px",
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "10px",
  },
  cancelBtn: {
    backgroundColor: "#334155",
    color: "#cbd5e1",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
  },
  submitBtn: {
    backgroundColor: "#0284c7",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
  },
};
