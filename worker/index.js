// Worker phục vụ static site (qua ASSETS binding) + 2 endpoint nhận form lead qua email
// (Cloudflare Email Routing send_email binding — không cần dịch vụ ngoài, không cần API key).
import { EmailMessage } from 'cloudflare:email';
import { createMimeMessage } from 'mimetext/browser';

const DESTINATION = 'luongcongthuann@gmail.com';
const SENDER = 'lead@dichthuatvisa247.com';

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

// Vệ sinh input cơ bản trước khi đưa vào email — chặn header injection qua newline
function clean(value, maxLen = 200) {
  return String(value ?? '')
    .replace(/[\r\n]+/g, ' ')
    .trim()
    .slice(0, maxLen);
}

function isValidVietnamesePhone(phone) {
  const digits = phone.replace(/[^0-9]/g, '');
  return /^0[0-9]{9}$/.test(digits);
}

async function sendLeadEmail(env, subject, lines) {
  const msg = createMimeMessage();
  msg.setSender({ name: 'Dịch Thuật Visa 247 — Web Lead', addr: SENDER });
  msg.setRecipient(DESTINATION);
  msg.setSubject(subject);
  msg.addMessage({
    contentType: 'text/plain',
    data: lines.join('\n'),
  });

  const message = new EmailMessage(SENDER, DESTINATION, msg.asRaw());
  await env.SEND_EMAIL.send(message);
}

async function handleCallbackForm(request, env) {
  const data = await request.formData();

  // Honeypot: trường ẩn với người dùng thật, bot form-filler thường vẫn điền vào
  if (clean(data.get('website'))) {
    return jsonResponse({ ok: true }); // im lặng "thành công" giả để không lộ cơ chế chặn cho bot
  }

  const phone = clean(data.get('phone'), 20);
  if (!isValidVietnamesePhone(phone)) {
    return jsonResponse({ ok: false, error: 'Số điện thoại không hợp lệ.' }, 400);
  }

  const page = clean(data.get('page'), 200);
  const utmSource = clean(data.get('utm_source'), 100);
  const utmContent = clean(data.get('utm_content'), 100);

  await sendLeadEmail(env, `[Web Lead] Gọi lại — ${phone}`, [
    'Yêu cầu gọi lại từ website dichthuatvisa247.com',
    '',
    `Số điện thoại: ${phone}`,
    `Trang gửi: ${page || '(không rõ)'}`,
    `utm_source: ${utmSource || '-'}`,
    `utm_content: ${utmContent || '-'}`,
    `Thời gian: ${new Date().toISOString()}`,
  ]);

  return jsonResponse({ ok: true });
}

async function handleAgencyForm(request, env) {
  const data = await request.formData();

  if (clean(data.get('website'))) {
    return jsonResponse({ ok: true });
  }

  const company = clean(data.get('company'), 200);
  const phone = clean(data.get('phone'), 20);
  const volume = clean(data.get('volume'), 100);

  if (!company || !isValidVietnamesePhone(phone)) {
    return jsonResponse({ ok: false, error: 'Vui lòng điền tên công ty và số điện thoại hợp lệ.' }, 400);
  }

  await sendLeadEmail(env, `[Web Lead] Đại lý/CTV — ${company}`, [
    'Đăng ký chính sách đại lý & CTV từ website dichthuatvisa247.com',
    '',
    `Tên công ty/CTV: ${company}`,
    `Số điện thoại: ${phone}`,
    `Số hồ sơ/tháng ước tính: ${volume || '(không ghi)'}`,
    `Thời gian: ${new Date().toISOString()}`,
  ]);

  return jsonResponse({ ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'POST' && url.pathname === '/api/goi-lai') {
      try {
        return await handleCallbackForm(request, env);
      } catch (err) {
        return jsonResponse({ ok: false, error: 'Có lỗi xảy ra, vui lòng thử lại hoặc nhắn Zalo.' }, 500);
      }
    }

    if (request.method === 'POST' && url.pathname === '/api/agency') {
      try {
        return await handleAgencyForm(request, env);
      } catch (err) {
        return jsonResponse({ ok: false, error: 'Có lỗi xảy ra, vui lòng thử lại hoặc nhắn Zalo.' }, 500);
      }
    }

    return env.ASSETS.fetch(request);
  },
};
