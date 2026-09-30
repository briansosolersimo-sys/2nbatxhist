# 📚 Especificació: Eina Interactiva d'Estudi - História de 2n Batxillerat

**Versió 1.0**  
**Data**: 29 de setembre de 2026  
**Objectiu**: Dominar (no només aprovar) História de 2n Bach  
**Estat**: Especificació tancada, llista per a desenvolupament

---

## 🎯 Visió General

Crear una pàgina web interactiva que estructuri el contingut de História combinant tres nivells d'informació:

1. **Idees Generals** (conceptes clau de cada era)
2. **Timeline Cronològica** (fets històrics amb desplegables)
3. **Taula Comparativa** (análisi de bandos, motius, figues clau)

**Estructura Visual**:
```
┌──────────────────────────────────────────────────────┐
│  IDEES GENERALS (Hover → Expande Info Detallada)    │
│  Feudalisme | Monarquia Absoluta | Liberalisme ...  │
└──────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────┐
│  TIMELINE VISUAL (1492 - 2025)                       │
│  [Fets]─[Fets]─[Fets]─[Fets]─[Fets]                │
│   Click → Desplegable amb detalls                    │
└──────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────┐
│  TAULA COMPARATIVA (Per Era)                         │
│  Bando | Idees | Motius | Líders | Context          │
└──────────────────────────────────────────────────────┘
```

---

## 📐 Especificacions Tècniques

### 1. IDEES GENERALS (Component Superior)

**Funcionalitat**:
- Llistat de conceptes clau per era (Feudalisme, Monarquia Absoluta, Liberalisme, Conservadorisme, etc.)
- Al passar el mouse: tarjeta expandible amb info detallada
- Colors diferenciats per era

**Estructura de Dades (Notion/Google Sheets)**:
```
| Era | Concepte | Definició | Durada | Figures Clau | Context Europeu |
|-----|----------|-----------|--------|--------------|-----------------|
| Edat Mitjana | Feudalisme | ... | ... | ... | ... |
| Moderns | Monarquia Absoluta | ... | ... | ... | ... |
```

**Interactivitat**:
- Hover: tarjeta surt amb definició (100-150 paraules)
- Click: obrir modal amb info més detallada (causes, característiques, símptomes)
- Color: codificat per era

---

### 2. TIMELINE (Component Central)

**Funcionalitat**:
- Línia temporal visual horitzontal (1492-2025)
- Cada fet marcat amb icon (guerra, revolució, reforma, etc.)
- Click en fet → desplegable amb informació completa

**Estructura de Dades**:
```
| Data | Fet | Era | Tipo Icon | Descripció Breu | Causes | Conseqüències | Figures Clau | Idea General Relacionada |
|------|-----|-----|-----------|-----------------|--------|---------------|--------------|------------------------|
| 1492 | Descobriment d'Amèrica | Moderns | expansió | ... | ... | ... | Colom | Monarquia Absoluta |
| 1700 | Batalla de Sucesió | Moderns | guerra | ... | ... | ... | Felip V | Monarquia Absoluta |
```

**Interactivitat**:
- Desplegable amb:
  - Data exacta + nom del fet
  - Descripció breu (2-3 línies)
  - **Causes** (1-2 factors principals)
  - **Conseqüències** (impacte immediat + a llarg termini)
  - **Figures clau** (personatges importants)
  - **Conexió a idea general** (a quina idea de la part superior es relaciona)

**Visual**:
- Eix central amb marques de temps
- Alternancia de fets a dreta/esquerra (per llegibilitat)
- Icons diferenciats per type de fet

---

### 3. TAULA COMPARATIVA (Component Inferior)

**Funcionalitat**:
- Comparativa per era/període (Reis Catòlics | Austrias | Borbons | S.XIX | Guerra Civil | Franquisme | Transició | Democràcia)
- Permet filtrar per era
- Clickable: més detall en modal

**Estructura de Dades**:
```
| Período | Bando Principal | Idees Clau | Motius Polítics | Líders | Contexte Europeu | Economia | Societat |
|---------|-----------------|-----------|-----------------|--------|------------------|----------|----------|
| Reis Catòlics | Monarquia | Unitat Cristiana, Reconquesta | Poder Territorial | Isabel i Ferran | ... | ... | ... |
| Austrias | Monarquia | Dinastía, Catolicisme | Mantenir Poder | Felip II | ... | ... | ... |
```

**Interactivitat**:
- Clickable per veure més detall (modal)
- Selector per filtrar per era
- Cells diferenciats per bandos (colors)

---

## 🛠️ Tecnologia

### Frontend
- **HTML5**: Estructura semàntica
- **CSS3**: Responsive, dark/light mode
- **JavaScript Vanilla** o **React** (si es necessita més dinamisme)
- **Responsive**: Mobile-friendly

### Backend/Database
- **Notion API** (perquè els dos puguin editar en temps real)
- O **Google Sheets** (alternativa més simple)
- O **JSON estàtic** (si no és necessari col·laboració en temps real)

### Deployment
- **GitHub Pages** (gratuït, automàtic des de GitHub)
- O **Vercel** (alternativa més moderna)

### Preferències de Codi
- ✅ Fitxers complets (mai fragments o diff)
- ✅ Codi autodocumentat (comentaris mínims)
- ✅ Estructura modular i clara
- ✅ Sense explicacions textuals al mig del codi

---

## 📦 Estructura de Carpetes (si es fa amb GitHub)

```
historia-2n-bach/
├── index.html
├── styles/
│   ├── main.css
│   ├── timeline.css
│   └── table.css
├── scripts/
│   ├── main.js
│   ├── timeline.js
│   ├── table.js
│   └── api.js (per conectar a Notion/Google Sheets)
├── data/
│   ├── ideas.json
│   ├── timeline.json
│   └── comparativa.json
└── README.md
```

---

## 🔄 Flux de Treball Col·laboratiu

### Opció 1: Notion + Web
1. **Notion**: Base de dades central amb tota la informació
2. **Pàgina web**: Es conecta a Notion API i mostra els datos
3. **Edició**: Els dos editem directament a Notion
4. **Refresh**: Pàgina es refresca automàticament (o amb botó)

### Opció 2: Google Sheets + Web
1. **Google Sheets**: Base de dades compartida
2. **Pàgina web**: Llegeix datas de Sheets
3. **Edició**: Els dos editem a Sheets
4. **Refresh**: Pàgina actualitza cada X minuts

### Opció 3: JSON + GitHub (sense col·laboració en temps real)
1. **JSON files**: Todo els datos
2. **GitHub**: Repositori compartit
3. **Edició**: Els dos pugueu fer commits
4. **Deployment**: Automàtic quan es fa push

---

## 📋 Material d'Entrada Necessari

Quan passis el material, hauria d'incloure:
- [ ] Presentacions de classe (PDF/PPT)
- [ ] Apunts personals o llibre de text
- [ ] Síntesi de períodes clau (si en tens)
- [ ] Llista de personatges importants
- [ ] Dates clau

**Format preferit**: ZIP amb totes les carpetes

---

## 🎨 Consideracions de Disseny

### Colors
- **Per era**: Color diferent per a cada era (exemple: medieval=blau, moderns=vermell, contemporani=verd)
- **Dark/Light mode**: Suportat
- **Accessibility**: WCAG AA mínim

### Tipografia
- Font sense serif per a títols (Poppins, Helvetica Neue)
- Font serif per a body (Georgia, Merriweather)

### Responsivitat
- Desktop: Timeline horitzontal, taula completa
- Tablet: Timeline semi-comprimida
- Mobile: Timeline vertical, taula scrollable

---

## ⚙️ Instruccions per a Claude Code / Claude

Quan passis el material:

```
Usa aquesta especificació per estructurar el projecte:
- Arxiu: especificacio-historia-2n-bach.md
- Material: [ZIP / links / fitxers]

Tasques:
1. Extreu tota la informació del material
2. Estructura les datas segons la especificació (Ideas | Timeline | Taula)
3. Crea la pàgina web interactiva
4. Implementa col·laboració (Notion API o Google Sheets)
5. Deploy a GitHub Pages

Preferències:
- Fitxers complets (mai fragments)
- Codi autodocumentat
- Responsive i accessible
- Dark mode support
```

---

## ✅ Checklist Desenvolupament

- [ ] Extracció de datas del material
- [ ] Estructura BD (Notion/Google Sheets)
- [ ] Component Ideas Generals (HTML + CSS + JS)
- [ ] Component Timeline (HTML + CSS + JS)
- [ ] Component Taula Comparativa (HTML + CSS + JS)
- [ ] API integration (Notion/Sheets)
- [ ] Responsive design
- [ ] Dark mode
- [ ] Deploy GitHub Pages
- [ ] Col·laboració en temps real
- [ ] Testing

---

## 📝 Notes Generals

- **Prioritat**: Timeline + Taula > Ideas Generals
- **Iteració**: Primer versió simple, després afegir complexitat
- **Manteniment**: Fàcil d'actualitzar quan afegiu més informació
- **Enfocament**: Dominar la matèria, entendre causalitat, veure connexions

---

**Estat**: ✅ Llesta per a desenvolupament  
**Revisat per**: Bones  
**Data última actualització**: 29/09/2026
