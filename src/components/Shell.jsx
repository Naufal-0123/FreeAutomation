const DEFAULT_STEPS = [
  "Buka halaman login",
  "Isi email dan password",
  "Klik Masuk",
  "Masuk ke dashboard",
  "Klik Keluar",
];

const Check = () => (
  <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
    <path
      d="M3.5 8.5l3 3 6-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Shell({ step, steps = DEFAULT_STEPS, children }) {
  return (
    <div className="shell">
      <aside className="side">
        <div className="brand">
          <span className="brand-mark">
            <Check />
          </span>
          Free Automation
        </div>

        <div className="side-body">
          <h2>Alur automation yang bisa diuji berulang.</h2>
          <p>
            Halaman ini dipakai untuk latihan automation testing dengan Firebase
            Authentication.
          </p>

          <ol
            className="steps"
            aria-label="Skenario pengujian"
            data-testid="steps"
          >
            {steps.map((label, i) => {
              const n = i + 1;
              const state = n < step ? "done" : n === step ? "current" : "todo";
              return (
                <li
                  key={label}
                  className={"step " + state}
                  aria-current={state === "current" ? "step" : undefined}
                >
                  <span className="step-dot">
                    {state === "done" ? <Check /> : n}
                  </span>
                  {label}
                </li>
              );
            })}
          </ol>
        </div>

        <small className="side-foot">React + Vite · Firebase Auth</small>
      </aside>

      <main className="main">{children}</main>
    </div>
  );
}
