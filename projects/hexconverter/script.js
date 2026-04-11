// Hex Converter - JavaScript

(function() {
  'use strict';

  // State
  let currentMode = 'dec-to-hex';

  // DOM Elements
  const modeButtons = document.querySelectorAll('.converter__mode-btn');
  const numberInput = document.getElementById('number-input');
  const convertBtn = document.getElementById('convert-btn');
  const inputHint = document.getElementById('input-hint');
  const resultSection = document.getElementById('result-section');
  const resultValue = document.getElementById('result-value');
  const stepsSection = document.getElementById('steps-section');
  const stepsContainer = document.getElementById('steps-container');

  // Mode Toggle
  modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      if (mode === currentMode) return;

      currentMode = mode;
      updateModeUI();
      clearResults();
    });
  });

  function updateModeUI() {
    modeButtons.forEach(btn => {
      btn.classList.toggle('converter__mode-btn--active', btn.dataset.mode === currentMode);
    });

    if (currentMode === 'dec-to-hex') {
      numberInput.placeholder = 'Enter decimal number (e.g., 255)';
      inputHint.textContent = 'Enter a decimal number (e.g., 255 or -255)';
    } else {
      numberInput.placeholder = 'Enter hex number (e.g., FF)';
      inputHint.textContent = 'Enter a hex number (e.g., FF or -FF)';
    }

    numberInput.value = '';
    numberInput.classList.remove('converter__input--error');
  }

  // Convert Button Click
  convertBtn.addEventListener('click', performConversion);

  // Enter Key Support
  numberInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performConversion();
    }
  });

  function performConversion() {
    clearResults();
    const input = numberInput.value.trim();

    if (!input) {
      showError('Please enter a number');
      return;
    }

    if (currentMode === 'dec-to-hex') {
      convertDecToHex(input);
    } else {
      convertHexToDec(input);
    }
  }

  // Decimal to Hex Conversion
  function convertDecToHex(input) {
    const isNegative = input.startsWith('-');
    const absInput = isNegative ? input.slice(1) : input;

    if (!/^\d+$/.test(absInput)) {
      showError('Please enter a valid decimal number (digits only)');
      return;
    }

    const num = parseInt(absInput, 10);
    if (isNaN(num)) {
      showError('Please enter a valid decimal number');
      return;
    }

    const steps = [];
    let value = num;
    const remainders = [];

    if (num === 0) {
      remainders.push(0);
      steps.push({
        number: 1,
        formula: '0 ÷ 16 = 0 remainder 0',
        result: 'Remainder: 0'
      });
    } else {
      let stepNum = 1;
      while (value > 0) {
        const remainder = value % 16;
        const quotient = Math.floor(value / 16);
        remainders.push(remainder);
        
        steps.push({
          number: stepNum,
          formula: `${value} ÷ 16 = ${quotient} remainder ${remainder}`,
          result: `Remainder: ${remainder} (${intToHex(remainder)})`
        });

        value = quotient;
        stepNum++;
      }
    }

    const hexDigits = remainders.map(r => intToHex(r)).reverse().join('');
    const result = (isNegative ? '-' : '') + hexDigits;

    // Show Result
    resultValue.textContent = result;
    resultSection.classList.remove('hidden');

    // Show Steps
    renderSteps(steps, isNegative, hexDigits);
    stepsSection.classList.remove('hidden');
  }

  // Hex to Decimal Conversion
  function convertHexToDec(input) {
    const isNegative = input.startsWith('-');
    const hexInput = isNegative ? input.slice(1) : input;

    if (!/^[0-9A-Fa-f]+$/.test(hexInput)) {
      showError('Please enter a valid hex number (0-9, A-F only)');
      return;
    }

    const upperHex = hexInput.toUpperCase();
    const steps = [];
    const digits = upperHex.split('').reverse();

    let total = 0;

    digits.forEach((digit, index) => {
      const decimalValue = hexToInt(digit);
      const power = 16 ** index;
      const contribution = decimalValue * power;

      steps.push({
        number: index + 1,
        formula: `${digit} × 16^${index} = ${digit} × ${power}`,
        result: `${decimalValue} × ${power} = ${contribution}`
      });

      total += contribution;
    });

    // Add final sum step
    if (digits.length > 1) {
      const formulaParts = digits.map((d, i) => {
        const dv = hexToInt(d);
        const p = 16 ** i;
        return `(${dv} × ${p})`;
      }).reverse();
      
      steps.push({
        number: steps.length + 1,
        formula: formulaParts.join(' + '),
        result: `Total: ${total}`
      });
    }

    const result = isNegative ? -total : total;

    // Show Result
    resultValue.textContent = result.toString();
    resultSection.classList.remove('hidden');

    // Show Steps
    renderSteps(steps, isNegative, upperHex);
    stepsSection.classList.remove('hidden');
  }

  // Helper Functions
  function intToHex(num) {
    const hexChars = '0123456789ABCDEF';
    return hexChars[num] || num.toString();
  }

  function hexToInt(char) {
    const hexChars = '0123456789ABCDEF';
    return hexChars.indexOf(char.toUpperCase());
  }

  function renderSteps(steps, isNegative, hexValue) {
    stepsContainer.innerHTML = '';

    const inputLabel = currentMode === 'dec-to-hex' ? 'Decimal' : 'Hex';
    const outputLabel = currentMode === 'dec-to-hex' ? 'Hex' : 'Decimal';

    // Add input step
    const inputStep = document.createElement('div');
    inputStep.className = 'converter__step converter__step--highlight';
    inputStep.innerHTML = `
      <span class="converter__step-number">0</span>
      <div class="converter__step-content">
        <div>Input: ${inputLabel}${isNegative ? ' (negative)' : ''}</div>
        <div class="converter__step-result">${numberInput.value}</div>
      </div>
    `;
    stepsContainer.appendChild(inputStep);

    // Add conversion steps
    steps.forEach(step => {
      const stepEl = document.createElement('div');
      stepEl.className = 'converter__step';
      stepEl.innerHTML = `
        <span class="converter__step-number">${step.number}</span>
        <div class="converter__step-content">
          <div class="converter__step-formula">${step.formula}</div>
          <div class="converter__step-result">${step.result}</div>
        </div>
      `;
      stepsContainer.appendChild(stepEl);
    });

    // Add final result step
    const finalStep = document.createElement('div');
    finalStep.className = 'converter__step converter__step--highlight';
    const resultText = currentMode === 'dec-to-hex' 
      ? `${isNegative ? '-' : ''}${hexValue}` 
      : resultValue.textContent;
    finalStep.innerHTML = `
      <span class="converter__step-number">✓</span>
      <div class="converter__step-content">
        <div>Output: ${outputLabel}</div>
        <div class="converter__step-result">${resultText}</div>
      </div>
    `;
    stepsContainer.appendChild(finalStep);
  }

  function showError(message) {
    numberInput.classList.add('converter__input--error');
    inputHint.classList.add('converter__error-message');
    inputHint.textContent = message;
  }

  function clearResults() {
    numberInput.classList.remove('converter__input--error');
    inputHint.classList.remove('converter__error-message');
    
    if (currentMode === 'dec-to-hex') {
      inputHint.textContent = 'Enter a decimal number (e.g., 255 or -255)';
    } else {
      inputHint.textContent = 'Enter a hex number (e.g., FF or -FF)';
    }

    resultSection.classList.add('hidden');
    resultValue.textContent = '';
    stepsSection.classList.add('hidden');
    stepsContainer.innerHTML = '';
  }

})();