function renderComparativa() {
  const tipus = document.getElementById('filter-comparativa-tipus').value;
  let rows = App.data.comparativa;
  if (tipus !== 'all') rows = rows.filter(r => r.tipus === tipus);

  const body = document.getElementById('comparativa-body');
  body.innerHTML = rows.map(row => {
    const color = App.tipusForcaColor[row.tipus] || '#888';
    return `
      <tr data-id="${row.id}" tabindex="0">
        <td class="bando-name">${row.bando}</td>
        <td><span class="tipus-pill" style="background:${color}">${row.tipus}</span></td>
        <td>${row.ideesClau}</td>
        <td>${row.lideres}</td>
        <td>${row.baseSocial}</td>
      </tr>
    `;
  }).join('');

  body.querySelectorAll('tr').forEach(tr => {
    const open = () => showComparativaModal(tr.dataset.id);
    tr.addEventListener('click', open);
    tr.addEventListener('keydown', (e) => { if (e.key === 'Enter') open(); });
  });
}

function showComparativaModal(id) {
  const row = App.data.comparativa.find(r => r.id === id);
  if (!row) return;
  const color = App.tipusForcaColor[row.tipus] || '#888';

  openModal(`
    <span class="tipus-pill" style="background:${color}">${row.tipus}</span>
    <h3>${row.bando}</h3>
    <p class="modal-meta">Període actiu: ${row.periodeActiu}</p>
    <h4>Idees Clau</h4>
    <p>${row.ideesClau}</p>
    <h4>Motius Polítics</h4>
    <p>${row.motiusPolitics}</p>
    <h4>Líders</h4>
    <p>${row.lideres}</p>
    <h4>Base Social</h4>
    <p>${row.baseSocial}</p>
    <h4>Context Europeu</h4>
    <p>${row.contextEuropeu}</p>
  `);
}

document.addEventListener('data:ready', () => {
  renderComparativa();
  document.getElementById('filter-comparativa-tipus').addEventListener('change', renderComparativa);
});
