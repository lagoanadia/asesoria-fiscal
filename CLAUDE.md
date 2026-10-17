# Asesoría fiscal y bancaria · memoria del proyecto

Web profesional de una **asesoría fiscal y bancaria** (un asesor independiente). Objetivo: que quien llegue confíe,
entienda qué servicios ofrece y contacte. Los datos concretos del negocio están en `docs/briefing.md`
(mientras no estén completos, nada se inventa: se deja como pendiente).

Este archivo lo leen todos los agentes al empezar. Si cambias una convención, cámbiala aquí.

## Estado

Proyecto recién creado: solo hay el esqueleto (Astro + Cloudflare) y una página «en construcción».
Siguiente paso: especificación con el agente `producto` a partir de `docs/briefing.md`.

## Stack

- **Astro 7** con el adaptador de **Cloudflare** (Workers). Sin framework de UI: componentes `.astro` y CSS propio.
- Páginas estáticas por defecto. Solo llevan servidor (`export const prerender = false;`) las que lo necesiten (formularios).
- Base de datos, emails, etc.: solo cuando la especificación lo pida. No se añaden dependencias «por si acaso».

## Mapa

```
src/pages/            Páginas
src/layouts/          Base.astro (estructura común)
src/styles/global.css Estilos base y, cuando existan, tokens de marca
public/               Archivos estáticos y cabeceras de seguridad (_headers)
docs/briefing.md      Datos del negocio y respuestas del asesor
docs/specs/           Especificaciones (agente producto)
docs/planes/          Planes técnicos (agente arquitecto)
docs/agentes/         Informes y propuestas de los demás agentes
```

## Reglas del negocio (obligatorias)

- **Nada de información fiscal o bancaria inventada.** Tipos, plazos, deducciones, importes, requisitos o novedades
  legales solo se publican si vienen del asesor o de una fuente oficial citada (AEAT, BOE, Banco de España).
  Los agentes pueden redactar **borradores** de textos, pero todo texto con contenido fiscal o bancario lleva la marca
  `<!-- PENDIENTE REVISIÓN ASESOR -->` hasta que él lo apruebe.
- **Actividades reguladas.** La intermediación de crédito inmobiliario (hipotecas) requiere inscripción en el
  Banco de España, y el asesoramiento financiero en inversiones está regulado por la CNMV. No se describe ningún
  servicio de ese tipo sin confirmar con el asesor si está inscrito; si lo está, se muestra su número de registro.
  Si no, los textos no prometen esas actividades.
- **Datos sensibles: mínimos.** Nada de subir documentos (DNI, declaraciones, nóminas, extractos) a la web.
  Los formularios piden solo lo necesario para contactar (nombre, forma de contacto, motivo) y registran
  el consentimiento de privacidad con fecha. Nada personal en logs.
- **Tono**: profesional, cercano y claro. Explicar sin jerga; tratar de tú o de usted según `docs/briefing.md`.
- **Estética: premium.** Tiene que parecer un despacho boutique de alto nivel, no una plantilla. En concreto:
  - **Espacio**: márgenes y separaciones generosos, retícula precisa y pocas cosas por pantalla.
  - **Tipografía protagonista**: una serif de calidad para titulares con una sans neutra para el texto,
    escala amplia y detalles cuidados (comillas tipográficas, cifras alineadas, interlineado ajustado).
  - **Paleta reducida**: un color profundo propio, neutros cálidos y un acento usado con mucha mesura.
  - **Imagen**: fotografía real de Iago y de calidad. Si todavía no la hay, composición tipográfica,
    nunca fotos de banco de imágenes.
  - **Movimiento sutil y preciso**: transiciones suaves entre páginas y microinteracciones cuidadas, nada llamativo
    (skill `movimiento-web`).
  - **Rendimiento y accesibilidad** forman parte de lo premium: carga instantánea y lectura cómoda.
  - **Evitar los clichés de «lujo» y de asesoría**: dorado sobre negro, apretones de manos, calculadoras, iconos
    genéricos, gradientes llamativos y el azul corporativo de banco.
  - **Premium no es distante**: sigue siendo cercano y claro.
  La dirección visual la propone el agente `director-arte` y la aprueba la usuaria.

## Convenciones de código

- **Todo en español**: nombres de variables, funciones, clases CSS, commits y documentación.
- **Accesibilidad (WCAG 2.2 AA)**: `<label for>` en formularios, `role="alert"` en errores, contraste suficiente,
  foco visible y objetivos táctiles de 48 px.
- **Formularios**: skill `formulario-publico`. **Emails**: skill `emails-transaccionales`.
- **Secretos**: nunca en el código ni en `wrangler.jsonc`; como Secrets de Cloudflare.
- **Comentarios**: breves, en español, explican el *porqué*.
- **Commits**: en español, en presente, y explican el porqué.
- Mientras la web esté en construcción: `noindex` en el layout y `robots.txt` bloqueando todo.
  Se quitan el día que se publique con dominio, junto con los textos legales completos (LSSI y RGPD).

## Comandos

```
npm install
npm run dev          # o: astro dev --background (y astro dev stop / status / logs)
npm run build
npm run check        # tipos y errores de Astro: pásalo antes de cada commit
```

## Trabajo con agentes

Los agentes (`.claude/agents/`) y skills (`.claude/skills/`) son **copias del kit** `lagoanadia/kit-agents`
(plugins `equipo-base` y `astro-cloudflare`; versiones en `.claude/kit.json`). Están dentro del repo para que
cualquier sesión, también en la nube, los tenga desde el primer momento sin instalar nada.
- **No se editan aquí.** Se mejoran en el kit y se traen con `node scripts/actualizar-kit.mjs`
  (necesita acceso al repo kit-agents: en la nube, añadirlo a la sesión).
- Las skills que solo sirvan para este proyecto van en `.claude/skills/` con un nombre que no exista en el kit.

Reglas:
1. Cada bloque de trabajo va en **su propia rama** y termina en un PR.
2. Los agentes de solo lectura devuelven su documento y **la sesión principal lo guarda** con nombre `AAAA-MM-DD-<tema>.md`:
   `producto` → `docs/specs/`, `arquitecto` → `docs/planes/`,
   `revisor`, `seguridad`, `auditor-web` y `director-arte` → `docs/agentes/<agente>/`.
3. Antes de construir algo grande, debe existir una spec en `docs/specs/` y un plan en `docs/planes/` aprobados por la usuaria.
4. Si un patrón se repite, `herrero-skills` puede proponer una skill nueva, siempre en un PR aparte.

## Documentación de Astro

https://docs.astro.build — rutas: /en/guides/routing/ · componentes: /en/basics/astro-components/ ·
estilos: /en/guides/styling/ · Cloudflare: /en/guides/integrations-guide/cloudflare/
