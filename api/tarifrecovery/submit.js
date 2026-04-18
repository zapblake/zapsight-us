export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const required = ['name', 'company', 'email', 'role'];
    for (const field of required) {
      if (!payload[field] || !String(payload[field]).trim()) {
        return res.status(400).json({ ok: false, error: `Missing ${field}` });
      }
    }

    const emailWebhookUrl = process.env.TARIFF_RECOVERY_EMAIL_WEBHOOK_URL;
    if (!emailWebhookUrl) {
      return res.status(500).json({ ok: false, error: 'Email webhook not configured' });
    }

    const submission = {
      source: 'tariff-recovery-planner',
      submittedAt: new Date().toISOString(),
      lead: {
        name: payload.name,
        company: payload.company,
        email: payload.email,
        role: payload.role,
        phone: payload.phone || ''
      },
      estimate: payload.estimate || null,
      qualification: payload.qualification || null,
      notes: 'Google Sheets / CRM logging still pending until Google auth is refreshed.'
    };

    const response = await fetch(emailWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission)
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(502).json({ ok: false, error: `Email webhook failed: ${text}` });
    }

    return res.status(200).json({ ok: true, pending: ['crm-sheet-auth-refresh'] });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error instanceof Error ? error.message : 'Unknown error' });
  }
}
