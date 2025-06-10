const AlphaVantageService = require('./AlphaVantageService');

class AlphaVantageController {
static async getAssetQuote(req, res) {
    try {
        const { symbol } = req.query;
        if (!symbol) return res.status(400).json({ error: 'Símbolo não informado.' });

        const quote = await AlphaVantageService.getQuote(symbol);
        if (!quote || !quote['01. symbol']) {
            return res.status(404).json({ error: 'Ativo não encontrado.' });
    }

      // Mapeie os dados para um formato amigável
    res.json({
        simbolo: quote['01. symbol'],
        cotacao: quote['05. price'],
        abertura: quote['02. open'],
        maxima: quote['03. high'],
        minima: quote['04. low'],
        volume: quote['06. volume'],
        ultima_negociacao: quote['07. latest trading day'],
        variacao: quote['09. change'],
        variacao_percentual: quote['10. change percent'],
        
    });
    } catch (err) {
        console.error('Erro ao buscar ativo:', err);
        res.status(500).json({ error: 'Erro ao buscar ativo.' });
        }
    }
    static async searchAssets(req, res) {
        try {
            const { q } = req.query;
            if (!q) return res.status(400).json({ error: 'Termo de busca não informado.' });

            const results = await AlphaVantageService.searchSymbol(q);
            // Mapeia para um 
            const mapped = results.map(item => ({
                symbol: item['1. symbol'],
                name: item['2. name'],
                region: item['4. region'],
                currency: item['8. currency'],
            }));
            res.json(mapped);
        } catch (err) {
            console.error('Erro na busca fuzzy:', err);
            res.status(500).json({ error: 'Erro ao buscar ativos.' });
        }
    }
}

module.exports = AlphaVantageController;