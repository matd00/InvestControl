const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const API_KEY = process.env.ALPHA_VANTAGE_KEY;

class AlphaVantageService {
    static async getQuote(symbol) {
        const utl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
        const response = await fetch(utl);
        const data = await response.json();
        return data['Global Quote']
    }
    static async searchSymbol(keywords) {
        const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(keywords)}&apikey=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.bestMatches || [];
    }
}

module.exports = AlphaVantageService;