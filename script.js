// Variáveis globais para acompanhar os valores máximos e mínimos de tensão
let maxY = -Infinity;
let minY = Infinity;

function displayVal(value, elementId, lineId){
    // Atualiza o valor do elemento
    document.getElementById(elementId).textContent = value;

    // Recupera os valores atuais das barras
    const strain_rate = parseFloat(document.getElementById('slid1').value);
    const T = parseFloat(document.getElementById('slid2').value);
    const A = parseFloat(document.getElementById('slid3').value);
    const m1 = parseFloat(document.getElementById('slid4').value);
    const m2 = parseFloat(document.getElementById('slid5').value);
    const m3 = parseFloat(document.getElementById('slid6').value);
    const m4 = parseFloat(document.getElementById('slid7').value);
    const m5 = parseFloat(document.getElementById('slid8').value);
    const m6 = parseFloat(document.getElementById('slid9').value);
    const m7 = parseFloat(document.getElementById('slid10').value);
    const m8 = parseFloat(document.getElementById('slid11').value);
    const m9 = parseFloat(document.getElementById('slid12').value);

    // Array para armazenar os pontos da curva com base na equação de Hensel-Spittel
    const pointsHenselSpittel = [];

    // Acumulador para o eixo X (strain)
    let cumulativeStrain = 0.001;

    while (cumulativeStrain <= 2) {
        const kelvinT = T + 273.15; // Conversão de Celsius para Kelvin
        const sigma = A * Math.exp(m1 * kelvinT) * Math.pow(kelvinT, m9) * Math.pow(cumulativeStrain, m2) *
              Math.exp(m4 / cumulativeStrain) * Math.pow(1 + cumulativeStrain, m5 * kelvinT) *
              Math.exp(m7 * cumulativeStrain) * Math.pow(strain_rate, m3) *
              Math.pow(strain_rate, m8 * kelvinT);

        const x = 20 + (cumulativeStrain / 4) * 320; // Ajuste para ir até 4 em x
        const y = 460 - sigma; // Calcula a posição vertical com base na tensão
        pointsHenselSpittel.push(`${x},${y}`);
        // Atualiza os valores máximos e mínimos de tensão
        maxY = Math.max(maxY, y);
        minY = Math.min(minY, y);
        cumulativeStrain += 0.001; // Incrementa o acumulador de strain
    }

    // Atualiza a polyline do gráfico com os novos pontos
    //document.getElementById(lineId).setAttribute('points', pointsHenselSpittel.join(' '));
    document.getElementById(lineId).setAttribute('points', pointsHenselSpittel.map(point => {
        const [x, y] = point.split(',').map(parseFloat);
        return `${x * 2},${y}`; // Aumenta o tamanho no eixo X multiplicando por 2
    }).join(' '));


    // Selecione o elemento <div> pelo ID
    const graphInfo = document.getElementById('graph-info');

    // Defina o texto do elemento
    graphInfo.textContent = 'm1<0 Sensível a temperatura, m2 > 0 representa o comportamento  exponencial da curva (aumento da densidade de discordâncias), m3 representa a sensibilidade a taxa de deformação (se > 0 a tensão aumenta com o aumento da taxa de deformação) '
   





    // Atualiza a escala do eixo Y com base nos valores máximos e mínimos de tensão
    const svg = document.getElementById('graph');
    const yScale = svg.createSVGTransform();
    yScale.setMatrix(svg.createSVGMatrix().scale(1, 360 / (maxY - minY)));
    svg.getElementById('line_hensel_spittel').transform.baseVal.initialize(yScale);
}

function updateSlider(sliderId, value) {
    // Atualiza o valor do slider e a exibição correspondente
    document.getElementById(sliderId).value = value;
    document.getElementById(`initialSliderValue${sliderId.slice(-1)}`).textContent = value;
    // Atualiza o gráfico
    displayVal(value, `initialSliderValue${sliderId.slice(-1)}`, 'line_hensel_spittel');
}

// Inicializa o gráfico
displayVal(0.001, 'initialSliderValue1', 'line_hensel_spittel'); // Inicializa com um valor de strain_rate de 0.001
displayVal(1000, 'initialSliderValue2', 'line_hensel_spittel'); // Inicializa com um valor de T de 850°C
displayVal(200, 'initialSliderValue3', 'line_hensel_spittel'); // Inicializa com um valor de A de 0
displayVal(-0.0005, 'initialSliderValue4', 'line_hensel_spittel'); // Inicializa com um valor de m1 de 0
displayVal(0, 'initialSliderValue5', 'line_hensel_spittel'); // Inicializa com um valor de m2 de 0
displayVal(0, 'initialSliderValue6', 'line_hensel_spittel'); // Inicializa com um valor de m3 de 0
displayVal(0, 'initialSliderValue7', 'line_hensel_spittel'); // Inicializa com um valor de m4 de 0
displayVal(0, 'initialSliderValue8', 'line_hensel_spittel'); // Inicializa com um valor de m5 de 0
displayVal(0, 'initialSliderValue9', 'line_hensel_spittel'); // Inicializa com um valor de m6 de 0
displayVal(0, 'initialSliderValue10', 'line_hensel_spittel'); // Inicializa com um valor de m7 de 0
displayVal(0, 'initialSliderValue11', 'line_hensel_spittel'); // Inicializa com um valor de m8 de 0
displayVal(0, 'initialSliderValue12', 'line_hensel_spittel'); // Inicializa com um valor de m9 de 0
