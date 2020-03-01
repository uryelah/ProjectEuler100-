const start = (n) => {
  let squareSum = ((n ** 2)*(n + 1)**2)/4;
  let sumSquare = n*(n + 1)*(2*n + 1)/6;

  let newArea = squareSum - sumSquare;

  let newHeight = newArea / Math.sqrt(squareSum);
  let heightPercent = newHeight/Math.sqrt(squareSum);
  console.log(newHeight, newHeight * 55, squareSum);

  document.body.innerHTML += `<div class="container" style="width:${Math.sqrt(squareSum)}px; height:${Math.sqrt(squareSum)}px;">
  <p class='hide-text'></p>
  </div>`;

  const container = document.querySelector('.container');
  const count = document.querySelector('#count');

  document.documentElement.style.setProperty('--bg', `rgb(${Math.floor(Math.random() * (255 - n) + n)}, ${Math.floor(Math.random() * (255 - (n*2)) + n)}, ${Math.floor(Math.random() * (255 - (n * 3)) + n)})`);

  count.style.top = `${100 + Math.sqrt(squareSum) + 60}px`;

  container.style.fontSize = `${14 * (n/10)}px`;
  count.style.fontSize = `${13 * (n/10)}px`;

  container.innerHTML += `<div class='inner' style="width: ${Math.sqrt(sumSquare)}px; height: ${Math.sqrt(sumSquare)}px;"></div>`

  count.classList.remove('hide-text');
  count.innerHTML = `${squareSum}`;

  setTimeout(() => {
    document.querySelector('.inner').style.transform = `scale(1, 1)`;
    count.classList.add('hide-text');
  }, 500);

  setTimeout(() => {
    count.classList.remove('hide-text');
    count.innerHTML = `${squareSum} - ${sumSquare}`;
  }, 1500)

  setTimeout(() => {
    count.classList.add('hide-text');
    container.classList.add('reduce');
    container.style.animation = 'unset';
    container.style.transform = `scale(1.1, ${heightPercent})`;
    document.querySelector('.inner').style.transform = `scale(0, ${2 - heightPercent})`;
  }, 2500);

  setTimeout(() => {
    container.style.transform = `scale(1, ${heightPercent})`;
  }, 3200)

  setTimeout(() => {
    count.classList.add('hide-text');
    container.querySelector('p').classList.remove('hide-text');
    container.querySelector('p').innerText = newArea;
  }, 4500);

  setTimeout(() => {
    count.innerHTML = `${squareSum} - ${sumSquare} = ${newArea}`;
    count.classList.remove('hide-text');
  }, 5000);

  setTimeout(() => {
    count.innerHTML = '';
    count.classList.add('hide-text');
  }, 6000)

  setTimeout(() => {
    container.style.transform = 'scale(0, 0) translate(0, 500px)';
    container.style.opacity = 0;
  }, 6800);

  setTimeout(() => {
    container.remove();
    const num = document.querySelector('#number');
    num.style.display = 'inline-block';
    num.classList.remove('hide-up');
    num.addEventListener('keypress', e => {
      if (!Number.isNaN(parseInt(num.value)) && e.key === 'Enter') {
        num.classList.add('hide-up');
  
        setTimeout(() => {
          num.style.display = 'none';
          start(parseInt(num.value));
          num.value = '';
        }, 300);
      }
    });
  }, 7800);
};

window.onload = () => {
  let num = document.querySelector('#number');
  num.addEventListener('keypress', e => {
    if (!Number.isNaN(parseInt(num.value)) && e.key === 'Enter') {
      num.classList.add('hide-up');

      setTimeout(() => {
        num.style.display = 'none';
        start(parseInt(num.value));
        num.value = '';
      }, 300);
    }
  });
}
