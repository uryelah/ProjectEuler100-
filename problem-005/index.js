window.onload = () => {
  const answer = document.getElementById('answer');
  const dialogs = document.getElementById('dialogs');
  const globula = document.getElementById('monster');
  const lastDialog = document.getElementById('last-dialog');
  const hero = document.getElementById('hero');
  const gitar = document.getElementById('gitar');
  const mainMessage = document.querySelector('.end-message');

  setTimeout(() => {
    mainMessage.classList.add('fade');
  }, 5000)

  const checkDivisibility = (num) => {
    let size = 1;
    let speed = 5;
    gitar.classList.add('show-gitar'); 
    return new Promise((res, rej) => {
      for (let i = 0; i < 20; i++) {
        setTimeout(() => {
          if (num % (i + 1) !== 0) {
            rej(false);
            i = 19;
          } else {
            hero.classList.add('kick');      
            setTimeout(() => {
              hero.classList.remove('kick');
            }, 300)
            size = size * 0.95;
            speed = 5 * 0.6;
            document.getElementById(`${i}`).firstElementChild.classList.add('drop');
            globula.style.scale = `${size}`;
            globula.style.animationDuration = `${speed}s`;
            if (i === 19) {
              gitar.classList.remove('show-gitar'); 
              res(true);
            }
          }
        }, (1000 * i) + 1000)
      }
    });
  }

  answer.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      if (!Number.isNaN(parseInt(answer.value))) {
        dialogs.style.display = 'none';
        checkDivisibility(parseInt(answer.value)).then(() => {
          globula.classList.add('defeated');
          mainMessage.innerText = 'The city sleeps peacefully...';
          setTimeout(() => {
            hero.classList.add('fade');
            mainMessage.classList.remove('fade');
            dialogs.style.display = 'none';
          }, 2000)
        }).catch((rej) => {
          globula.classList.add('done');
          gitar.style.display = 'none';
          hero.classList.add('dead');
          setTimeout(() => {
            document.body.classList.add('game-over');
            mainMessage.innerText = 'The city has fallen...';
            mainMessage.classList.remove('fade');
          }, 2000)
        })
      }
    }
  });
}