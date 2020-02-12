let totalSum = 0;
let playable = true;

const looseJsonParse = (obj) => {
  return Function('"use strict";return (' + obj + ')')();
}

const populateNums = (n) => {
  document.getElementById('nums').innerHTML = '';
  for (let i = 1; i < n; i++) {
    document.getElementById('nums').innerHTML += `<div class="num" value="${i}">${i}</div>`;
    if (i % 3 === 0 || i % 5 === 0) {
      totalSum += i;
    }
  }
}

window.onload = () => {
  const restartBtn =  document.getElementById('reStart');
  const runBtn = document.getElementById('runCode');
  const numInput = document.getElementById('parameter');
  const resultMessage = document.getElementById('result-message');

  populateNums(numInput.value);

  numInput.addEventListener('change', (e) => {
    if (!playable) {
      return
    };
    
    populateNums(parseInt(e.target.value));
  })

  runBtn.addEventListener('click', (e) => {
    if (!playable) return;

    playable = false;
    e.target.classList.remove('activated');
    e.target.classList.add('deactivated');
    numInput.setAttribute('disabled', true);
    
    let replaceVal = `multipleSum(${numInput.value})`
    let text = document.getElementById('code-space').innerText;
    text = text.replace('multipleSum(n)', replaceVal)

    const result = looseJsonParse(
      eval(text)
    );
    
    let count = 0;
    [...document.getElementsByClassName('num')].forEach(num => {
      num.classList.remove('picked');
      num.classList.remove('exploded');
      num.classList.remove('safe');
      if (parseInt(num.getAttribute('value')) % 3 === 0 || parseInt(num.getAttribute('value')) % 5 === 0) {
        num.classList.add('safe');
        count += parseInt(num.getAttribute('value'));
      } else {
        if (result === totalSum) {
          num.classList.add('picked');
        } else {
          num.classList.add('exploded');
        }
      }
    });
    if (result === totalSum) {
      resultMessage.innerText = 'Congratulations all mines were found';
    } else {
      resultMessage.innerText = 'KABOOM!!!!! No luck this time...';
    }

    restartBtn.classList.remove('deactivated');
    restartBtn.classList.add('activated');
  }); 
  
  restartBtn.addEventListener('click', e => {
    restartBtn.classList.add('deactivated');
    restartBtn.classList.remove('activated');
    runBtn.classList.add('activated');
    runBtn.classList.remove('deactivated');
    numInput.removeAttribute('disabled');
    resultMessage.innerText = '';
    [...document.getElementsByClassName('num')].forEach(num => {
      num.classList.remove('picked');
      num.classList.remove('exploded');
      num.classList.remove('safe');
    });
    playable = true;
  })
};

