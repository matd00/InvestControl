document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('search-btn');
  const assetInput = document.getElementById('asset-input');
  const assetResult = document.getElementById('asset-result');

  let timeout;

  // Event listeners
  assetInput.addEventListener('input', handleAutocomplete);
  searchBtn.addEventListener('click', fetchAssetDetails);
  document.addEventListener('click', closeSuggestionsOnClickOutside);

  function handleAutocomplete() {
    clearTimeout(timeout);
    const query = assetInput.value.trim();
    if (query.length < 2) return;

    timeout = setTimeout(async () => {
      const suggestions = await fetchSuggestions(query);
      renderSuggestions(suggestions);
    }, 300);
  }

  async function fetchSuggestions(query) {
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      return response.ok ? await response.json() : [];
    } catch (error) {
      console.error('Erro ao buscar sugestões:', error);
      return [];
    }
  }

  function renderSuggestions(list) {
  let dropdown = document.getElementById('suggestions');
  if (!dropdown) {
    dropdown = createDropdown();
  }

  if (!list.length) {
    dropdown.innerHTML = `<div class="suggestion-empty">Nenhum ativo encontrado.</div>`;
    dropdown.style.display = 'block';
    return;
  }

  dropdown.innerHTML = `
    <div class="suggestion-list">
      ${list.map(item => `
        <div class="suggestion-item" data-symbol="${item.symbol}">
          <div class="suggestion-logo">
            ${getLogoPlaceholder(item.symbol)}
          </div>
          <div class="suggestion-info">
            <div class="suggestion-symbol">${item.symbol}</div>
            <div class="suggestion-name">${item.name}</div>
            <div class="suggestion-region">${item.region || ''}</div>
          </div>
          <button class="suggestion-action">Ação</button>
        </div>
      `).join('')}
    </div>
  `;
  dropdown.style.display = 'block';

  attachSuggestionClickHandlers(dropdown);
}

function getLogoPlaceholder(symbol) {
  // Você pode trocar por um SVG, emoji, ou inicial do ativo
  return symbol[0] || '?';
}

  function createDropdown() {
    const dropdown = document.createElement('div');
    dropdown.id = 'suggestions';
    dropdown.style.position = 'absolute';
    dropdown.style.background = '#222';
    dropdown.style.color = '#fff';
    dropdown.style.width = assetInput.offsetWidth + 'px';
    dropdown.style.zIndex = 1000;
    assetInput.parentNode.appendChild(dropdown);
    return dropdown;
  }

  function attachSuggestionClickHandlers(dropdown) {
    dropdown.querySelectorAll('.suggestion-item').forEach(item => {
      item.onclick = () => {
        assetInput.value = item.dataset.symbol;
        dropdown.style.display = 'none';
      };
    });
  }

  function closeSuggestionsOnClickOutside(event) {
    const dropdown = document.getElementById('suggestions');
    if (dropdown && !assetInput.contains(event.target)) {
      dropdown.style.display = 'none';
    }
  }

  async function fetchAssetDetails() {
    const symbol = assetInput.value.trim().toUpperCase();
    if (!symbol) return;

    assetResult.textContent = 'Buscando...';

    try {
      const data = await fetchAssetData(symbol);
      renderAssetDetails(data);
    } catch {
      assetResult.textContent = 'Erro ao buscar ativo.';
    }
  }

  async function fetchAssetData(symbol) {
    try {
      const response = await fetch(`/api/asset?symbol=${symbol}`);
      if (!response.ok) throw new Error('Ativo não encontrado.');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar dados do ativo:', error);
      throw new Error('Erro ao buscar dados.');
    }
  }

  function renderAssetDetails(data) {
    const { simbolo, preco, abertura, maxima, minima, volume, ultima_negociacao, variacao, variacao_percentual } = data;
    assetResult.innerHTML = `
      <div class="asset-card">
        <h3>${simbolo}</h3>
        ${renderAssetDetail('Preço atual', preco)}
        ${renderAssetDetail('Abertura', abertura)}
        ${renderAssetDetail('Máxima', maxima)}
        ${renderAssetDetail('Mínima', minima)}
        <p><b>Volume:</b> ${volume}</p>
        <p><b>Última negociação:</b> ${ultima_negociacao}</p>
        <p><b>Variação:</b> ${variacao} (${variacao_percentual})</p>
      </div>
    `;
  }

  function renderAssetDetail(label, value) {
    return `<p><b>${label}:</b> R$ ${Number(value).toFixed(2)}</p>`;
  }
});
