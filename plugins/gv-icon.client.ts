import { buildStyledSvg } from '~/utils/svgEngine';
import type { IconStyleVariant } from '~/types/icon';

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
        static get observedAttributes() {
          return ['name', 'size', 'variant', 'style', 'stroke', 'color', 'secondary', 'opacity'];
        }

        connectedCallback() {
          this.render();
        }

        attributeChangedCallback() {
          this.render();
        }

        render() {
          const name = this.getAttribute('name');
          if (!name) return;
          const raw = map.get(name);
          if (!raw) return;

          // Parse variant: support variant="...", mode="...", or style="..."
          let variant: IconStyleVariant = 'linear';
          const candidate = (
            this.getAttribute('variant') ||
            this.getAttribute('mode') ||
            this.getAttribute('style') ||
            ''
          ).trim();

          if (candidate === 'solid') {
            variant = 'solid';
          } else if (candidate === 'duotone' || candidate === 'dualtone') {
            variant = 'duotone';
          } else if (candidate === 'duotone-linear' || candidate === 'dualtone-linear') {
            variant = 'duotone-linear';
          } else {
            variant = 'linear';
          }

          const size = parseInt(this.getAttribute('size') || '24', 10) || 24;
          const strokeWidth =
            parseFloat(this.getAttribute('stroke') || this.getAttribute('stroke-width') || '2') || 2;
          const primaryColor = this.getAttribute('color') || 'currentColor';
          const secondaryColor =
            this.getAttribute('secondary') || this.getAttribute('secondary-color') || primaryColor;
          const duotoneOpacity = parseFloat(this.getAttribute('opacity') || '0.25') || 0.25;

          const styled = buildStyledSvg(raw, variant, {
            size,
            strokeWidth,
            primaryColor,
            secondaryColor,
            duotoneOpacity,
          });

          this.innerHTML = styled;
          this.style.display = 'inline-flex';
          this.style.verticalAlign = 'middle';
          this.style.width = `${size}px`;
          this.style.height = `${size}px`;
        }
      }
      customElements.define('gv-icon', GvIcon);
    }
  } catch (err) {
    console.error('Failed to register <gv-icon>:', err);
  }
});
