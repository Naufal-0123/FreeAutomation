import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Shell from "../components/Shell";

const fmt = (v) =>
  v ? new Date(v).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" }) : "-";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  async function handleLogout() {
    setBusy(true);
    await logout();
    navigate("/login", { replace: true });
  }

  return (
    <Shell step={busy ? 5 : 4}>
      <section className="card">
        <div className="avatar" aria-hidden="true">{user.email?.[0]?.toUpperCase()}</div>
        <h1 data-testid="dashboard-title">Login berhasil</h1>
        <p className="lead">
          Masuk sebagai <strong data-testid="user-email">{user.email}</strong>
        </p>

        <dl className="info">
          <div><dt>User ID</dt><dd className="mono" data-testid="user-uid">{user.uid}</dd></div>
          <div><dt>Akun dibuat</dt><dd>{fmt(user.metadata.creationTime)}</dd></div>
          <div><dt>Login terakhir</dt><dd>{fmt(user.metadata.lastSignInTime)}</dd></div>
        </dl>

        <button type="button" className="btn outline" onClick={handleLogout} disabled={busy} data-testid="logout-button">
          {busy && <span className="spinner" aria-hidden="true" />}
          {busy ? "Keluar…" : "Keluar"}
        </button>
      </section>
    </Shell>
  );
}