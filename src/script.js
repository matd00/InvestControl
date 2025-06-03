function convert() {
    const amount = parseFloat(document.getElementById("amount").value);
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const resultadoDiv = document.getElementById("resultado");

    if (isNaN(amount) || amount <= 0) {
        alert("Por favor, insira um valor válido e positivo!");
        return;
    }

    const fees = {
        BRL: { USD: 0.18, EUR: 0.15, BRL: 1 },
        USD: { BRL: 5.67, EUR: 0.87, USD: 1 },
        EUR: { BRL: 6.49, USD: 1.14, EUR: 1 },
    };

    const fee = fees[from][to];
    const result = fee * amount;
    
    resultadoDiv.classList.remove("mostrar");
    
    resultadoDiv.textContent = "";

    setTimeout(() => {
        resultadoDiv.textContent = `* ${result.toFixed(2)} ${to}`;
        resultadoDiv.classList.add("mostrar");
    }, 50);
}