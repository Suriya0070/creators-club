import { Resend } from 'resend'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return res.status(200).json({ ok: true })

  const resend = new Resend(apiKey)
  const TO = process.env.NOTIFY_EMAIL || 'suriyasync@gmail.com'
  const { type, ...data } = req.body

  let subject, html

  if (type === 'booking') {
    subject = `📅 New Call Booked — ${data.name}`
    html = `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1C1A2E">
        <div style="background:#FFD166;padding:24px 32px;border-radius:12px 12px 0 0">
          <h2 style="margin:0;font-size:20px">📅 New Call Booked</h2>
        </div>
        <div style="background:#fff;padding:32px;border-radius:0 0 12px 12px;border:1px solid #eee">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#9896A8;font-size:13px;width:130px">SERVICE</td>
                <td style="padding:8px 0;font-weight:600">${data.service}</td></tr>
            <tr><td style="padding:8px 0;color:#9896A8;font-size:13px">PRICE</td>
                <td style="padding:8px 0">${data.servicePrice}</td></tr>
            <tr><td style="padding:8px 0;color:#9896A8;font-size:13px">DATE</td>
                <td style="padding:8px 0;font-weight:600">${data.date}</td></tr>
            <tr><td style="padding:8px 0;color:#9896A8;font-size:13px">TIME</td>
                <td style="padding:8px 0;font-weight:600">${data.time}</td></tr>
            <tr><td colspan="2" style="padding:16px 0 0"><hr style="border:none;border-top:1px solid #eee;margin:0"></td></tr>
            <tr><td style="padding:8px 0;color:#9896A8;font-size:13px">CLIENT</td>
                <td style="padding:8px 0;font-weight:600">${data.name}</td></tr>
            <tr><td style="padding:8px 0;color:#9896A8;font-size:13px">PHONE</td>
                <td style="padding:8px 0"><a href="tel:${data.phone}" style="color:#1C1A2E">${data.phone}</a></td></tr>
            <tr><td style="padding:8px 0;color:#9896A8;font-size:13px">EMAIL</td>
                <td style="padding:8px 0"><a href="mailto:${data.email}" style="color:#F5A623">${data.email}</a></td></tr>
          </table>
          <div style="margin-top:24px;padding:16px;background:#FAF4E8;border-radius:8px;font-size:13px;color:#6B6880">
            Reply directly to this email or call them at ${data.phone}.
          </div>
        </div>
      </div>`
  } else {
    subject = `📬 New Brief — ${data.name}`
    html = `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1C1A2E">
        <div style="background:#1C1A2E;padding:24px 32px;border-radius:12px 12px 0 0">
          <h2 style="margin:0;font-size:20px;color:#FAF4E8">📬 New Project Brief</h2>
        </div>
        <div style="background:#fff;padding:32px;border-radius:0 0 12px 12px;border:1px solid #eee">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#9896A8;font-size:13px;width:130px">FROM</td>
                <td style="padding:8px 0;font-weight:600">${data.name}${data.company ? ` · ${data.company}` : ''}</td></tr>
            <tr><td style="padding:8px 0;color:#9896A8;font-size:13px">EMAIL</td>
                <td style="padding:8px 0"><a href="mailto:${data.email}" style="color:#F5A623">${data.email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#9896A8;font-size:13px">TYPE</td>
                <td style="padding:8px 0">${data.videoType}</td></tr>
            <tr><td style="padding:8px 0;color:#9896A8;font-size:13px">BUDGET</td>
                <td style="padding:8px 0">${data.budget || '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#9896A8;font-size:13px">DEADLINE</td>
                <td style="padding:8px 0">${data.deadline || '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#9896A8;font-size:13px">QTY / LENGTH</td>
                <td style="padding:8px 0">${data.quantity || '—'} × ${data.duration || '—'}</td></tr>
            <tr><td colspan="2" style="padding:16px 0 0"><hr style="border:none;border-top:1px solid #eee;margin:0"></td></tr>
            <tr><td style="padding:16px 0 8px;color:#9896A8;font-size:13px;vertical-align:top">BRIEF</td>
                <td style="padding:16px 0 8px;line-height:1.6">${data.description}</td></tr>
            ${data.reference ? `<tr><td style="padding:8px 0;color:#9896A8;font-size:13px;vertical-align:top">REFERENCES</td>
                <td style="padding:8px 0;line-height:1.6">${data.reference}</td></tr>` : ''}
          </table>
        </div>
      </div>`
  }

  try {
    const { error } = await resend.emails.send({
      from: 'PRMinds <onboarding@resend.dev>',
      to: [TO],
      replyTo: data.email,
      subject,
      html,
    })
    if (error) {
      console.error('Resend error:', error.message)
      return res.status(500).json({ error: error.message })
    }
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Resend error:', err.message)
    return res.status(500).json({ error: 'Failed to send' })
  }
}
