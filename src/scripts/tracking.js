// Event delegation cho 2 conversion: zalo_click (mọi link zalo.me) và call_click (mọi link tel:)
// Không gắn listener riêng từng nút — bắt tại document, đúng yêu cầu Mục 7b.
// Nhận ID tracking qua window.__TRACKING__ (set inline bởi Tracking.astro) thay vì import
// trực tiếp config/site.ts — import xuyên biên .astro/.js khiến Astro không bundle được script này.

const tracking = window.__TRACKING__ || {};

const TRACKED_QUERY_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'gclid',
  'keyword',
];

// Mục 7d: giữ tham số Google Ads (utm_*, gclid, keyword) từ URL trang, nối vào link Zalo
// khi khách bấm, để chủ site đối chiếu từ khóa nào ra lead trong CRM.
function appendPageParamsToZaloHref(href) {
  const pageParams = new URLSearchParams(window.location.search);
  const url = new URL(href, window.location.origin);

  for (const key of TRACKED_QUERY_KEYS) {
    // utm_content được set riêng theo từng vị trí nút (hero, banggia, ...) — không ghi đè
    if (key === 'utm_content') continue;
    const value = pageParams.get(key);
    if (value) url.searchParams.set(key, value);
  }

  return url.toString();
}

function fireConversion(kind) {
  const conversionId =
    kind === 'zalo' ? tracking.googleAdsConversionZalo : tracking.googleAdsConversionCall;

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', { send_to: conversionId });
  }
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Contact');
  }
}

function initTracking() {
  // Nối tham số Google Ads vào mọi link Zalo hiện có trên trang, ngay khi load
  document.querySelectorAll('a[href*="zalo.me"]').forEach((a) => {
    a.setAttribute('href', appendPageParamsToZaloHref(a.getAttribute('href')));
  });

  document.addEventListener('click', (event) => {
    const link = event.target instanceof Element ? event.target.closest('a') : null;
    if (!link) return;

    const href = link.getAttribute('href') || '';

    if (href.includes('zalo.me')) {
      fireConversion('zalo');
    } else if (href.startsWith('tel:')) {
      fireConversion('call');
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTracking);
} else {
  initTracking();
}
