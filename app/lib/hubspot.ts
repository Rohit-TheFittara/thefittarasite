type HubspotFormOptions = {
  portalId: string;
  formId: string;
  target: string;
  redirectUrl?: string;
  onFormReady?: (form: HTMLFormElement) => void;
  onFormSubmit?: (form: HTMLFormElement) => void;
  onFormSubmitted?: (form: HTMLFormElement) => void;
};

const HUBSPOT_SCRIPT_ID = "hubspot-forms-script";
const UTM_STORAGE_KEY = "fittara_utm_params";

function isBrowser() {
  return typeof window !== "undefined";
}

export function loadHubspotScript(): Promise<void> {
  if (!isBrowser()) {
    return Promise.resolve();
  }

  const existingScript = document.getElementById(
    HUBSPOT_SCRIPT_ID
  ) as HTMLScriptElement | null;
  if (existingScript) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hbspt = (window as any).hbspt;
    if (hbspt?.forms?.create) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener(
        "error",
        () => reject(new Error("Failed to load HubSpot forms script.")),
        { once: true }
      );
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = HUBSPOT_SCRIPT_ID;
    script.src = "https://js.hsforms.net/forms/v2.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load HubSpot forms script."));
    document.body.appendChild(script);
  });
}

function readUtmParams(): Record<string, string> {
  if (!isBrowser()) {
    return {};
  }

  const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as Record<string, string>;
    } catch {
      sessionStorage.removeItem(UTM_STORAGE_KEY);
    }
  }

  const params = new URLSearchParams(window.location.search);
  const utms: Record<string, string> = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach(
    (key) => {
      const value = params.get(key);
      if (value) {
        utms[key] = value;
      }
    }
  );

  if (Object.keys(utms).length > 0) {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utms));
  }

  return utms;
}

function applyHiddenFieldValues(
  form: HTMLFormElement,
  values: Record<string, string>
) {
  Object.entries(values).forEach(([key, value]) => {
    const input = form.querySelector<HTMLInputElement>(`input[name="${key}"]`);
    if (input && !input.value) {
      input.value = value;
    }
  });
}

export function createHubspotForm(options: HubspotFormOptions) {
  if (!isBrowser()) {
    return;
  }

  const target = document.querySelector(options.target);
  if (!target || target.childElementCount > 0) {
    return;
  }

  const utmValues = readUtmParams();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hbspt = (window as any).hbspt;
  if (!hbspt?.forms?.create) {
    return;
  }

  hbspt.forms.create({
    portalId: options.portalId,
    formId: options.formId,
    target: options.target,
    redirectUrl: options.redirectUrl,
    onFormReady: (form: HTMLFormElement) => {
      applyHiddenFieldValues(form, utmValues);
      options.onFormReady?.(form);
    },
    onFormSubmit: (form: HTMLFormElement) => {
      options.onFormSubmit?.(form);
    },
    onFormSubmitted: (form: HTMLFormElement) => {
      options.onFormSubmitted?.(form);
    },
  });
}
