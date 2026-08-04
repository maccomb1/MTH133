import Plotly from 'plotly.js-dist-min';

const container = document.getElementById('plotly-container');

function generateTaylorSeries(x, numTerms) {
  let sum = 0;
  for (let i = 0; i < numTerms; i++) {
    sum += Math.pow(x, i);
  }
  return sum;
}

function generateData(numTerms) {
  const xVals = [];
  const yTaylor = [];
  const yOriginal = [];
  
  const step = 0.01;
  for (let x = -0.95; x < 0.95; x += step) {
    xVals.push(x);
    yTaylor.push(generateTaylorSeries(x, numTerms));
    yOriginal.push(1 / (1 - x));
  }
  
  return { xVals, yTaylor, yOriginal };
}

function updatePlot(numTerms) {
  const { xVals, yTaylor, yOriginal } = generateData(numTerms);
  
  const trace1 = {
    x: xVals,
    y: yOriginal,
    mode: 'lines',
    name: '1/(1-x)',
    line: { color: 'blue', width: 2 }
  };
  
  const trace2 = {
    x: xVals,
    y: yTaylor,
    mode: 'lines',
    name: `Taylor (${numTerms} terms)`,
    line: { color: 'red', width: 2, dash: 'dash' }
  };
  
  const layout = {
    title: `Taylor Series Expansion of 1/(1-x)`,
    xaxis: { title: 'x', range: [-0.95, 0.95] },
    yaxis: { title: 'y', range: [-5, 10] },
    hovermode: 'closest'
  };
  
  Plotly.newPlot(container, [trace1, trace2], layout, { responsive: true });
}

const slider = document.getElementById('taylor-slider');
const sliderValue = document.getElementById('slider-value');

slider.addEventListener('input', (e) => {
  const numTerms = parseInt(e.target.value);
  sliderValue.textContent = numTerms;
  updatePlot(numTerms);
});

// Initial plot
updatePlot(parseInt(slider.value));
