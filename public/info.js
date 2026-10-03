const format = (value) => {
  if (!value) return 'noch nicht verfügbar';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'noch nicht verfügbar';
  return new Intl.DateTimeFormat('de-DE', {dateStyle:'medium',timeStyle:'short',timeZone:'Europe/Berlin'}).format(date);
};

async function loadMeta() {
  let version = {};
  let build = {};
  try {
    const vr = await fetch('./version.json', {cache:'no-store'});
    if (vr.ok) version = await vr.json();
  } catch {}
  try {
    const br = await fetch('./build-info.json', {cache:'no-store'});
    if (br.ok) build = await br.json();
  } catch {}

  document.querySelectorAll('[data-version]').forEach(el => el.textContent = version.version || build.version || '—');
  document.querySelectorAll('[data-published]').forEach(el => el.textContent = format(version.published));
  document.querySelectorAll('[data-built]').forEach(el => el.textContent = format(build.builtAt));
  document.querySelectorAll('[data-next-run]').forEach(el => el.textContent = format(build.nextRunAt));
  document.querySelectorAll('[data-commit]').forEach(el => el.textContent = build.commit ? String(build.commit).slice(0,10) : '—');

  if (build.quality) {
    for (const [key, value] of Object.entries(build.quality)) {
      document.querySelectorAll(`[data-quality="${key}"]`).forEach(el => el.textContent = value === 'passed' ? 'erfolgreich' : String(value));
    }
  }
}
void loadMeta();
