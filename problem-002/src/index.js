
const Fibonacci = (n) => {
  let fibs = [1,1];

  if (n === 1) {
    return [1]
  } else if (n === 2) {
    return fibs
  }

  let fib;
  let len;
  let sum = 0;

  for (let i = 2; i < n; i++) {
    len = fibs.length - 1
    fib = fibs[len] + fibs[len -1]

    if (fib > n) {
      return fibs;
    }

    fibs.push(fib);
    if (fib <= n && fib % 2 === 0) {
      sum += fib;
    }
  }
  return fibs
}

const insertedN = (n) => {
  let even = 0;
  let fibs = Fibonacci(n);
  console.log(fibs)
  let mid = [201, 201];
  let domFibs = document.getElementById('fibs');
  domFibs.style.transform = `scale(${1})`
  let x = [mid[0], mid[0]]
  let y = [mid[1], mid[1]]
  let j = -1
  let direc = ['top', 'left', 'bottom', 'right']
  let rotate = 33;
  let translate = 2;
  let scale = 1;
  let dark = 100;
  domFibs.innerHTML += `<div class='fib' style='transform: rotate(${rotate}deg) translateY(${translate}px) scale(1)'><div>`
  for (let i = 0; i < fibs.length; i++) {
    setTimeout(() => {
    rotate += 58.8
    translate += 4
    translate *= 1.001
    scale *= 1.005
    dark += 7.9
    let fib = fibs[i]
    if (i === 0) {
      null
    } else {  
      if (j < 3) {
        j++
      } else {
        j = 0
      }
  
      if (direc[j] === 'top') {
       // mid[0] -= fib;
        if (i !== 1) {
         // mid[1] -= fibs[i - 2];
        }
      } else if (direc[j] === 'left') {
        //mid[1] -= fibs[i];
      } else if (direc[j] === 'bottom') {
        //mid[0] += fibs[i - 1];
      } else if (direc[j] === 'right') {
        //mid[1] += fibs[i - 1];
        //mid[0] -= fibs[i - 2];
      }

      x = [mid[0], mid[0]]
      y = [mid[1], mid[1]]
      if (fib % 2 === 0) {
        even += fib
        domFibs.innerHTML += `<div id='${fib}' class='fib even-fib' style='transform: rotate(${rotate}deg) translateY(${translate}px) scale(${scale}); filter: hue-rotate(${dark}deg);'><div>`
      } else {
        domFibs.innerHTML += `<div id='${fib}' class='fib' style='transform: rotate(${rotate}deg) translateY(${translate}px) scale(${scale});'><div>`
      }
    }
  }, 6 * i)
  }

  setTimeout(() => {
    let counter = document.getElementById('counter')
    let scale = 1;
    let sum = 0;
    counter.classList.add('up');
    [...document.getElementsByClassName('even-fib')].reverse().forEach((n, i, arr) => {
      setTimeout(() => {
        scale *= 1.07;
        sum += parseInt(n.id)
        if (sum > 10000) {
          counter.innerText = sum.toExponential(5);
        } else {
          counter.innerText = sum//.toExponential(3);
        }

        if (sum > 1000000000000000) {
          document.getElementById('meme').classList.add('o1')
        }
        //n.style.transform = 'translateY(0) scale(1) rotate(0)'
        counter.style.transform = `translateX(calc(50vw - ${10}px)) translateY(calc(50vh)) scale(${scale})`;
        n.classList.add('chill')
        counter.style.transform = `translateX(calc(50vw - ${10}px)) translateY(calc(50vh)) scale(${scale})`;
        if (i === arr.length - 1) {
          counter.style.transform = `translateX(calc(50vw - ${10}px)) translateY(calc(50vh)) scale(${30})`;
          document.getElementById('again').classList.remove('dis')
        }
      }, 1000 + (166 * i))
    })
  }, 1000)

  console.log(even)

}


window.onload = () => {
  let input = document.querySelector('input');
  document.getElementById('n').addEventListener('click', e => {
    insertedN(parseInt(input.value))
    e.target.classList.add('dis')
    input.classList.add('dis')
  })

  document.getElementById('again').addEventListener('click', e => {
    document.getElementById('again').classList.add('dis')
    document.getElementById('counter').classList.remove('up')
    document.getElementById('counter').style.transform = '';
    document.querySelector('input').classList.remove('dis')
    document.getElementById('n').classList.remove('dis')
    document.getElementById('fibs').innerHTML = ''
    document.getElementById('fibs').style.transform = ''
    document.getElementById('meme').classList.remove('o1')
  })
}