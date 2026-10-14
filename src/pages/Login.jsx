import { Component, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Shell from "../components/Shell";
import { MailIcon, LockIcon, EyeIcon } from "../components/icons";

const messages = {
  "auth/invalid-credential": "Email atau password salah.",
  "auth/invalid-email": "Format email tidak valid.",
  "auth/user-disabled": "Akun ini dinonaktifkan.",
  "auth/too-many-requests": "Terlalu banyak percobaan. Coba lagi nanti.",
  "auth/network-request-failed": "Koneksi gagal. Periksa internet kamu.",
};

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const step = busy ? 3 : email || password ? 2 : 1;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }
    setBusy(true);
    try {
      await login(email.trim(), password);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(messages[err.code] || "Login gagal: " + err.code);
      setBusy(false);
    }
  }

  return (
    <Shell step={step}>
      <section className="card">
        <h1 data-testid="login-title">Selamat datang kembali</h1>
        <p className="lead">Masuk dengan akun yang terdaftar di Firebase.</p>

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
              autoComplete="current-password"
              placeholder="Masukkan password"
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

          <div className="alert" role="alert" data-testid="error-message">
            {error}
          </div>

          <button
            type="submit"
            className="btn primary"
            disabled={busy}
            id="login-button"
          >
            {busy && <span className="spinner" aria-hidden="true" />}
            {busy ? "Memeriksa…" : "Masuk"}
          </button>
        </form>

        <p className="switch">
          Belum punya akun?{" "}
          <Link to="/register" id="link-register">
            Daftar
          </Link>
        </p>
      </section>
    </Shell>
  );
}
