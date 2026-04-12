document.addEventListener('DOMContentLoaded', function() {
  const wheelOuter = document.getElementById('wheel-outer');
  const wheelInner = document.getElementById('wheel-inner');
  const rotationDisplay = document.getElementById('rotation-display');
  const rotationSelect = document.getElementById('rotation-select');
  const inputText = document.getElementById('input-text');
  const outputText = document.getElementById('output-text');
  const inputLabel = document.getElementById('input-label');
  const outputLabel = document.getElementById('output-label');
  const copyBtn = document.getElementById('copy-btn');
  const modeBtns = document.querySelectorAll('.cipher__mode-btn');

  let currentMode = 'encrypt';
  let currentRotation = 0;
  const totalLetters = 26;
  const letterSpacing = 360 / totalLetters;

  function positionLetters(wheel, isInner = false) {
    const letters = wheel.querySelectorAll('.cipher__wheel-letter');
    const radius = isInner ? 75 : 115;

    letters.forEach((letter, index) => {
      const angle = index * letterSpacing - 90;
      const radians = angle * (Math.PI / 180);
      const x = Math.cos(radians) * radius;
      const y = Math.sin(radians) * radius;
      
      letter.style.left = `calc(50% + ${x}px - 8px)`;
      letter.style.top = `calc(50% + ${y}px - 8px)`;
    });
  }

  function updateWheelRotation(rotation) {
    currentRotation = rotation;
    rotationDisplay.textContent = rotation;
    
    const rotationAngle = rotation * letterSpacing;
    wheelInner.style.transform = `rotate(${rotationAngle}deg)`;
    
    const innerLetters = wheelInner.querySelectorAll('.cipher__wheel-letter');
    innerLetters.forEach((letter) => {
      letter.style.transform = `rotate(${-rotationAngle}deg)`;
    });
  }

  function caesarCipher(text, rotation, mode) {
    const shift = mode === 'encrypt' ? rotation : -rotation;
    
    return text.split('').map(char => {
      if (char.match(/[a-z]/i)) {
        const base = char === char.toUpperCase() ? 65 : 97;
        const shifted = ((char.charCodeAt(0) - base + shift + 26) % 26) + base;
        return String.fromCharCode(shifted);
      }
      return char;
    }).join('');
  }

  function processText() {
    const input = inputText.value;
    const result = caesarCipher(input, currentRotation, currentMode);
    outputText.value = result;
  }

  function updateMode(mode) {
    currentMode = mode;
    
    modeBtns.forEach(btn => {
      btn.classList.remove('cipher__mode-btn--active');
      if (btn.dataset.mode === mode) {
        btn.classList.add('cipher__mode-btn--active');
      }
    });

    if (mode === 'encrypt') {
      inputLabel.textContent = 'Text to Encrypt:';
      outputLabel.textContent = 'Encrypted Result:';
    } else {
      inputLabel.textContent = 'Text to Decrypt:';
      outputLabel.textContent = 'Decrypted Result:';
    }

    processText();
  }

  function copyToClipboard() {
    const textToCopy = outputText.value;
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyBtn.textContent = originalText;
        }, 2000);
      });
    }
  }

  positionLetters(wheelOuter, false);
  positionLetters(wheelInner, true);
  updateWheelRotation(0);

  rotationSelect.addEventListener('change', function(e) {
    updateWheelRotation(parseInt(e.target.value, 10));
    processText();
  });

  inputText.addEventListener('input', processText);

  modeBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      updateMode(e.target.dataset.mode);
    });
  });

  copyBtn.addEventListener('click', copyToClipboard);
});