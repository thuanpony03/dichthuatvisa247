// Fade nhẹ khi cuộn tới — animation trang trí duy nhất được phép (Mục 4).
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
} else {
  document.querySelectorAll('.fade-in').forEach((el) => el.classList.add('is-visible'));
}
