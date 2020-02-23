const shotArr = [];

let heigh;

let w = 11;
let h = 7;
let velocity = 10;

const shoot = (len) => {
  heigh = heigh ? heigh : len - 1;
  let str = `${heigh}${Math.floor(Math.random() * len)}`;
  console.log(shotArr)
  if (!shotArr.includes(str)) {
    shotArr.push(str);
    if (shotArr.length % len === 0) {
      heigh--;
    }
  }
}

const findPalindrome = (n) => {

  let r = 0;
  let n1 = parseInt('9'.repeat(n));
  let limit = parseInt('9'.repeat(n - 1));
  let minus = parseInt('1'.repeat(n - 1));
  const arr = [];

  for (let p = n1; p > limit; p--) {

    for (let q = n1; q > limit; q--) {

      let t = p * q;

      if (isPalindrome(t)) {
        arr.push(t);
        r = t;
        break
      } else if (t < r) {
        break;
      }
    }
  }
  console.log(arr.sort())
  return arr;
}

const isPalindrome = (x) => {
  const str = `${x}`;

  return str === str.split('').reverse().join('');
}

const abSum = (n, m) => {
  const inner = (num) => {
    if (num < 10) {
      return num
    } else {
      let arr = `${num}`.split('');
      let number = arr.reduce((acc, cr) => acc += (cr * 1), 0);
      return inner(number)
    }
  }

  return inner((n + m)%10)
}


window.onload = () => {
  //const choseNum = 2;
  //let largestPalindrome = findPalindrome(choseNum);
  //document.body.innerHTML += `<div id='crochet-${choseNum}' class='crochet'></div>`;
  //const choseNum2 = 3;
  //let largestPalindrome2 = findPalindrome(choseNum2);
  //document.body.innerHTML += `<div id='crochet-${choseNum2}' class='crochet'></div>`;
  //const choseNum3 = 4;
  //let largestPalindrome3 = findPalindrome(choseNum3);
  //document.body.innerHTML += `<div id='crochet-${choseNum3}' class='crochet'></div>`;
  //const choseNum4 = 5;
  //let largestPalindrome4 = findPalindrome(choseNum4);
  //document.body.innerHTML += `<div id='crochet-${choseNum4}' class='crochet'></div>`;
  const choseNum5 = 6;
  let largestPalindrome5 = findPalindrome(choseNum5);
  let screen = document.getElementById('screen');
  let shooter = document.getElementsByClassName('shooter');
  screen.innerHTML += `<div id='crochet-${choseNum5}' class='crochet'></div>`;
  let shooting = false;

  let answer = document.getElementById('numb');

  answer.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      answer.style.display = 'none';
      document.getElementsByClassName('crochet')[0].classList.add('speedUp');
      velocity = 5;

        if (e.target.value === '999000000999') {
            w = 6;
            h = 6;
            document.getElementsByClassName('crochet')[0].classList.add('right');
        } else {
          document.getElementsByClassName('crochet')[0].classList.add('wrong');
        }
        velocity = 10;
    }
  })
/*
  document.addEventListener('keydown', e => {
    let ammo = document.getElementById('ammo');

    if (e.key === ' ' && !shooting) {
      document.getElementById('ammo').classList.add('ammo-on');
      shooting = true;
    }

    if (e.key === 'ArrowRight') {
      [...shooter].forEach((cell, i) => {
        let to = parseInt(cell.style.gridColumn) + 1

        if ((i === 3 && to <= 26) || (i === 2 && to <= 25) || (i === 1 && to <= 24) || (i === 0 && to <= 25)) {
          cell.style.gridColumn = parseInt(cell.style.gridColumn) + 1;
        }
      });
      let aim = parseInt(ammo.style.gridColumn) + 1;
      if (aim <= 25) {
        ammo.style.gridColumn = parseInt(ammo.style.gridColumn) + 1;
      }
    } else if (e.key === 'ArrowLeft') {
      [...shooter].forEach((cell, i) => {
        let to = parseInt(cell.style.gridColumn) - 1;

        if ((i === 3 && to >= 3) || (i === 2 && to >= 2) || (i === 1 && to >= 1) || (i === 0 && to >= 2)) {
          cell.style.gridColumn = parseInt(cell.style.gridColumn) - 1;
        }
      });
      let aim = parseInt(ammo.style.gridColumn) - 1;
      if (aim >= 2) {
        ammo.style.gridColumn = parseInt(ammo.style.gridColumn) - 1;
      }
    }
  })
*/
  const loopPat = (n, arr) => {
    let i = 0;
    let firstTime = true;
    document.getElementById(`crochet-${n}`).innerHTML = '';
    arr.forEach((palindrome, i, arr) => {
      setTimeout(() => {
        if (i > 399) return;
        let largestString = `${palindrome}`;
        let crochet = document.getElementById(`crochet-${n}`);
        crochet.style.gridTemplateColumns = `repeat(${n * 2}, ${30/n}px)`;
        crochet.style.gridTemplateRows = `repeat(${n * 2},  ${30/n}px)`;
        let d;
        let c;

    
        for (let k in largestString) {
          for (let j in largestString) {
            //setTimeout(() => {
              c = largestString[k]
              d = largestString[j]
              crochet.innerHTML += `<div class='n${abSum(parseInt(c), parseInt(d))}'></div>`
            //}, 50 + ((i + j) * 100))
           if (i > 1 || !firstTime) {
            crochet.removeChild(crochet.firstElementChild);
            firstTime = false;
           };
          }
        }
      }, (i * 100));
    });
  };

  const loopPat2 = (n, arr) => {
    let i = 0;
    let firstTime = true;
    document.getElementById(`crochet-${n}`).innerHTML = '';
    arr.forEach((palindrome, i, arr) => {
      setTimeout(() => {
        if (i > 399) return;
        let largestString = `${palindrome}`;
        let crochet = document.getElementById(`crochet-${n}`);
        crochet.style.gridTemplateColumns = `repeat(${n * 2}, ${30/n}px)`;
        crochet.style.gridTemplateRows = `repeat(${n * 2},  ${30/n}px)`;
        let d;
        let c;
    
        for (let k in largestString) {
          for (let j in largestString) {
            //setTimeout(() => {
              c = largestString[k]
              d = largestString[j]
              crochet.innerHTML += `<div class='n${abSum(parseInt(c), parseInt(d))}'></div>`
            //}, 50 + ((i + j) * 100))
           if (i > 1 || !firstTime) {
            crochet.removeChild(crochet.firstElementChild);
            firstTime = false;
           };
          }
        }
      }, (i * 100));
    });
  };

  const loopPat3 = (n, arr) => {
    let i = 0;
    let firstTime = true;
    document.getElementById(`crochet-${6}`).innerHTML = '';
    arr.forEach((palindrome, i, arr) => {
      setTimeout(() => {
        if (i > 399) return;
        let largestString = `${palindrome}`;
        let crochet = document.getElementById(`crochet-${n}`);
        crochet.style.gridTemplateColumns = `repeat(${n * 2}, ${30/n}px)`;
        crochet.style.gridTemplateRows = `repeat(${n * 2},  ${30/n}px)`;
        let d;
        let c;
    
        for (let k in largestString) {
          for (let j in largestString) {
            //setTimeout(() => {
              c = largestString[k]
              d = largestString[j]
              crochet.innerHTML += `<div class='n${abSum(parseInt(c), parseInt(d))}'></div>`
            //}, 50 + ((i + j) * 100))
           if (i > 1 || !firstTime) {
            crochet.removeChild(crochet.firstElementChild);
            firstTime = false;
           };
          }
        }
      }, (i * 100));
    });
  };
  const loopPat4 = (n, arr) => {
    let i = 0;
    let firstTime = true;
    document.getElementById(`crochet-${n}`).innerHTML = '';
    arr.forEach((palindrome, i, arr) => {
      setTimeout(() => {
        if (i > 399) return;
        let largestString = `${palindrome}`;
        let crochet = document.getElementById(`crochet-${n}`);
        crochet.style.gridTemplateColumns = `repeat(${n * 2}, ${30/n}px)`;
        crochet.style.gridTemplateRows = `repeat(${n * 2},  ${30/n}px)`;
        let d;
        let c;
    
        for (let k in largestString) {
          for (let j in largestString) {
            //setTimeout(() => {
              c = largestString[k]
              d = largestString[j]
              crochet.innerHTML += `<div class='n${abSum(parseInt(c), parseInt(d))}'></div>`
            //}, 50 + ((i + j) * 100))
           if (i > 1 || !firstTime) {
            crochet.removeChild(crochet.firstElementChild);
            firstTime = false;
           };
          }
        }
      }, (i * 100));
    });
  };

  const loopPat5 = (n, arr) => {
    let i = 0;
    let firstTime = true;
    let marginTop = 0 //-19 * n;
    //let ammo = document.getElementById('ammo');

    document.getElementById(`crochet-${n}`).innerHTML = '';
    arr.forEach((palindrome, i, arr) => {
      if (i >= 250) return;
      setTimeout(() => {
        if (i > 399) return;
        let largestString = `${palindrome}`;
        let crochet = document.getElementById(`crochet-${n}`);
        // 11 7
        crochet.style.gridTemplateColumns = `repeat(${w * 2}, ${32}px)`;
        crochet.style.gridTemplateRows = `repeat(${h * 2},  ${32}px)`;
        crochet.style.height = `${n * 2 * 35}px`;
        crochet.style.width = `${n * 2 * 35}px`;
        crochet.style.marginTop = `calc(50vh - ${(n * 2 * 35)/1.9}px)`;
        let d;
        let c;

        //if (i % 10 === 0) {
          //marginTop += 19;
          //console.log(marginTop, i)
        //}
/*
        if (shooting) {
          if (parseInt(ammo.style.marginTop) < -400) {
            shooting = false;
            ammo.style.marginTop = `0px`;
            ammo.classList.remove('ammo-on');
          } else {
            console.log(ammo.style.marginTop)
            ammo.style.marginTop = `${parseInt(ammo.style.marginTop) - 51}px`;
          }
        }

        if (shotArr.length >= (largestString.length - 1) * (largestString.length - 1)) {
          return
        }
*/
        //shoot(largestString.length);

        for (let k in largestString) {
          for (let j in largestString) {
            //setTimeout(() => {
              c = largestString[k]
              d = largestString[j]

              if (shotArr.includes(`${k}${j}`)) {
                crochet.innerHTML += `<div class=''></div>`
              } else {
                crochet.innerHTML += `<div class='yikes n${abSum(parseInt(c), parseInt(d))}'></div>`
              }


            //}, 50 + ((i + j) * 100))
           if (i > 1 || !firstTime) {
            crochet.removeChild(crochet.firstElementChild);
            firstTime = false;
           };
          }
        }
      }, (i * 20));
    });
  };
/*
  loopPat(choseNum, largestPalindrome);
  setInterval(() => {
    loopPat(choseNum, largestPalindrome);

  }, 100 + (largestPalindrome.length * 100));

  loopPat2(choseNum2, largestPalindrome2);
  setInterval(() => {
    loopPat2(choseNum2, largestPalindrome2);

  }, 100 + (largestPalindrome2.length * 100));
 */
  //loopPat3(choseNum3, largestPalindrome3);
/*  setInterval(() => {
    loopPat3(choseNum2, largestPalindrome3);

  }, 100 + (largestPalindrome.length * 100));
  setInterval(() => {
    loopPat3(choseNum, largestPalindrome3);

  }, 100 + (largestPalindrome.length * 100));
  setInterval(() => {
    loopPat3(choseNum4, largestPalindrome3);

  }, 100 + (largestPalindrome.length * 100));
  setInterval(() => {
    loopPat3(choseNum5, largestPalindrome3);

  }, 100 + (largestPalindrome.length * 100));

  loopPat4(choseNum4, largestPalindrome4);

  setInterval(() => {
   loopPat4(choseNum4, largestPalindrome4);

  }, 100 + (largestPalindrome4.length * 100));
*/ 
 loopPat5(choseNum5, largestPalindrome5);
 setInterval(() => {
  loopPat5(choseNum5, largestPalindrome5);
 }, 100 + (largestPalindrome5.length * velocity));
 /*  //const largestString = `${largestPalindrome}`;
  //const crochet = document.getElementById('crochet');
  //crochet.style.gridTemplateColumns = `repeat(${choseNum * 2}, ${30/choseNum}px)`;
  //crochet.style.gridTemplateRows = `repeat(${choseNum * 2},  ${30/choseNum}px)`;
  //let d;
  //let c;

  for (let i in largestString) {
    for (let j in largestString) {
      setTimeout(() => {
        c = largestString[i]
        d = largestString[j]
        crochet.innerHTML += `<div class='n${abSum(parseInt(c), parseInt(d))}'></div>`
      }, 50 + ((i + j) * 100))
    }
  }
  */
}
