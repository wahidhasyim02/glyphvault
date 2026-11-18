export default defineNuxtPlugin(async () => {
  if (typeof window === 'undefined') return;

  try {
    const res = await fetch('/icons.json');
    if (!res.ok) return;
    const data = await res.json();
    const list = Array.isArray(data) ? data : data.icons || [];
    const map = new Map(list.map((i: any) => [i.name, i.svg]));

    if (!customElements.get('gv-icon')) {
      class GvIcon extends HTMLElement {
        connectedCallback() {
          const name = this.getAttribute('name');
          const size = this.getAttribute('size') || '24';
          const raw = map.get(name);
          if (!raw) return;
          this.innerHTML = raw
            .replace('<svg ', `<svg width="${size}" height="${size}" `)
            .replace(/stroke="[^"]*"/g, 'stroke="currentColor"');
        }
      }
      customElements.define('gv-icon', GvIcon);
    }
  } catch (err) {
    console.error('Failed to register <gv-icon>:', err);
  }
});
