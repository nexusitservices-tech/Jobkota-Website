import { useEffect } from "react";

function setMeta(name: string, content: string) {
  let element = document.querySelector(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setJsonLd(id: string, jsonLdObj: Record<string, any>) {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.text = JSON.stringify(jsonLdObj);
}

export default function useSeo(
  title?: string | null,
  description?: string,
  jsonLd?: Record<string, any>
) {
  useEffect(() => {
    if (title) {
      document.title = `${title} · JobKota`;
    } else {
      document.title = `JobKota — Talent. Opportunities. Growth.`;
    }

    if (description) {
      setMeta("description", description);
    }

    const scriptId = "jobkota-jsonld";
    if (jsonLd) {
      setJsonLd(scriptId, jsonLd);
    }

    return () => {
      const script = document.getElementById(scriptId);
      if (script && jsonLd) {
        script.remove();
      }
    };
  }, [title, description, jsonLd]);
}
