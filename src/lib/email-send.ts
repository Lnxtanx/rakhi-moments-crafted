/**
 * Sends the Rakha Bandhan email straight from the browser via EmailJS
 * (https://www.emailjs.com). No mail client is opened; the message is handed
 * to EmailJS's API, which delivers it using the verified sender you configure
 * in your EmailJS dashboard.
 *
 * Expected environment variables (set in a local `.env` / Lovable settings):
 *   VITE_EMAILJS_SERVICE_ID  — Service ID, e.g. "service_xxxxxxx"
 *   VITE_EMAILJS_TEMPLATE_ID — Template ID, e.g. "template_xxxxxxx"
 *   VITE_EMAILJS_PUBLIC_KEY  — Public key, e.g. "xxxxxxxxxxxxxxx"
 */

type EmailJsConfig = {
  serviceId: string | undefined;
  templateId: string | undefined;
  publicKey: string | undefined;
};

const config: EmailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

const PLACEHOLDER = new Set(["your_service_id", "your_template_id", "your_public_key"]);

export function isEmailJsConfigured(): boolean {
  const { serviceId, templateId, publicKey } = config;
  return Boolean(
    serviceId && templateId && publicKey && !PLACEHOLDER.has(serviceId) && !PLACEHOLDER.has(templateId) && !PLACEHOLDER.has(publicKey),
  );
}

export type RakhiEmailParams = {
  toEmail: string;
  toName: string;
  fromName: string;
  replyTo: string;
  subject: string;
  message: string;
  rakhiLink: string;
};

const EMAIL_JS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

/** Sends the Rakhi email through EmailJS. Resolves only when EmailJS confirms
 *  it accepted the send (HTTP 200); throws otherwise. */
export async function sendRakhiEmail(params: RakhiEmailParams): Promise<void> {
  if (!isEmailJsConfigured()) {
    throw new Error("EmailJS is not configured (missing VITE_EMAILJS_* keys).");
  }

  const response = await fetch(EMAIL_JS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: config.serviceId,
      template_id: config.templateId,
      user_id: config.publicKey,
      template_params: {
        to_email: params.toEmail,
        to_name: params.toName,
        from_name: params.fromName,
        reply_to: params.replyTo,
        subject: params.subject,
        message: params.message,
        rakhi_link: params.rakhiLink,
      },
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`EmailJS send failed (${response.status})${detail ? `: ${detail}` : ""}`);
  }
}