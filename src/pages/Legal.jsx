import { SITE } from "../data/site.js";

export function Privacy() {
  return (
    <div className="legal">
      <h1>Privacy statement</h1>
      <p>Last updated: October 2026</p>
      <h2>Who we are</h2>
      <p>{SITE.name} ("we", "us") operates this website. Contact us at {SITE.email}.</p>
      <h2>What we collect</h2>
      <p>This website does not collect personal data through forms. Study loan applications are made on our separate application portal, which has its own privacy terms. Please read them before you apply.</p>
      <h2>Analytics and cookies</h2>
      <p>We only use cookies as described in our Cookie policy.</p>
      <h2>Third-party links</h2>
            <p>We link to our application portal and social media pages, and we show a Google Map on our contact section. Google may collect data such as your IP address and set cookies when the map loads. We are not responsible for how these services handle your data.</p>
      <h2>Your rights</h2>
      <p>Under applicable data protection laws (such as the Kenya Data Protection Act, 2019) you may ask what data we hold about you, and request correction or deletion. Email {SITE.email}.</p>
      <h2>Changes</h2>
      <p>We will post any updates to this page.</p>
      <p><em>Have a lawyer review this text before you publish.</em></p>
    </div>
  );
}

export function Cookies() {
  return (
    <div className="legal">
      <h1>Cookie policy</h1>
      <p>Last updated: October 2026</p>
      <h2>What are cookies?</h2>
      <p>Cookies are small files a website stores in your browser.</p>
      <h2>What we use</h2>
      <ul>
        <li><b>Essential:</b> we store your cookie choice so we do not ask you again.</li>
        <li><b>Analytics (optional):</b> only if you accept. Add the cookies your analytics tool sets here, if you use one.</li>
                <li><b>Google Maps:</b> the map in our contact section is provided by Google and may set its own cookies. See Google's privacy policy for details.</li>
      </ul>
      <h2>Managing cookies</h2>
      <p>You can clear or block cookies in your browser settings. You can also clear your choice to see the banner again.</p>
      <p><em>Update this list to match the tools you actually use.</em></p>
    </div>
  );
}