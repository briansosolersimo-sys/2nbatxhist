function renderTimelineEventCard(item, sideClass) {
  const meta = App.tipusMeta[item.tipus] || { icon: '•', color: '#888', label: item.tipus };
  const idea = App.data.ideas.find(i => i.id === item.ideaRelacionada);
  const font = item.fontRelacionada ? App.data.fonts.find(f => f.id === item.fontRelacionada) : null;

  const ideaChip = idea
    ? `<button class="inline-idea-chip" style="--pill-color:${idea.color}" data-idea="${idea.id}"><span class="legend-dot"></span>${idea.concepte}</button>`
    : '';
  const fontSnippet = font
    ? `<button class="inline-font-snippet" data-font="${font.id}">
         <span class="inline-font-label">📜 ${font.titol}</span>
         <span class="inline-font-quote">"${font.text.slice(0, 130).trim()}${font.text.length > 130 ? '…' : ''}"</span>
       </button>`
    : '';

  return `
    <div class="timeline-item ${sideClass}" style="--tipus-color:${meta.color}" data-icon="${meta.icon}" tabindex="0" data-id="${item.id}">
      <span class="timeline-date">${item.data}</span>
      <h3>${item.fet}</h3>
      <p>${item.descripcioBreu}</p>
      <span class="timeline-badge">${meta.label}</span>
      <div class="timeline-inline-relations">
        ${ideaChip}
        ${fontSnippet}
      </div>
    </div>
  `;
}

function renderCheckpointCard(cp) {
  const questionsHtml = cp.preguntes.map((q, qi) => `
    <div class="quiz-question" data-cp="${cp.id}" data-q="${qi}" data-answered="false">
      <p class="quiz-question-text">${qi + 1}. ${q.pregunta}</p>
      <div class="quiz-options">
        ${q.opcions.map((opt, oi) => `
          <button class="quiz-option" data-opt="${oi}">${String.fromCharCode(65 + oi)}) ${opt}</button>
        `).join('')}
      </div>
      <p class="quiz-feedback hidden"></p>
    </div>
  `).join('');

  const openQuestionHtml = cp.pregunta_obert ? `
    <div class="quiz-open">
      <p class="quiz-question-text">${cp.preguntes.length + 1}. ✍️ ${cp.pregunta_obert.enunciat}</p>
      <textarea class="quiz-open-input" rows="3" placeholder="Escriu la teva resposta aquí (no es desa, és només per pensar-hi abans de comparar)..."></textarea>
      <button class="quiz-reveal-btn">Veure la resposta ideal</button>
      <div class="quiz-ideal-answer hidden">
        <strong>Resposta ideal:</strong>
        <p>${cp.pregunta_obert.respostaIdeal}</p>
      </div>
    </div>
  ` : '';

  return `
    <div class="timeline-checkpoint collapsed" data-id="${cp.id}">
      <button class="checkpoint-header" type="button" aria-expanded="false">
        <span class="checkpoint-icon">🧠</span>
        <div class="checkpoint-header-text">
          <span class="checkpoint-range">Punt de control · ${cp.rangeLabel}</span>
          <h3>${cp.titol}</h3>
        </div>
        <span class="checkpoint-chevron">▸</span>
      </button>
      <div class="checkpoint-body hidden">
        <p class="checkpoint-synthesis">${cp.comentariSintesi}</p>
        <div class="checkpoint-quiz">
          ${questionsHtml}
          ${openQuestionHtml}
        </div>
        <button class="checkpoint-retry-btn" type="button">🔄 Torna-ho a fer</button>
      </div>
    </div>
  `;
}

function resetCheckpoint(cpEl) {
  cpEl.querySelectorAll('.quiz-question').forEach(qEl => {
    qEl.dataset.answered = 'false';
    qEl.querySelectorAll('.quiz-option').forEach(btn => {
      btn.classList.remove('correct', 'incorrect', 'disabled');
    });
    const feedback = qEl.querySelector('.quiz-feedback');
    feedback.textContent = '';
    feedback.classList.add('hidden');
    feedback.classList.remove('feedback-correct', 'feedback-incorrect');
  });

  const openBlock = cpEl.querySelector('.quiz-open');
  if (openBlock) {
    openBlock.querySelector('.quiz-open-input').value = '';
    const ideal = openBlock.querySelector('.quiz-ideal-answer');
    ideal.classList.add('hidden');
    openBlock.querySelector('.quiz-reveal-btn').textContent = 'Veure la resposta ideal';
  }
}

function attachQuizHandlers(container) {
  container.querySelectorAll('.timeline-checkpoint').forEach(cpEl => {
    cpEl.addEventListener('click', (e) => e.stopPropagation());

    const header = cpEl.querySelector('.checkpoint-header');
    const body = cpEl.querySelector('.checkpoint-body');
    header.addEventListener('click', () => {
      const isCollapsed = cpEl.classList.toggle('collapsed');
      body.classList.toggle('hidden', isCollapsed);
      header.setAttribute('aria-expanded', String(!isCollapsed));
      header.querySelector('.checkpoint-chevron').textContent = isCollapsed ? '▸' : '▾';
    });

    const retryBtn = cpEl.querySelector('.checkpoint-retry-btn');
    if (retryBtn) retryBtn.addEventListener('click', () => resetCheckpoint(cpEl));

    const revealBtn = cpEl.querySelector('.quiz-reveal-btn');
    if (revealBtn) {
      revealBtn.addEventListener('click', () => {
        const ideal = cpEl.querySelector('.quiz-ideal-answer');
        const nowHidden = ideal.classList.toggle('hidden');
        revealBtn.textContent = nowHidden ? 'Veure la resposta ideal' : 'Amaga la resposta ideal';
      });
    }
  });

  container.querySelectorAll('.quiz-question').forEach(qEl => {
    const cpId = qEl.dataset.cp;
    const qIndex = Number(qEl.dataset.q);
    const cp = App.data.checkpoints.find(c => c.id === cpId);
    const question = cp.preguntes[qIndex];
    const feedback = qEl.querySelector('.quiz-feedback');

    qEl.querySelectorAll('.quiz-option').forEach(optBtn => {
      optBtn.addEventListener('click', () => {
        if (qEl.dataset.answered === 'true') return;
        qEl.dataset.answered = 'true';
        const chosen = Number(optBtn.dataset.opt);
        qEl.querySelectorAll('.quiz-option').forEach((btn, i) => {
          btn.classList.add('disabled');
          if (i === question.correcta) btn.classList.add('correct');
          else if (i === chosen) btn.classList.add('incorrect');
        });
        feedback.textContent = (chosen === question.correcta ? '✓ Correcte. ' : '✗ No exactament. ') + question.explicacio;
        feedback.classList.remove('hidden');
        feedback.classList.add(chosen === question.correcta ? 'feedback-correct' : 'feedback-incorrect');
      });
    });
  });
}

function renderTimeline() {
  const subperiode = document.getElementById('filter-subperiode').value;
  const tipus = document.getElementById('filter-tipus').value;
  const showCheckpoints = subperiode === 'all' && tipus === 'all';

  let items = App.data.timeline.slice().sort((a, b) => a.any - b.any);
  if (subperiode !== 'all') items = items.filter(t => t.subperiode === subperiode);
  if (tipus !== 'all') items = items.filter(t => t.tipus === tipus);

  const container = document.getElementById('timeline-container');
  document.getElementById('timeline-count').textContent = `${items.length} fet${items.length === 1 ? '' : 's'}`;

  if (items.length === 0) {
    container.innerHTML = '<p class="timeline-empty">Cap fet amb aquests filtres.</p>';
    return;
  }

  const checkpointsByEvent = new Map(App.data.checkpoints.map(cp => [cp.afterEventId, cp]));
  let sideCounter = 0;
  let html = '';

  items.forEach(item => {
    sideCounter++;
    html += renderTimelineEventCard(item, sideCounter % 2 === 0 ? 'timeline-side-right' : 'timeline-side-left');
    if (showCheckpoints && checkpointsByEvent.has(item.id)) {
      html += renderCheckpointCard(checkpointsByEvent.get(item.id));
    }
  });

  container.innerHTML = html;

  container.querySelectorAll('.timeline-item').forEach(el => {
    const open = () => showTimelineModal(el.dataset.id);
    el.addEventListener('click', open);
    el.addEventListener('keydown', (e) => { if (e.key === 'Enter') open(); });
  });

  // Inline chips open their own modal without triggering the parent card's modal too
  container.querySelectorAll('.inline-idea-chip').forEach(chip => {
    chip.addEventListener('click', (e) => { e.stopPropagation(); showIdeaModal(chip.dataset.idea); });
  });
  container.querySelectorAll('.inline-font-snippet').forEach(snippet => {
    snippet.addEventListener('click', (e) => { e.stopPropagation(); showFontModal(snippet.dataset.font); });
  });

  attachQuizHandlers(container);
}

function showTimelineModal(id) {
  const item = App.data.timeline.find(t => t.id === id);
  if (!item) return;
  const meta = App.tipusMeta[item.tipus] || { color: '#888', label: item.tipus };
  const idea = App.data.ideas.find(i => i.id === item.ideaRelacionada);
  const font = item.fontRelacionada ? App.data.fonts.find(f => f.id === item.fontRelacionada) : null;

  openModal(`
    <span class="timeline-badge" style="background:${meta.color}">${meta.label}</span>
    <h3>${item.fet}</h3>
    <p class="modal-meta">${item.data}</p>
    <p>${item.descripcioBreu}</p>
    <h4>Causes</h4>
    <p>${item.causes}</p>
    <h4>Conseqüències</h4>
    <p>${item.consequencies}</p>
    <h4>Figures Clau</h4>
    <div class="tag-list">${item.figuresClau.map(f => `<span class="tag">${f}</span>`).join('') || '<span class="tag">—</span>'}</div>
    ${idea ? `<button class="modal-link-btn" data-idea="${idea.id}">→ Idea relacionada: ${idea.concepte}</button>` : ''}
    ${font ? `<button class="modal-link-btn" data-font="${font.id}">→ Font primària: ${font.titol}</button>` : ''}
  `);

  const ideaBtn = document.querySelector('[data-idea]');
  if (ideaBtn) ideaBtn.addEventListener('click', () => showIdeaModal(ideaBtn.dataset.idea));
  const fontBtn = document.querySelector('[data-font]');
  if (fontBtn) fontBtn.addEventListener('click', () => showFontModal(fontBtn.dataset.font));
}

document.addEventListener('data:ready', () => {
  renderTimeline();
  document.getElementById('filter-subperiode').addEventListener('change', renderTimeline);
  document.getElementById('filter-tipus').addEventListener('change', renderTimeline);
});
