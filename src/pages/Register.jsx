import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Shell from "../components/Shell";
import { MailIcon, LockIcon, EyeIcon } from "../components/icons";

const REGISTER_STEPS = [
  "Buka halaman register",
  "Isi email dan password",
  "Klik Daftar",
  "Masuk ke dashboard",
  "Klik Keluar",
];

const messages = {
  "auth/email-already-in-use": "Email ini sudah terdaftar. Silakan masuk.",
  "auth/invalid-email": "Format email tidak valid.",
  "auth/weak-password": "Password terlalu lemah. Gunakan minimal 6 karakter.",
  "auth/operation-not-allowed":
    "Pendaftaran email/password belum diaktifkan di Firebase.",
  "auth/network-request-failed": "Koneksi gagal. Periksa internet kamu.",
};

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const step = busy ? 3 : email || password || confirm ? 2 : 1;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password || !confirm) {
      setError("Semua kolom wajib diisi.");
      return;
    }
    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }
    if (password !== confirm) {
      setError("Konfirmasi password tidak sama.");
      return;
    }
    setBusy(true);
    try {
      await register(email.trim(), password); // otomatis login setelah daftar
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(messages[err.code] || "Pendaftaran gagal: " + err.code);
      setBusy(false);
    }
  }

  return (
    <Shell step={step} steps={REGISTER_STEPS}>
      <section className="card">
        <h1 data-testid="register-title">Buat akun baru</h1>
        <p className="lead">Daftar dengan email dan password.</p>

        <form onSubmit={handleSubmit} noValidate>
          <label className="label" htmlFor="email">
            Email
          </label>
          <div className="field">
            <MailIcon />
            <input
              id="email"
              type="email"
              autoComplete="username"
              placeholder="nama@contoh.com"
              data-testid="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <label className="label" htmlFor="password">
            Password
          </label>
          <div className="field">
            <LockIcon />
            <input
              id="password"
              type={show ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Minimal 6 karakter"
              data-testid="password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="icon-btn"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
              data-testid="toggle-password"
            >
              <EyeIcon off={show} />
            </button>
          </div>

          <label className="label" htmlFor="confirm">
            Ulangi password
          </label>
          <div className="field">
            <LockIcon />
            <input
              id="confirm"
              type={show ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Ketik ulang password"
              data-testid="confirm-password-input"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          <div className="alert" role="alert" data-testid="error-message">
            {error}
          </div>

          <button
            type="submit"
            className="btn primary"
            disabled={busy}
            data-testid="register-button"
          >
            {busy && <span className="spinner" aria-hidden="true" />}
            {busy ? "Membuat akun…" : "Daftar"}
          </button>
        </form>

        <p className="switch">
          Sudah punya akun?{" "}
          <Link to="/login" data-testid="link-login">
            Masuk
          </Link>
        </p>
      </section>
    </Shell>
  );
}
