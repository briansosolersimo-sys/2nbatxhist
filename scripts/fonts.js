function renderFonts() {
  const grid = document.getElementById('fonts-grid');
  grid.innerHTML = App.data.fonts.map((f, idx) => `
    <div class="font-card" data-id="${f.id}" tabindex="0">
      <span class="font-number">Font ${idx + 1}</span>
      <h3>${f.titol}</h3>
      <p class="font-meta">${f.autor} · ${f.data}</p>
    </div>
  `).join('');

  grid.querySelectorAll('.font-card').forEach(card => {
    const open = () => showFontModal(card.dataset.id);
    card.addEventListener('click', open);
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter') open(); });
  });
}

function showFontModal(id) {
  const font = App.data.fonts.find(f => f.id === id);
  if (!font) return;
  const relatedEvent = font.timelineRelacionat
    ? App.data.timeline.find(t => t.id === font.timelineRelacionat)
    : null;

  openModal(`
    <h3>${font.titol}</h3>
    <p class="modal-meta">${font.autor} · ${font.data} · ${font.lloc}</p>
    <blockquote>${font.text}</blockquote>
    <p class="source-cite">${font.fontOriginal}</p>
    ${relatedEvent ? `<button class="modal-link-btn" data-timeline="${relatedEvent.id}">→ Fet relacionat: ${relatedEvent.fet}</button>` : ''}
  `);

  const btn = document.querySelector('[data-timeline]');
  if (btn) btn.addEventListener('click', () => showTimelineModal(btn.dataset.timeline));
}

document.addEventListener('data:ready', renderFonts);
