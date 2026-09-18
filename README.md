# UNESCO Virtual Museum of Stolen Cultural Objects — 1:1 Static Replica

An educational, pixel-faithful static replica of **[museum.unesco.org](https://museum.unesco.org/)** —
the world's first global-scale virtual museum dedicated to stolen cultural property, designed with
Pritzker Prize laureate Francis Kéré and launched at MONDIACULT 2025 (Barcelona).

## What is replicated

| Original URL | Replica | Notes |
|---|---|---|
| `/` | `index.html` | Loading experience with the 27 real rotating facts from the site's `_payload.json`, entrance, rooms navigation |
| `/auditorium` | `auditorium/` | Hero collage, News carousel, UNESCO's Mission, Fight Illicit Trafficking, Partners — full real content |
| `/partners/{uuid}` | `partners/{uuid}/` | All 9 editorial article pages (About, Mission, Togo, 1970 Convention, Combatting, Restitution, INTERPOL, Kéré, Partner) |
| `/collections` | `collections/` | Stolen Cultural Objects Gallery room page |
| `/regions` | `regions/` | Regions room page |
| `/restitution-room` | `restitution-room/` | Return & Restitution Room page |
| `/historic` | `historic/` | Historic timeline room page |
| `/baobab` | `baobab/` | The Baobab — the museum's generative core |
| `/my-gallery` | `my-gallery/` | My Gallery — visitor curation |
| 404 | `404.html` | "Page not found" shell, auto-served by GitHub Pages |

The original site's immersive rooms are real-time WebGL 3D experiences (built by makemepulse on their
NanoGL engine). This replica reproduces every server-rendered page and route 1:1 as static HTML/CSS/JS,
and each 3D-only route carries an elegant room page linking to the official 3D experience.

## Design system

- Dark museum theme: deep navy (`#0a0e15`), warm brass (`#c9a15e`), UNESCO blue (`#4f9dd8`)
- Editorial serif headings (Cormorant Garamond) + light grotesque UI (Jost)
- Baobab-inspired pulsing rings, drifting glows, reveal-on-scroll
- Menu overlay, language switcher (EN active, FR/ES link to the official site), back-to-top — all matching the original chrome
- Fully responsive, `prefers-reduced-motion` respected

## Run locally

```bash
# any static server, e.g.
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy to GitHub Pages

```bash
git init
git add -A
git commit -m "UNESCO Virtual Museum 1:1 replica"
git branch -M main
git remote add origin git@github.com:<you>/<repo>.git
git push -u origin main
# then Settings → Pages → Deploy from branch → main / (root)
```

or with the GitHub CLI:

```bash
gh repo create unesco-virtual-museum-replica --public --source=. --push
gh api repos/<you>/<repo>/pages -X POST -f "source[branch]=main" -f "source[path]=/"
```

## Attribution & license

- Original site, texts, and imagery: **© UNESCO**, published under the
  [CC BY-SA 3.0 IGO](https://creativecommons.org/licenses/by-sa/3.0/igo/) licence.
  This replica reproduces that content under the same terms, with attribution.
- Images are currently referenced from `www.unesco.org/savmuseum/` (the museum's own asset host).
- This is a non-commercial, educational homage; it is not affiliated with UNESCO.
  The immersive 3D experience remains available at the official website.
- Replica code (HTML/CSS/JS authored here): MIT.
