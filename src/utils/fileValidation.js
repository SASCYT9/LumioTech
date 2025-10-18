// src/utils/fileValidation.js
export function validateFile(file) {
  if (!file) return { ok: false, error: 'Файл не вибрано.' };
  const maxBytes = 50 * 1024 * 1024; // 50 MB
  if (file.size > maxBytes) return { ok: false, error: 'Розмір файлу перевищує 50MB.' };
  const allowed = ['stl', 'step', 'stp', 'obj'];
  const name = file.name || '';
  const ext = name.split('.').pop().toLowerCase();
  if (!allowed.includes(ext)) return { ok: false, error: 'Невірний формат файлу. Дозволені: .stl, .step, .stp, .obj' };
  return { ok: true };
}
