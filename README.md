# Història 2n Batxillerat — Eina interactiva d'estudi

Eina web per estudiar Història de 2n Batxillerat. La timeline és l'eix principal: a mesura que avances cronològicament, cada fet porta al costat la idea general i el tast de font relacionats, i cada 3-4 fets apareix un "punt de control" (desplegable) amb un comentari de síntesi, preguntes ABCD amb feedback immediat, una pregunta d'escriure amb resposta ideal per comparar, i un botó per repetir-lo. Basada en l'[especificació original](especificacio-historia-2n-bach.md).

**Estat actual:** Tema 1 complet — *La Restauració (1875-1917)*, amb 8 idees clau, 36 fets a la timeline, 9 punts de control (27 preguntes ABCD + 9 preguntes d'escriure), 9 bàndols/forces a la taula comparativa i un dossier de 10 fonts primàries.

## Com obrir-la

Els navegadors bloquegen `fetch()` sobre fitxers locals (`file://`), així que cal servir la carpeta amb un servidor mínim:

```bash
# Amb Python (ja instal·lat al PC)
python -m http.server 8000
```

Després obre `http://localhost:8000` al navegador.

## Estructura

```
Historia-2n-Bach/
├── index.html
├── styles/          main.css (base + tema clar/fosc), timeline.css, table.css
├── scripts/         main.js (idees + modal + tema), timeline.js (timeline + punts de control), table.js, fonts.js
└── data/            ideas.json, timeline.json, comparativa.json, fonts.json, checkpoints.json
```

Cada tema viu a les mateixes cinc estructures de dades. Per afegir un tema nou (p. ex. Tema 1b, Alfons XIII fins la dictadura):

1. Afegeix les noves entrades als 5 fitxers JSON (mateix format, nous `id` que no col·lideixin amb els existents).
2. A `checkpoints.json`, `afterEventId` indica després de quin fet (per `id`) apareix el punt de control; els punts de control només es mostren quan els filtres de la timeline estan en "Tots".
3. Si cal, afegeix nous `tipus` o colors a `App.tipusMeta` / `App.tipusForcaColor` a `scripts/main.js`.
4. No cal tocar l'HTML ni el CSS.

## Pendent de decidir junts

- **Deployment**: GitHub Pages és la opció més senzilla (gratuïta, automàtica). Cal crear el repositori a GitHub.
- **Col·laboració en temps real**: ara mateix les dades són JSON estàtic (opció més senzilla per començar). Si voleu editar-les els dos alhora sense passar per Git, es pot migrar a Google Sheets o Notion com a font de dades.
- **Següents temes**: cal el material (PDF/apunts) de la resta de temes per fer-ne l'extracció.
