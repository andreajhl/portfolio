import { useEffect } from "react";

const IubendaPrivacyPolicyPT = () => {
  const Loader = () => {
    const s = document.createElement("script"),
      tag = document.getElementsByTagName("script")[0];
    s.src = "https://cdn.iubenda.com/iubenda.js";
    tag.parentNode.insertBefore(s, tag);
  };
  useEffect(() => {
    Loader();
  }, []);
  return (
    <div className="container-text">
      <a
        href="https://www.iubenda.com/privacy-policy/86085772"
        className="iubenda-nostyle no-brand iubenda-noiframe iubenda-embed iub-legal-only iub-no-markup iubenda-noiframe iub-body-embed"
        title="Privacy Policy"
      >
        Política de Privacidade
      </a>
    </div>
  );
};
export { IubendaPrivacyPolicyPT };
