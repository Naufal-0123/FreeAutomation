export const MailIcon = () => (
  <svg className="field-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M4 7.5l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const LockIcon = () => (
  <svg className="field-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <rect x="5" y="10.5" width="14" height="9.5" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8.5 10.5V8a3.5 3.5 0 017 0v2.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const EyeIcon = ({ off }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="2.8" fill="none" stroke="currentColor" strokeWidth="1.8" />
    {off && <path d="M4 4l16 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />}
  </svg>
);