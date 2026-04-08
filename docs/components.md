# Components

All reusable components live in `src/components/`. This file is updated as new components are built.

---

## UI Primitives (`src/components/ui/`)

### Badge ✅
`src/components/ui/Badge/Badge.jsx`

| Prop | Type | Default | Options |
|---|---|---|---|
| `variant` | string | `orange` | `orange` `red` `blue` `green` `purple` |
| `shape` | string | `square` | `square` `pill` |
| `children` | node | — | Label text |

```jsx
<Badge variant="red" shape="square">Critical</Badge>
<Badge variant="green" shape="pill">Clean</Badge>
<Badge variant="blue" shape="square">In Sync</Badge>
<Badge variant="orange" shape="square">15</Badge>
```

---

### Button ✅
`src/components/ui/Button/Button.jsx`

| Prop | Type | Default | Options |
|---|---|---|---|
| `variant` | string | `primary` | `primary` `secondary` `ghost` `link` |
| `size` | string | `md` | `md` `sm` |
| `leadIcon` | node | — | Icon element |
| `tailIcon` | node | — | Icon element |
| `onClick` | function | — | Click handler |

```jsx
<Button variant="primary">Start Testing</Button>
<Button variant="secondary">Resume Testing</Button>
<Button variant="link" size="sm">View on Jira</Button>
```

---

## Layout Components (`src/components/layout/`)

### Sidebar ✅
`src/components/layout/Sidebar/Sidebar.jsx`

Fixed 280px left panel. Nav items, integrations section, and primary CTA at bottom.
Nav data is hardcoded in `Sidebar.jsx` — update `NAV_ITEMS` and `INTEGRATIONS` arrays as needed.

| Prop | Type | Description |
|---|---|---|
| `user` | object | `{ name, role, avatarUrl }` — falls back to "Ravi G. / Lumi / QA" |

```jsx
<Sidebar user={{ name: 'Ravi G.', role: 'Lumi / QA' }} />
```

---

## Page Components (`src/pages/`)

### Home ✅
`src/pages/Home/Home.jsx`

The main dashboard. Contains:
- Sidebar
- Page header (greeting + subtitle)
- Jira Sprint 34 card with ticket rows
- Recent Sessions (2 session cards)
- Sprint Progress donut chart
- "Start where you left" resume banner

> Note: Session images, Jira logo, donut chart, and app icon use Figma asset URLs (valid ~7 days from 2026-03-25). Replace with local assets when they expire.
