import { useState } from "react"
import { loginUser } from "../services/authService"
import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await loginUser({ phone, password })
      if (res.token) navigate("/dashboard")
    } catch (err) {
      alert("Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        .login-wrap {
          display: flex;
          min-height: 100vh;
          overflow: hidden;
        }

        /* ── LEFT PANEL ── */
        .login-left {
          flex: 1;
          background: #0b0e1a;
          padding: 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }
        .login-left-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 20% 80%, rgba(83,74,183,0.35) 0%, transparent 65%),
            radial-gradient(ellipse 60% 40% at 80% 20%, rgba(29,158,117,0.2) 0%, transparent 60%);
          pointer-events: none;
        }
        .login-left-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }
        .login-brand {
          position: relative;
          z-index: 1;
        }
        .login-brand-icon {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, #534AB7, #1D9E75);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 32px;
        }
        .login-brand h1 {
          font-family: 'Syne', sans-serif;
          font-size: 30px;
          font-weight: 800;
          color: #fff;
          line-height: 1.2;
          margin: 0 0 12px;
        }
        .login-brand p {
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          line-height: 1.7;
          max-width: 260px;
          font-weight: 300;
          margin: 0;
        }
        .login-pills {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .login-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          background: rgba(255,255,255,0.06);
          border: 0.5px solid rgba(255,255,255,0.1);
          border-radius: 10px;
        }
        .login-pill span {
          font-size: 13px;
          color: rgba(255,255,255,0.7);
          font-weight: 400;
        }
        .pill-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .pill-dot-green { background: #1D9E75; box-shadow: 0 0 8px #1D9E75; }
        .pill-dot-blue  { background: #378ADD; box-shadow: 0 0 8px #378ADD; }
        .pill-dot-purple{ background: #7F77DD; box-shadow: 0 0 8px #7F77DD; }

        /* ── RIGHT PANEL ── */
        .login-right {
          flex: 1.2;
          background: #fff;
          padding: 56px 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 340px;
        }
        .login-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          background: rgba(83,74,183,0.08);
          border: 0.5px solid rgba(83,74,183,0.2);
          border-radius: 20px;
          font-size: 11px;
          color: #534AB7;
          font-weight: 500;
          margin-bottom: 20px;
          width: fit-content;
        }
        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #1D9E75;
          animation: badgePulse 2s infinite;
        }
        @keyframes badgePulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        .login-head {
          margin-bottom: 36px;
        }
        .login-eyebrow {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #534AB7;
          margin-bottom: 10px;
        }
        .login-head h2 {
          font-family: 'Syne', sans-serif;
          font-size: 32px;
          font-weight: 700;
          color: #0b0e1a;
          line-height: 1.1;
          margin: 0 0 8px;
        }
        .login-head p {
          font-size: 14px;
          color: #888;
          font-weight: 300;
          margin: 0;
        }

        /* ── FIELDS ── */
        .login-field {
          margin-bottom: 20px;
        }
        .login-field label {
          display: block;
          font-size: 11px;
          font-weight: 500;
          color: #888;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .login-input-wrap {
          position: relative;
        }
        .login-input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0.35;
          display: flex;
          pointer-events: none;
        }
        .login-input-wrap input {
          width: 100%;
          padding: 13px 16px 13px 42px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          background: #f5f5f7;
          border: 1px solid #e5e5e8;
          border-radius: 10px;
          color: #0b0e1a;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          box-sizing: border-box;
        }
        .login-input-wrap input:focus {
          border-color: #534AB7;
          background: #fff;
        }
        .login-input-wrap input::placeholder {
          color: #bbb;
        }
        .login-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          font-size: 11px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          color: #888;
          cursor: pointer;
          padding: 4px 6px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .login-toggle:hover { color: #534AB7; }

        .login-forgot {
          display: block;
          text-align: right;
          font-size: 12px;
          color: #534AB7;
          margin-top: 8px;
          font-weight: 500;
          cursor: pointer;
          background: none;
          border: none;
          font-family: 'DM Sans', sans-serif;
        }
        .login-forgot:hover { text-decoration: underline; }

        /* ── SUBMIT ── */
        .login-submit {
          width: 100%;
          margin-top: 28px;
          padding: 14px;
          background: #0b0e1a;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          letter-spacing: 0.06em;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          position: relative;
          overflow: hidden;
        }
        .login-submit-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(83,74,183,0.4), rgba(29,158,117,0.3));
          pointer-events: none;
        }
        .login-submit:hover:not(:disabled) {
          opacity: 0.88;
          transform: translateY(-1px);
        }
        .login-submit:active:not(:disabled) { transform: translateY(0); }
        .login-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        /* ── DIVIDER + SIGNUP ── */
        .login-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 24px 0;
          font-size: 12px;
          color: #bbb;
        }
        .login-divider::before,
        .login-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e5e5e8;
        }
        .login-signup {
          text-align: center;
          font-size: 13px;
          color: #888;
        }
        .login-signup button {
          color: #534AB7;
          font-weight: 500;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          padding: 0;
          margin-left: 4px;
        }
        .login-signup button:hover { text-decoration: underline; }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .login-left { display: none; }
          .login-right { padding: 40px 28px; min-width: unset; }
        }
      `}</style>

      <div className="login-wrap">

        {/* Left Panel */}
        <div className="login-left">
          <div className="login-left-bg" />
          <div className="login-left-grid" />

          <div className="login-brand">
            <div className="login-brand-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="#fff" strokeWidth="2" strokeLinecap="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h1>Secure Complaint System</h1>
            <p>Track complaints, manage cases and ensure transparency with a blockchain-powered platform.</p>
          </div>

          <div className="login-pills">
            <div className="login-pill">
              <div className="pill-dot pill-dot-green" />
              <span>Blockchain secured & tamper-proof</span>
            </div>
            <div className="login-pill">
              <div className="pill-dot pill-dot-blue" />
              <span>Real-time complaint tracking</span>
            </div>
            <div className="login-pill">
              <div className="pill-dot pill-dot-purple" />
              <span>End-to-end encryption</span>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="login-right">

          <div className="login-badge">
            <div className="badge-dot" />
            System operational
          </div>

          <div className="login-head">
            <div className="login-eyebrow">Secure access</div>
            <h2>Welcome back</h2>
            <p>Sign in to your account to continue</p>
          </div>

          <form onSubmit={submit}>

            <div className="login-field">
              <label>Phone number</label>
              <div className="login-input-wrap">
                <div className="login-input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.26 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.97-1.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="login-field">
              <label>Password</label>
              <div className="login-input-wrap">
                <div className="login-input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="login-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <button type="button" className="login-forgot">Forgot password?</button>
            </div>

            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >
              <div className="login-submit-glow" />
              <span>{loading ? "Authenticating..." : "Sign in"}</span>
            </button>

          </form>

          <div className="login-divider">or</div>

          <div className="login-signup">
            Don't have an account?
            <button type="button">Create one free</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login