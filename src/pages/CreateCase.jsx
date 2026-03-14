import { useState } from "react"
import { createCase } from "../services/caseService"

function CreateCase() {
  const [form, setForm] = useState({
    complainantId: "",
    accusedId: "",
    description: ""
  })
  const [focused, setFocused] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await createCase(form)
      setSubmitted(true)
      setTimeout(() => {
        alert("Case created " + res._id)
        setSubmitted(false)
      }, 800)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Mono:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .cc-root {
          min-height: 100vh;
          background: #0a0a0f;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          font-family: 'DM Mono', monospace;
          position: relative;
          overflow: hidden;
        }

        .cc-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 40% at 20% 20%, rgba(180,140,80,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 80% 80%, rgba(80,100,180,0.06) 0%, transparent 60%);
          pointer-events: none;
        }

        .cc-noise {
          position: fixed;
          inset: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px;
          pointer-events: none;
        }

        .cc-card {
          width: 100%;
          max-width: 560px;
          background: rgba(14, 14, 20, 0.95);
          border: 1px solid rgba(180, 140, 80, 0.18);
          border-radius: 2px;
          padding: 3rem 3rem 2.5rem;
          position: relative;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.03),
            0 32px 80px rgba(0,0,0,0.6),
            inset 0 1px 0 rgba(180,140,80,0.12);
          animation: cardIn 0.6s cubic-bezier(0.22,1,0.36,1) both;
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .cc-corner {
          position: absolute;
          width: 18px;
          height: 18px;
          border-color: rgba(180,140,80,0.5);
          border-style: solid;
        }
        .cc-corner.tl { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
        .cc-corner.tr { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
        .cc-corner.bl { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; }
        .cc-corner.br { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }

        .cc-header {
          margin-bottom: 2.5rem;
          animation: fadeUp 0.5s 0.1s cubic-bezier(0.22,1,0.36,1) both;
        }

        .cc-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(180,140,80,0.7);
          margin-bottom: 1rem;
        }

        .cc-badge-dot {
          width: 5px;
          height: 5px;
          background: rgba(180,140,80,0.7);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }

        .cc-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 5vw, 2.8rem);
          font-weight: 300;
          color: #f0ece2;
          letter-spacing: -0.01em;
          line-height: 1.1;
        }

        .cc-title span {
          color: rgba(180,140,80,0.9);
          font-style: italic;
        }

        .cc-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(180,140,80,0.3) 0%, rgba(180,140,80,0.08) 60%, transparent 100%);
          margin: 1.2rem 0 0;
        }

        .cc-form {
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
        }

        .cc-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          animation: fadeUp 0.5s 0.2s cubic-bezier(0.22,1,0.36,1) both;
        }

        .cc-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          animation: fadeUp 0.5s 0.3s cubic-bezier(0.22,1,0.36,1) both;
          position: relative;
        }

        .cc-label {
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(180,140,80,0.6);
          transition: color 0.2s;
        }

        .cc-field:focus-within .cc-label {
          color: rgba(180,140,80,1);
        }

        .cc-input {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 2px;
          padding: 0.75rem 1rem;
          color: #e8e4d8;
          font-family: 'DM Mono', monospace;
          font-size: 0.78rem;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          width: 100%;
        }

        .cc-input::placeholder {
          color: rgba(255,255,255,0.15);
          font-style: italic;
        }

        .cc-input:focus {
          border-color: rgba(180,140,80,0.5);
          background: rgba(180,140,80,0.04);
          box-shadow: 0 0 0 3px rgba(180,140,80,0.06), inset 0 1px 0 rgba(180,140,80,0.05);
        }

        .cc-textarea {
          resize: vertical;
          min-height: 120px;
          line-height: 1.6;
        }

        .cc-field-desc {
          animation: fadeUp 0.5s 0.35s cubic-bezier(0.22,1,0.36,1) both;
        }

        .cc-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.6rem;
          animation: fadeUp 0.5s 0.4s cubic-bezier(0.22,1,0.36,1) both;
          gap: 1rem;
        }

        .cc-meta {
          font-size: 0.58rem;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.2);
          line-height: 1.5;
        }

        .cc-btn {
          position: relative;
          padding: 0.85rem 2rem;
          background: transparent;
          border: 1px solid rgba(180,140,80,0.5);
          color: rgba(180,140,80,0.9);
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 2px;
          overflow: hidden;
          transition: color 0.3s, border-color 0.3s;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .cc-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(180,140,80,0.08);
          transform: translateX(-100%);
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
        }

        .cc-btn:hover::before, .cc-btn.loading::before {
          transform: translateX(0);
        }

        .cc-btn:hover {
          color: rgba(180,140,80,1);
          border-color: rgba(180,140,80,0.8);
        }

        .cc-btn:active { transform: scale(0.98); }

        .cc-btn.submitted {
          border-color: rgba(80,180,120,0.6);
          color: rgba(80,180,120,0.9);
        }

        .cc-btn-inner {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .cc-spinner {
          width: 10px;
          height: 10px;
          border: 1px solid currentColor;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 480px) {
          .cc-card { padding: 2rem 1.5rem; }
          .cc-row { grid-template-columns: 1fr; }
          .cc-footer { flex-direction: column; align-items: flex-start; }
          .cc-btn { width: 100%; justify-content: center; }
        }
      `}</style>

      <div className="cc-root">
        <div className="cc-noise" />
        <div className="cc-card">
          <div className="cc-corner tl" />
          <div className="cc-corner tr" />
          <div className="cc-corner bl" />
          <div className="cc-corner br" />

          <div className="cc-header">
            <div className="cc-badge">
              <div className="cc-badge-dot" />
              Legal Filing System
            </div>
            <h1 className="cc-title">
              File a New <span>Case</span>
            </h1>
            <div className="cc-divider" />
          </div>

          <form className="cc-form" onSubmit={submit}>
            <div className="cc-row">
              <div className="cc-field">
                <label className="cc-label">Complainant ID</label>
                <input
                  className="cc-input"
                  placeholder="e.g. USR-00421"
                  value={form.complainantId}
                  onChange={e => setForm({ ...form, complainantId: e.target.value })}
                  onFocus={() => setFocused("complainant")}
                  onBlur={() => setFocused("")}
                  required
                />
              </div>
              <div className="cc-field">
                <label className="cc-label">Accused ID</label>
                <input
                  className="cc-input"
                  placeholder="e.g. USR-00839"
                  value={form.accusedId}
                  onChange={e => setForm({ ...form, accusedId: e.target.value })}
                  onFocus={() => setFocused("accused")}
                  onBlur={() => setFocused("")}
                  required
                />
              </div>
            </div>

            <div className="cc-field cc-field-desc">
              <label className="cc-label">Case Description</label>
              <textarea
                className="cc-input cc-textarea"
                placeholder="Provide a full and accurate account of the incident..."
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                onFocus={() => setFocused("description")}
                onBlur={() => setFocused("")}
                required
              />
            </div>

            <div className="cc-footer">
              <p className="cc-meta">
                All submissions are encrypted<br />and admissible as legal record
              </p>
              <button
                type="submit"
                className={`cc-btn ${loading ? "loading" : ""} ${submitted ? "submitted" : ""}`}
                disabled={loading}
              >
                <span className="cc-btn-inner">
                  {loading && <span className="cc-spinner" />}
                  {submitted ? "Filed ✓" : loading ? "Filing..." : "File Case →"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateCase