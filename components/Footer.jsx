import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="logo-badge footer-logo" aria-hidden="true">
            <Logo className="logo-mark" />
          </span>
          <strong>CivicVoice</strong>
        </div>
        <p>Empowering students to participate in democracy.</p>
      </div>
    </footer>
  );
}
