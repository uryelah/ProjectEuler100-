let totalSum = 0;
let playable = true;

function looseJsonParse(obj) {
  return Function('"use strict";return (' + obj + ')')();
}

function populateNums(n) {
  document.getElementById('nums').innerHTML = '';
  for (let i = 1; i < n; i++) {
    document.getElementById('nums').innerHTML += `<div class="num" value="${i}">${i}</div>`;
    if (i % 3 === 0 || i % 5 === 0) {
      totalSum += i;
    }
  }
}

window.onload = () => {
  populateNums(document.getElementById('parameter').value);

  document.getElementById('parameter').addEventListener('change', (e) => {
    if (!playable) {
      return
    };
    
    populateNums(parseInt(e.target.value));
  })

  document.getElementById('runCode').addEventListener('click', (e) => {
    if (!playable) return;

    playable = false;
    e.target.classList.remove('activated');
    e.target.classList.add('deactivated');
    document.getElementById('parameter').setAttribute('disabled', true);
    
    let replaceVal = `multipleSum(${document.getElementById('parameter').value})`
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
      document.getElementById('result-message').innerText = 'Congratulations all mines were found';
    } else {
      document.getElementById('result-message').innerText = 'KABOOM!!!!! No luck this time...';
    }

    document.getElementById('reStart').classList.remove('deactivated');
    document.getElementById('reStart').classList.add('activated');
  }); 
  
  document.getElementById('reStart').addEventListener('click', e => {
    document.getElementById('reStart').classList.add('deactivated');
    document.getElementById('reStart').classList.remove('activated');
    document.getElementById('runCode').classList.add('activated');
    document.getElementById('runCode').classList.remove('deactivated');
    document.getElementById('parameter').removeAttribute('disabled');
    document.getElementById('result-message').innerText = '';
    [...document.getElementsByClassName('num')].forEach(num => {
      num.classList.remove('picked');
      num.classList.remove('exploded');
      num.classList.remove('safe');
    });
    playable = true;
  })
};

