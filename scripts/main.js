const App = {
  data: { ideas: [], timeline: [], comparativa: [], fonts: [], checkpoints: [] },
  tipusMeta: {
    politica:  { icon: '🏛️', color: '#1565c0', label: 'Política' },
    guerra:    { icon: '⚔️', color: '#b71c1c', label: 'Guerra / conflicte' },
    reforma:   { icon: '📜', color: '#2e7d32', label: 'Reforma legal' },
    social:    { icon: '✊',  color: '#6a1b9a', label: 'Moviment social' },
    cultural:  { icon: '🎭', color: '#ef6c00', label: 'Cultural / identitari' },
    economica: { icon: '💰', color: '#00838f', label: 'Economia' }
  },
  tipusForcaColor: {
    'Dinàstic': '#8b2635',
    'Oposició política': '#4a148c',
    'Obrer': '#37474f',
    'Nacionalista': '#1b5e20'
  }
};

function initTheme() {
  const stored = localStorage.getItem('historia-theme');
  const root = document.documentElement;
  if (stored) root.setAttribute('data-theme', stored);
  updateThemeIcon();

  document.getElementById('theme-toggle').addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ||
      (!root.hasAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const next = current ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('historia-theme', next);
    updateThemeIcon();
  });
}

function updateThemeIcon() {
  const root = document.documentElement;
  const isDark = root.getAttribute('data-theme') === 'dark' ||
    (!root.hasAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.getElementById('theme-icon').textContent = isDark ? '☀️' : '🌙';
}

function openModal(html) {
  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal-overlay').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
}

function initModal() {
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'modal-overlay') closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function renderIdeaLegend(ideas) {
  const legend = document.getElementById('idea-legend');
  legend.innerHTML = ideas.map(idea => `
    <button class="legend-pill" style="--pill-color:${idea.color}" data-id="${idea.id}">
      <span class="legend-dot"></span>${idea.concepte}
    </button>
  `).join('');

  legend.querySelectorAll('.legend-pill').forEach(pill => {
    pill.addEventListener('click', () => showIdeaModal(pill.dataset.id));
  });
}

function showIdeaModal(id) {
  const idea = App.data.ideas.find(i => i.id === id);
  if (!idea) return;
  openModal(`
    <h3 style="color:${idea.color}">${idea.concepte}</h3>
    <p class="modal-meta">${idea.era} · ${idea.durada}</p>
    <p>${idea.definicio}</p>
    <h4>Figures Clau</h4>
    <div class="tag-list">${idea.figuresClau.map(f => `<span class="tag">${f}</span>`).join('') || '<span class="tag">—</span>'}</div>
    <h4>Context Europeu</h4>
    <p>${idea.contextEuropeu}</p>
  `);
}

function loadAllData() {
  Promise.all([
    fetch('data/ideas.json').then(r => r.json()),
    fetch('data/timeline.json').then(r => r.json()),
    fetch('data/comparativa.json').then(r => r.json()),
    fetch('data/fonts.json').then(r => r.json()),
    fetch('data/checkpoints.json').then(r => r.json())
  ]).then(([ideas, timeline, comparativa, fonts, checkpoints]) => {
    App.data.ideas = ideas;
    App.data.timeline = timeline;
    App.data.comparativa = comparativa;
    App.data.fonts = fonts;
    App.data.checkpoints = checkpoints;
    renderIdeaLegend(ideas);
    document.dispatchEvent(new CustomEvent('data:ready'));
  }).catch(err => {
    document.getElementById('idea-legend').innerHTML =
      `<p class="timeline-empty">Error carregant les dades: ${err.message}. Si obres el fitxer directament (file://), prova d'executar-lo amb un servidor local.</p>`;
  });
}

initTheme();
initModal();
loadAllData();
