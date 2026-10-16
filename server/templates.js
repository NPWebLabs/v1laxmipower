// HTML email templates. Inline styles + table layout so they render in Gmail, Outlook and phone mail apps.
const BRAND = { ink: '#141A33', gold: '#F2A23A', goldText: '#8F5405', muted: '#545B78', line: '#E1E2E8', bg: '#F5F5F1' }

export const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

function layout({ preheader, heading, body, biz }) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(heading)}</title></head>
<body style="margin:0;padding:0;background:${BRAND.bg};font-family:Arial,Helvetica,sans-serif;color:${BRAND.ink};">
<span style="display:none!important;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">${esc(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bg};padding:24px 12px;">
<tr><td align="center">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid ${BRAND.line};">
    <tr><td style="background:${BRAND.ink};padding:24px 28px;">
      <span style="font-size:22px;color:#ffffff;"><b>Laxmi</b> Power</span>
      <span style="display:block;margin-top:4px;font-size:13px;color:${BRAND.gold};">लक्ष्मी पॉवर · Barshi</span>
    </td></tr>
    <tr><td style="height:4px;background:${BRAND.gold};line-height:4px;font-size:0;">&nbsp;</td></tr>
    <tr><td style="padding:28px;">
      <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;color:${BRAND.ink};">${esc(heading)}</h1>
      ${body}
    </td></tr>
    <tr><td style="background:${BRAND.bg};padding:20px 28px;font-size:13px;line-height:1.6;color:${BRAND.muted};">
      <b style="color:${BRAND.ink};">Laxmi Power</b> · Barshi, District Solapur, Maharashtra<br>
      <a href="tel:+91${biz.phone}" style="color:${BRAND.goldText};text-decoration:none;">${esc(biz.phoneDisplay)}</a> ·
      <a href="mailto:${esc(biz.email)}" style="color:${BRAND.goldText};text-decoration:none;">${esc(biz.email)}</a><br>
      Mon–Sat, 10 am – 7 pm
    </td></tr>
  </table>
</td></tr></table>
</body></html>`
}

function detailsTable(rows) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BRAND.line};border-radius:12px;border-collapse:separate;overflow:hidden;">
${rows.filter(([, v]) => v).map(([k, v], i) => `<tr>
  <td style="padding:12px 16px;width:34%;font-size:13px;color:${BRAND.muted};vertical-align:top;${i ? `border-top:1px solid ${BRAND.line};` : ''}">${esc(k)}</td>
  <td style="padding:12px 16px;font-size:15px;color:${BRAND.ink};vertical-align:top;white-space:pre-wrap;${i ? `border-top:1px solid ${BRAND.line};` : ''}">${v}</td>
</tr>`).join('')}
</table>`
}

const button = (href, label, bg = BRAND.gold, fg = BRAND.ink) =>
  `<a href="${href}" style="display:inline-block;margin:6px 8px 0 0;padding:12px 20px;border-radius:999px;background:${bg};color:${fg};font-weight:bold;font-size:15px;text-decoration:none;">${esc(label)}</a>`

/** Notification sent to the Laxmi Power team. */
export function adminEmail(e, biz) {
  const wa = `https://wa.me/91${e.phone}?text=${encodeURIComponent(`Hello ${e.name}, this is Laxmi Power replying to your enquiry about ${e.need}.`)}`
  const body = `
<p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:${BRAND.muted};">A new enquiry was submitted from the ${esc(e.source)} on the website.</p>
${detailsTable([
  ['Name', esc(e.name)],
  ['Phone', `<a href="tel:+91${esc(e.phone)}" style="color:${BRAND.goldText};">+91 ${esc(e.phone)}</a>`],
  ['Email', e.email && `<a href="mailto:${esc(e.email)}" style="color:${BRAND.goldText};">${esc(e.email)}</a>`],
  ['Requirement', esc(e.need)],
  ['Details', esc(e.details)],
  ['Received', esc(e.receivedAt)],
])}
<p style="margin:24px 0 0;">
  ${button(`tel:+91${esc(e.phone)}`, 'Call customer')}
  ${button(wa, 'Reply on WhatsApp', '#1FAF5A', '#ffffff')}
  ${e.email ? button(`mailto:${esc(e.email)}?subject=${encodeURIComponent('Re: Your enquiry at Laxmi Power')}`, 'Reply by email', BRAND.ink, '#ffffff') : ''}
</p>`
  const text = `New website enquiry\n\nName: ${e.name}\nPhone: +91 ${e.phone}\n${e.email ? `Email: ${e.email}\n` : ''}Requirement: ${e.need}\n${e.details ? `Details: ${e.details}\n` : ''}Received: ${e.receivedAt}\nSource: ${e.source}`
  return {
    subject: `New enquiry: ${e.need} – ${e.name}`,
    html: layout({ preheader: `${e.name} (+91 ${e.phone}) enquired about ${e.need}`, heading: 'New website enquiry', body, biz }),
    text,
  }
}

/** Confirmation sent to the customer who filled in the form. */
export function userEmail(e, biz) {
  const body = `
<p style="margin:0 0 14px;font-size:15px;line-height:1.6;">Namaste ${esc(e.name)},</p>
<p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:${BRAND.muted};">Thank you for contacting Laxmi Power. We have received your enquiry and our team will call you on <b style="color:${BRAND.ink};">+91 ${esc(e.phone)}</b> during business hours (Mon–Sat, 10 am – 7 pm).</p>
<p style="margin:0 0 10px;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:${BRAND.goldText};">Your enquiry</p>
${detailsTable([
  ['Requirement', esc(e.need)],
  ['Details', esc(e.details)],
])}
<p style="margin:24px 0 6px;font-size:15px;line-height:1.6;color:${BRAND.muted};">Need a faster answer? Reach us directly:</p>
<p style="margin:0;">
  ${button(`https://wa.me/91${biz.phone}?text=${encodeURIComponent(`Hello Laxmi Power, I just sent an enquiry about ${e.need}.`)}`, 'Chat on WhatsApp', '#1FAF5A', '#ffffff')}
  ${button(`tel:+91${biz.phone}`, `Call ${biz.phoneDisplay}`)}
</p>
<p style="margin:24px 0 0;font-size:15px;line-height:1.6;">Warm regards,<br><b>Team Laxmi Power</b></p>`
  const text = `Namaste ${e.name},\n\nThank you for contacting Laxmi Power. We have received your enquiry about "${e.need}" and will call you on +91 ${e.phone} during business hours (Mon–Sat, 10 am – 7 pm).\n\nFor a faster answer, WhatsApp or call us on ${biz.phoneDisplay}.\n\nWarm regards,\nTeam Laxmi Power`
  return {
    subject: 'We received your enquiry – Laxmi Power',
    html: layout({ preheader: 'Thank you! Our team will call you shortly.', heading: 'Thank you for your enquiry', body, biz }),
    text,
  }
}
