import { useState, useEffect } from "react";

const API_BASE = "http://localhost:5000/api";

const statusSteps = ["Registered", "FIR Filed", "Under Investigation", "In Court", "Closed"];

const statusColors = {
  Registered: { bg: "#EAF3DE", text: "#3B6D11", dot: "#639922" },
  "FIR Filed": { bg: "#E1F5EE", text: "#0F6E56", dot: "#1D9E75" },
  "Under Investigation": { bg: "#EEEDFE", text: "#3C3489", dot: "#534AB7" },
  "In Court": { bg: "#FAEEDA", text: "#854F0B", dot: "#BA7517" },
  Closed: { bg: "#F1EFE8", text: "#444441", dot: "#888780" },
};

function getInitials(name = "") {
  return name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
}

function truncateHash(hash = "") {
  if (!hash) return "—";
  return hash.slice(0, 6) + "..." + hash.slice(-4);
}

function getStepIndex(status) {
  const map = {
    Registered: 0,
    "FIR Filed": 1,
    "Under Investigation": 2,
    "In Court": 3,
    Closed: 4,
  };
  return map[status] ?? 0;
}

// ─── Loading Skeleton ───────────────────────────────────────────
function Skeleton({ w = "100%", h = 16, radius = 6, mb = 0 }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: radius,
      background: "linear-gradient(90deg,#e8e8e8 25%,#f4f4f4 50%,#e8e8e8 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.4s infinite",
      marginBottom: mb,
    }} />
  );
}

// ─── Timeline Step ───────────────────────────────────────────────
function TimelineStep({ label, date, note, state, isLast }) {
  const dotStyle = {
    width: 28, height: 28, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 12, fontWeight: 600, flexShrink: 0,
    transition: "all 0.3s",
    ...(state === "done"
      ? { background: "#1D9E75", color: "#fff" }
      : state === "current"
      ? { background: "#534AB7", color: "#fff", boxShadow: "0 0 0 5px #EEEDFE" }
      : { background: "#F1EFE8", color: "#888780", border: "1px solid #D3D1C7" }),
  };

  return (
    <div style={{ display: "flex", gap: 14 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={dotStyle}>
          {state === "done" ? "✓" : state === "current" ? "●" : "○"}
        </div>
        {!isLast && (
          <div style={{
            width: 2, flex: 1, minHeight: 32,
            background: state === "done" ? "#1D9E75" : "#E8E8E5",
            margin: "4px 0",
          }} />
        )}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : 20, paddingTop: 2 }}>
        <p style={{
          fontSize: 13, fontWeight: 600, margin: 0,
          color: state === "current" ? "#534AB7" : state === "done" ? "#0F6E56" : "#888780",
        }}>{label}</p>
        {date && <p style={{ fontSize: 11, color: "#888780", margin: "2px 0 0" }}>{date}</p>}
        {note && <p style={{ fontSize: 11, color: "#5F5E5A", margin: "3px 0 0", lineHeight: 1.5 }}>{note}</p>}
      </div>
    </div>
  );
}

// ─── Info Row ────────────────────────────────────────────────────
function InfoRow({ label, value, mono, accent, last }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "9px 0",
      borderBottom: last ? "none" : "0.5px solid #E8E8E5",
    }}>
      <span style={{ fontSize: 12, color: "#888780" }}>{label}</span>
      <span style={{
        fontSize: mono ? 11 : 12, fontWeight: 500, textAlign: "right", maxWidth: "60%",
        fontFamily: mono ? "monospace" : "inherit",
        color: accent ? "#185FA5" : "#2C2C2A",
      }}>{value || "—"}</span>
    </div>
  );
}

// ─── Card ────────────────────────────────────────────────────────
function Card({ children, style = {} }) {
  return (
    <div style={{
      background: "#fff", border: "0.5px solid #E8E8E5",
      borderRadius: 14, padding: "14px 16px",
      ...style,
    }}>{children}</div>
  );
}

// ─── Section Label ───────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <p style={{
      fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
      textTransform: "uppercase", color: "#B4B2A9", marginBottom: 10,
    }}>{children}</p>
  );
}

// ─── Person Card ─────────────────────────────────────────────────
function PersonCard({ label, name, sub, color }) {
  return (
    <Card>
      <SectionLabel>{label}</SectionLabel>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 38, height: 38, borderRadius: "50%",
          background: color.bg, color: color.text,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700, flexShrink: 0,
        }}>{getInitials(name)}</div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#2C2C2A", margin: 0 }}>{name}</p>
          <p style={{ fontSize: 11, color: "#888780", margin: "2px 0 0" }}>{sub}</p>
        </div>
      </div>
    </Card>
  );
}

// ─── Search Bar ──────────────────────────────────────────────────
function SearchBar({ value, onChange, onSearch, loading }) {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => e.key === "Enter" && onSearch()}
        placeholder="Enter Case ID (e.g. 68a1b2c3d4e5f6a7b8c9d0e1)"
        style={{
          flex: 1, padding: "10px 14px", fontSize: 13,
          border: "0.5px solid #D3D1C7", borderRadius: 10,
          outline: "none", background: "#FAFAF8", color: "#2C2C2A",
          fontFamily: "monospace",
        }}
      />
      <button
        onClick={onSearch}
        disabled={loading}
        style={{
          padding: "10px 18px", fontSize: 13, fontWeight: 600,
          background: "#534AB7", color: "#fff",
          border: "none", borderRadius: 10, cursor: "pointer",
          opacity: loading ? 0.7 : 1, transition: "opacity 0.2s",
        }}
      >
        {loading ? "..." : "Track"}
      </button>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────
export default function CaseTracker() {
  const [caseId, setCaseId] = useState("");
  const [caseData, setCaseData] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  // Demo mode — prefill with mock data
  const [demoMode, setDemoMode] = useState(false);

  const mockCase = {
    _id: "68a1b2c3d4e5f6a7b8c9d0e1",
    description: "Theft of iPhone 14 Pro (Space Black) at Sector 22 market on Mar 7, 2025 at approx 6:30 PM. CCTV footage available from nearby shop.",
    status: "Under Investigation",
    complainantId: { username: "Virendra Kumar", phone: "+91 98765 43210" },
    accusedId: { username: "Rahul Sharma", phone: "+91 91234 56789" },
    blockchainHash: "0x9f3a2cd8e1b4c5f2a3b1d9e74f8c2a1b3d5e6f7c8",
    transactionHash: "0x98a7b23c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a",
    createdAt: "2025-03-08T10:42:00Z",
    updatedAt: "2025-03-11T14:30:00Z",
  };

  const mockUpdates = [
    { description: "Case registered in the system", createdAt: "2025-03-08T10:42:00Z", blockchainHash: "0xabc123...def4", transactionHash: "0x111aaa...222b" },
    { description: "FIR filed. Assigned to PS Sector 17, Chandigarh", createdAt: "2025-03-09T14:15:00Z", blockchainHash: "0xbcd234...ef56", transactionHash: "0x222bbb...333c" },
    { description: "Investigation started. SI Ravi Kumar (ID: 4421) assigned", createdAt: "2025-03-11T14:30:00Z", blockchainHash: "0xcde345...f678", transactionHash: "0x333ccc...444d" },
  ];

  async function fetchCase() {
    if (!caseId.trim()) { setError("Please enter a Case ID"); return; }
    setLoading(true); setError(""); setCaseData(null); setUpdates([]);
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const [caseRes, updatesRes] = await Promise.all([
        fetch(`${API_BASE}/cases/${caseId.trim()}`, { headers }),
        fetch(`${API_BASE}/cases/${caseId.trim()}/updates`, { headers }),
      ]);
      if (!caseRes.ok) throw new Error("Case not found");
      const cData = await caseRes.json();
      const uData = await updatesRes.json();
      setCaseData(cData);
      setUpdates(Array.isArray(uData) ? uData : []);
    } catch (err) {
      setError(err.message || "Failed to fetch case");
    } finally {
      setLoading(false);
    }
  }

  function loadDemo() {
    setCaseData(mockCase);
    setUpdates(mockUpdates);
    setCaseId(mockCase._id);
    setDemoMode(true);
    setError("");
  }

  function copyText(text, key) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(""), 1800);
    });
  }

  const activeCase = caseData;
  const stepIdx = activeCase ? getStepIndex(activeCase.status) : -1;
  const statusColor = activeCase ? (statusColors[activeCase.status] || statusColors["Registered"]) : null;

  const stepDates = {};
  updates.forEach(u => {
    if (u.description?.toLowerCase().includes("register")) stepDates[0] = new Date(u.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    if (u.description?.toLowerCase().includes("fir")) stepDates[1] = new Date(u.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    if (u.description?.toLowerCase().includes("investigat")) stepDates[2] = new Date(u.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    if (u.description?.toLowerCase().includes("court")) stepDates[3] = new Date(u.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    if (u.description?.toLowerCase().includes("clos")) stepDates[4] = new Date(u.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  });

  return (
    <div style={{
      minHeight: "100vh", background: "#F6F5F0",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      padding: "24px 16px 48px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing: border-box; }
        input:focus { border-color: #534AB7 !important; box-shadow: 0 0 0 3px #EEEDFE; }
      `}</style>

      <div style={{ maxWidth: 600, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 28, animation: "fadeUp 0.5s ease" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8, background: "#534AB7",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
            </div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#2C2C2A", margin: 0 }}>Case Tracker</h1>
          </div>
          <p style={{ fontSize: 13, color: "#888780", margin: 0 }}>Track your complaint status on blockchain</p>
        </div>

        {/* Search */}
        <Card style={{ marginBottom: 16, animation: "fadeUp 0.5s ease 0.05s both" }}>
          <SearchBar value={caseId} onChange={setCaseId} onSearch={fetchCase} loading={loading} />
          {error && (
            <p style={{ fontSize: 12, color: "#A32D2D", margin: "8px 0 0", padding: "6px 10px", background: "#FCEBEB", borderRadius: 6 }}>
              {error}
            </p>
          )}
          <div style={{ marginTop: 10, display: "flex", gap: 8, alignItems: "center" }}>
            <p style={{ fontSize: 11, color: "#B4B2A9", margin: 0 }}>Don't have a case ID?</p>
            <button onClick={loadDemo} style={{
              fontSize: 11, color: "#534AB7", background: "none",
              border: "none", cursor: "pointer", fontWeight: 600, padding: 0,
            }}>Load demo case →</button>
          </div>
        </Card>

        {/* Loading skeleton */}
        {loading && (
          <div style={{ animation: "fadeUp 0.3s ease" }}>
            <Card style={{ marginBottom: 12 }}>
              <Skeleton h={20} w="60%" mb={8} />
              <Skeleton h={14} w="40%" mb={16} />
              <Skeleton h={12} mb={8} />
              <Skeleton h={12} w="80%" mb={8} />
              <Skeleton h={12} w="50%" />
            </Card>
          </div>
        )}

        {/* Case Data */}
        {activeCase && !loading && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>

            {/* Status Banner */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "flex-start",
              marginBottom: 14,
            }}>
              <div>
                <p style={{ fontSize: 11, color: "#888780", margin: "0 0 3px" }}>
                  Case #{activeCase._id?.slice(-8)?.toUpperCase() || "—"}
                  {demoMode && <span style={{ marginLeft: 6, fontSize: 10, background: "#FAEEDA", color: "#854F0B", padding: "1px 6px", borderRadius: 4, fontWeight: 600 }}>DEMO</span>}
                </p>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: "#2C2C2A", margin: 0, lineHeight: 1.3 }}>
                  {activeCase.description?.slice(0, 52)}{activeCase.description?.length > 52 ? "..." : ""}
                </h2>
              </div>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                fontSize: 11, fontWeight: 600, padding: "5px 10px", borderRadius: 20,
                background: statusColor.bg, color: statusColor.text,
                flexShrink: 0, marginLeft: 8,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: statusColor.dot }} />
                {activeCase.status}
              </span>
            </div>

            {/* Timeline */}
            <Card style={{ marginBottom: 12 }}>
              <SectionLabel>Case progress</SectionLabel>
              {statusSteps.map((step, i) => {
                const state = i < stepIdx ? "done" : i === stepIdx ? "current" : "todo";
                const updateForStep = updates.find(u => u.description?.toLowerCase().includes(step.toLowerCase().split(" ")[0]));
                return (
                  <TimelineStep
                    key={step}
                    label={step}
                    date={stepDates[i]}
                    note={state === "current" && updateForStep ? updateForStep.description : undefined}
                    state={state}
                    isLast={i === statusSteps.length - 1}
                  />
                );
              })}
            </Card>

            {/* Complainant / Accused */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
              <PersonCard
                label="Complainant"
                name={activeCase.complainantId?.username || "Unknown"}
                sub={activeCase.complainantId?.phone || "—"}
                color={{ bg: "#E1F5EE", text: "#0F6E56" }}
              />
              <PersonCard
                label="Accused"
                name={activeCase.accusedId?.username || "Unknown"}
                sub={activeCase.accusedId?.phone || "—"}
                color={{ bg: "#FAECE7", text: "#993C1D" }}
              />
            </div>

            {/* Description */}
            <Card style={{ marginBottom: 12 }}>
              <SectionLabel>Description</SectionLabel>
              <p style={{ fontSize: 13, color: "#2C2C2A", lineHeight: 1.65, margin: 0 }}>
                {activeCase.description}
              </p>
            </Card>

            {/* Blockchain */}
            <Card style={{ marginBottom: 12 }}>
              <SectionLabel>Blockchain verification</SectionLabel>
              {[
                { label: "Blockchain hash", value: truncateHash(activeCase.blockchainHash), full: activeCase.blockchainHash, key: "bh" },
                { label: "Transaction hash", value: truncateHash(activeCase.transactionHash), full: activeCase.transactionHash, key: "tx" },
              ].map(row => (
                <div key={row.key} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "9px 0", borderBottom: "0.5px solid #E8E8E5",
                }}>
                  <span style={{ fontSize: 12, color: "#888780" }}>{row.label}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 11, fontFamily: "monospace", color: "#185FA5" }}>{row.value}</span>
                    <button onClick={() => copyText(row.full, row.key)} style={{
                      background: "none", border: "none", cursor: "pointer",
                      fontSize: 10, color: copied === row.key ? "#1D9E75" : "#B4B2A9",
                      padding: "2px 4px", borderRadius: 4,
                    }}>{copied === row.key ? "✓" : "copy"}</button>
                  </div>
                </div>
              ))}
              <div style={{ padding: "9px 0 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "#888780" }}>Verification</span>
                <span style={{
                  fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 20,
                  background: "#E1F5EE", color: "#0F6E56",
                }}>✓ Verified on-chain</span>
              </div>
            </Card>

            {/* Case Details */}
            <Card style={{ marginBottom: 12 }}>
              <SectionLabel>Case details</SectionLabel>
              <InfoRow label="Filed on" value={new Date(activeCase.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })} />
              <InfoRow label="Last updated" value={new Date(activeCase.updatedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })} />
              <InfoRow label="Case ID" value={activeCase._id} mono />
              <InfoRow label="Status" value={activeCase.status} last />
            </Card>

            {/* Updates Log */}
            {updates.length > 0 && (
              <Card>
                <SectionLabel>Activity log</SectionLabel>
                {updates.map((u, i) => (
                  <div key={i} style={{
                    display: "flex", gap: 12,
                    paddingBottom: i < updates.length - 1 ? 14 : 0,
                    borderBottom: i < updates.length - 1 ? "0.5px solid #E8E8E5" : "none",
                    marginBottom: i < updates.length - 1 ? 14 : 0,
                  }}>
                    <div style={{
                      width: 7, height: 7, borderRadius: "50%",
                      background: "#534AB7", flexShrink: 0, marginTop: 5,
                    }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 12, color: "#2C2C2A", margin: "0 0 3px", lineHeight: 1.5 }}>{u.description}</p>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <p style={{ fontSize: 11, color: "#B4B2A9", margin: 0 }}>
                          {new Date(u.createdAt).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </p>
                        {u.transactionHash && (
                          <span style={{ fontSize: 10, fontFamily: "monospace", color: "#185FA5" }}>
                            {truncateHash(u.transactionHash)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </Card>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
