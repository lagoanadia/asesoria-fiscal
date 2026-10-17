# asesoria-fiscal

Web de una asesoría fiscal y bancaria. Astro 7 + Cloudflare Workers.

## Arrancar en local

```
npm install
npm run dev        # http://localhost:4321
```

Antes de cada commit: `npm run check` y `npm run build`.

## Cómo se trabaja

- El contexto del proyecto y sus reglas están en [`CLAUDE.md`](CLAUDE.md).
- Los datos del negocio, en [`docs/briefing.md`](docs/briefing.md).
- Los agentes de Claude Code vienen del catálogo [`lagoanadia/kit-agents`](https://github.com/lagoanadia/kit-agents),
  declarado en `.claude/settings.json`.

## Publicar

Pendiente: dominio, textos legales y quitar el `noindex` y el bloqueo de `robots.txt` (ver `CLAUDE.md`).
