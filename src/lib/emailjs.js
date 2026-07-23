// Sends via our own /api/notify serverless function (nodemailer + Gmail)
async function post(payload) {
  const res = await fetch('/api/notify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('notify failed')
}

export async function sendBookingEmail({ service, servicePrice, date, time, name, phone, email }) {
  await post({ type: 'booking', service, servicePrice, date, time, name, phone, email })
}

export async function sendContactEmail({ name, company, email, videoType, quantity, duration, budget, deadline, description, reference }) {
  await post({ type: 'contact', name, company, email, videoType, quantity, duration, budget, deadline, description, reference })
}
