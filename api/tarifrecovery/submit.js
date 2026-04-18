function normalizeText(value) {
  return String(value || '').trim();
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatFieldLabel(key) {
  const labels = {
    audience: 'Audience',
    importsDirectly: 'Imports directly',
    iorConfidence: 'Importer of record confidence',
    entryVolume: 'Entry volume',
    brokerCount: 'Broker count',
    importSpend: 'Import spend',
    dutyExposure: 'Duty exposure',
    dataAvailability: 'Data availability',
    estimateMode: 'Estimate mode',
    priority: 'Priority'
  };
  return labels[key] || key;
}

function toPlainSummary(submission) {
  const qualificationLines = Object.entries(submission.qualification || {}).map(([key, value]) => {
    return `${formatFieldLabel(key)}: ${value || 'Not specified'}`;
  });

  return [
    'New Tariff Recovery Planner submission',
    '',
    `Submitted at: ${submission.submittedAt}`,
    `Name: ${submission.lead.name}`,
    `Company: ${submission.lead.company}`,
    `Email: ${submission.lead.email}`,
    `Role: ${submission.lead.role}`,
    `Phone: ${submission.lead.phone || 'Not provided'}`,
    '',
    'Estimate snapshot',
    `Range: ${submission.estimate?.range || 'N/A'}`,
    `Eligibility: ${submission.estimate?.eligibility || 'N/A'}`,
    `Confidence: ${submission.estimate?.confidence || 'N/A'}`,
    `Opportunity tier: ${submission.estimate?.opportunityTier || 'N/A'}`,
    `Readiness: ${submission.estimate?.readiness || 'N/A'}`,
    `Entries: ${submission.estimate?.entries || 'N/A'}`,
    `Blocker: ${submission.estimate?.blocker || 'N/A'}`,
    `Next step: ${submission.estimate?.nextStep || 'N/A'}`,
    `Explanation: ${submission.estimate?.explanation || 'N/A'}`,
    '',
    'Qualification inputs',
    ...qualificationLines,
    '',
    submission.notes
  ].join('\n');
}

function toHtmlSummary(submission) {
  const qualificationHtml = Object.entries(submission.qualification || {})
    .map(([key, value]) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#64748b;">${escapeHtml(formatFieldLabel(key))}</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a;font-weight:600;">${escapeHtml(value || 'Not specified')}</td></tr>`)
    .join('');

  return `
    <div style="font-family:Inter,Arial,sans-serif;background:#f8fafc;padding:24px;color:#0f172a;">
      <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:20px;overflow:hidden;">
        <div style="padding:24px 28px;background:linear-gradient(135deg,#ff6b35 0%,#f7931e 100%);color:#ffffff;">
          <div style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;opacity:.9;">ZapSight</div>
          <h1 style="margin:10px 0 6px;font-size:28px;line-height:1.15;">New Tariff Recovery Planner submission</h1>
          <p style="margin:0;font-size:14px;opacity:.9;">Submitted at ${escapeHtml(submission.submittedAt)}</p>
        </div>
        <div style="padding:28px;">
          <h2 style="margin:0 0 14px;font-size:18px;">Lead details</h2>
          <p style="margin:0 0 4px;"><strong>Name:</strong> ${escapeHtml(submission.lead.name)}</p>
          <p style="margin:0 0 4px;"><strong>Company:</strong> ${escapeHtml(submission.lead.company)}</p>
          <p style="margin:0 0 4px;"><strong>Email:</strong> ${escapeHtml(submission.lead.email)}</p>
          <p style="margin:0 0 4px;"><strong>Role:</strong> ${escapeHtml(submission.lead.role)}</p>
          <p style="margin:0 0 24px;"><strong>Phone:</strong> ${escapeHtml(submission.lead.phone || 'Not provided')}</p>

          <h2 style="margin:0 0 14px;font-size:18px;">Estimate snapshot</h2>
          <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-bottom:20px;">
            <div style="border:1px solid #e2e8f0;border-radius:16px;padding:14px;"><div style="font-size:12px;color:#64748b;">Range</div><div style="font-size:20px;font-weight:700;">${escapeHtml(submission.estimate?.range || 'N/A')}</div></div>
            <div style="border:1px solid #e2e8f0;border-radius:16px;padding:14px;"><div style="font-size:12px;color:#64748b;">Eligibility</div><div style="font-size:20px;font-weight:700;">${escapeHtml(submission.estimate?.eligibility || 'N/A')}</div></div>
            <div style="border:1px solid #e2e8f0;border-radius:16px;padding:14px;"><div style="font-size:12px;color:#64748b;">Confidence</div><div style="font-size:20px;font-weight:700;">${escapeHtml(submission.estimate?.confidence || 'N/A')}</div></div>
            <div style="border:1px solid #e2e8f0;border-radius:16px;padding:14px;"><div style="font-size:12px;color:#64748b;">Opportunity tier</div><div style="font-size:20px;font-weight:700;">${escapeHtml(submission.estimate?.opportunityTier || 'N/A')}</div></div>
          </div>

          <p style="margin:0 0 8px;"><strong>Readiness:</strong> ${escapeHtml(submission.estimate?.readiness || 'N/A')}</p>
          <p style="margin:0 0 8px;"><strong>Entries:</strong> ${escapeHtml(submission.estimate?.entries || 'N/A')}</p>
          <p style="margin:0 0 8px;"><strong>Blocker:</strong> ${escapeHtml(submission.estimate?.blocker || 'N/A')}</p>
          <p style="margin:0 0 8px;"><strong>Next step:</strong> ${escapeHtml(submission.estimate?.nextStep || 'N/A')}</p>
          <p style="margin:0 0 24px;"><strong>Explanation:</strong> ${escapeHtml(submission.estimate?.explanation || 'N/A')}</p>

          <h2 style="margin:0 0 14px;font-size:18px;">Qualification inputs</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">${qualificationHtml}</table>

          <div style="padding:14px 16px;border-radius:16px;background:#fff7ed;border:1px solid #fdba74;color:#9a3412;">
            ${escapeHtml(submission.notes)}
          </div>
        </div>
      </div>
    </div>
  `;
}

async function forwardToWebhook(emailWebhookUrl, submission) {
  const response = await fetch(emailWebhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submission)
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Email webhook failed: ${text}`);
  }
}

async function sendViaResend(submission) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const to = process.env.TARIFF_RECOVERY_NOTIFICATION_TO;
  const from = process.env.TARIFF_RECOVERY_FROM_EMAIL || 'Tariff Recovery Planner <onboarding@resend.dev>';

  if (!resendApiKey || !to) {
    throw new Error('Resend fallback is not configured');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from,
      to: to.split(',').map((value) => value.trim()).filter(Boolean),
      subject: `Tariff Recovery Planner lead: ${submission.lead.company}`,
      reply_to: submission.lead.email,
      text: toPlainSummary(submission),
      html: toHtmlSummary(submission)
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Resend delivery failed: ${text}`);
  }

  return response.json();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const required = ['name', 'company', 'email', 'role'];
    for (const field of required) {
      if (!normalizeText(payload[field])) {
        return res.status(400).json({ ok: false, error: `Missing ${field}` });
      }
    }

    const submission = {
      source: 'tariff-recovery-planner',
      submittedAt: new Date().toISOString(),
      lead: {
        name: normalizeText(payload.name),
        company: normalizeText(payload.company),
        email: normalizeText(payload.email),
        role: normalizeText(payload.role),
        phone: normalizeText(payload.phone)
      },
      estimate: payload.estimate || null,
      qualification: payload.qualification || null,
      notes: 'Google Sheets / CRM logging still pending until Google auth is refreshed.'
    };

    const emailWebhookUrl = process.env.TARIFF_RECOVERY_EMAIL_WEBHOOK_URL;
    if (emailWebhookUrl) {
      await forwardToWebhook(emailWebhookUrl, submission);
      return res.status(200).json({ ok: true, delivery: 'webhook', pending: ['crm-sheet-auth-refresh'] });
    }

    await sendViaResend(submission);
    return res.status(200).json({ ok: true, delivery: 'resend', pending: ['crm-sheet-auth-refresh'] });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error instanceof Error ? error.message : 'Unknown error' });
  }
}
