let components;
let height;
let width;
let biggestPC;
let correctBiggestPlayer;
let biggestPlayer = 0;
let at;
let STATE = 'BEFORE';
let num = 1;
let factors;
let playerFactors;
let playing = 'PLAYER'; //COMPUTER
let playerGuess;
let STATUS = 'VACANT';

function getFactors(num) {
    const isEven = num % 2 === 0;
    let inc = isEven ? 1 : 2;
    factors = [1, num];

    for (let curFactor = isEven ? 2 : 3; Math.pow(curFactor, 2) <= num; curFactor += inc) {
        if (num % curFactor !== 0) continue;
        factors.push(curFactor);
        let compliment = num / curFactor;
        if (compliment !== curFactor) factors.push(compliment);
    }

    return factors.sort();
}

function checkPrime(n) {
    if (n < 2 || (n > 2 && n % 2 === 0)) {
        return false
    } else {
        let i = 3;

        while (i <= Math.sqrt(n)) {
            if (n % i === 0) {
                return false
            }
            i++
        }
    }
    return true
}

function getBiggestPrime(arr) {
    let biggest = 0;
    arr.forEach((n) => {
        if (checkPrime(n)) {
            if (biggest < n) {
                biggest = n;
            }
        }
    });
    return biggest;
}

const start = async (n, playerArr) => {
    components = getFactors(n);
    playerComponents = Array.from(playerArr);

    width = Math.floor(playerComponents.length / 4);
    if (width === 0) {
        width = playerComponents.length;
    }
    height = playerComponents.length / width;
    const wall = document.getElementById('wall');
    const stairs = document.getElementById('stairs');
    at = [0, 0];
    wall.style.width = `${width * 50}px`;
    correctBiggestPlayer = getBiggestPrime(playerArr);

    [...playerComponents].forEach((n, i, arr) => {
        setTimeout(() => {
            if (i === 2) {
                wall.classList.add('show-wall')
            }
            if (checkPrime(n)) {
                if (playing === 'COMPUTER' && biggestPC < n) {
                    at = [i % width, Math.floor(i / width), i];
                }
                wall.innerHTML += `<div class="brick  prime">${n}</div>`;
            } else {
                wall.innerHTML += `<div class="brick">${n}</div>`;
            }

            if (i === arr.length - 1) {
                STATUS = 'VACANT';
            }
        }, 200 * i)
    });
}

function nextStart(biggestPlayer, arr) {
    playerGuess = biggestPlayer;
    const builder = document.getElementById('builder');
    const wall = document.getElementById('wall');
    const stairs = document.getElementById('stairs');
    let playerArr = Array.from(arr);
    let blockLocation = playerArr.indexOf(biggestPlayer); 
    const autoBtn = document.getElementById('toggle-auto');
    const bricks = document.getElementsByClassName('brick');

    let curArr = [...bricks].map(b => parseInt(b.innerHTML));
    if (playing === 'PLAYER') {
        blockLocation = curArr.indexOf(playerGuess);
    } else {
        if (factors === playerFactors) {
            blockLocation = curArr.indexOf(biggestPC);
        } else {
            blockLocation = curArr.indexOf(correctBiggestPlayer);
        }
    }
    bricks[blockLocation].classList.add('knock');

    builder.style.transform = `translate(calc(50vw - ${(width * 50 * 0.5)}px - (50vw - 150px) + ${((blockLocation % width) * 50) - 45}px), calc(50vh - ${height * 30}px + ${(Math.floor(blockLocation / width) * 30) - 5}px))`;
    builder.classList.add('playing');

    at = [blockLocation % width, blockLocation / width, blockLocation];


    if (at[1] < height - 1) {
        if ((height-1) - at[1] === 1) {
            stairs.setAttribute('src', `./img/s-2.png`)
            stairs.style.transform = `translate(calc(50vw - ${(width * 50 * 0.5)}px - (50vw - 150px) + ${(at[0] * 50) - 45}px), calc(50vh - ${height * 30}px + ${(at[1] * 30) - 5}px + 37px))`;
        } else if ((height-1) - at[1] === 2) {
            stairs.setAttribute('src', `./img/s-1.png`)
            stairs.style.transform = `translate(calc(50vw - ${(width * 50 * 0.5)}px - (50vw - 150px) + ${(at[0] * 50) - 45}px - 8px), calc(50vh - ${height * 30}px + ${(at[1] * 30) - 5}px + 37px))`;
        } else {
            stairs.setAttribute('src', `./img/s-0.png`)
            stairs.style.transform = `translate(calc(50vw - ${(width * 50 * 0.5)}px - (50vw - 150px) + ${(at[0] * 50) - 45}px - 18px), calc(50vh - ${height * 30}px + ${(at[1] * 30) - 5}px + 37px))`;
        }
    }

    if ((playing === 'PLAYER' && biggestPC !== biggestPlayer) || (playing === 'COMPUTER' && typeof playerFactors !== 'undefined' && biggestPC !== correctBiggestPlayer)) {
        setTimeout(() => {
            wall.classList.add('shake');
        }, 3000 + ([...components].length * 200));
        setTimeout(() => {
            wall.innerHTML = `<img src='./img/wall-broke.png'>`
            document.getElementById('form-text').innerHTML = '<p><big>Fail, try again...</big></p>';
            autoBtn.innerText = 'Re-Start!';
            autoBtn.classList.add('pulse');
            STATUS = 'VACANT';
        }, 4000 + ([...components].length * 200));
    } else {
        setTimeout(() => {
            document.getElementById('form-text').innerHTML = `<center><big>Correct!<br> <p>${biggestPC}</p> is the biggest Prime</big></center>`;
            autoBtn.innerText = 'Re-Start!';
            autoBtn.classList.add('pulse');
            STATUS = 'VACANT';
        }, 4000 + ([...components].length * 200));
    }
}

window.onload = () => {
    const numInp = document.getElementById('num');
    const arrInp = document.getElementById('arr');
    const primeNum = document.getElementById('prime');
    const titleText = document.getElementById('form-text');
    const moreText = document.getElementById('more-text');
    const autoBtn = document.getElementById('toggle-auto');
    titleText.innerText = numInp.dataset.text;

    numInp.value = '';
    arrInp.value = '';
    primeNum.value = '';

    const restart = () => {
        STATE = 'BEFORE';
        titleText.innerText = numInp.dataset.text;
        numInp.classList.remove('noshow');
        autoBtn.innerText = 'Auto>';
        autoBtn.classList.remove('pulse');
        components = undefined;
        height = undefined;
        width = undefined;
        biggestPC = undefined;
        correctBiggestPlayer = undefined;
        biggestPlayer = 0;
        at = undefined;
        num = 1;
        factors = undefined;
        playerFactors  = undefined;
        playing = 'PLAYER';
        playerGuess = undefined;
        const wall = document.getElementById('wall');
        wall.classList.remove('show-wall');
        wall.innerHTML = '';
        document.getElementById('stairs').setAttribute('src', '');
        let builder = document.getElementById('builder');
        builder.classList.remove('playing');
        builder.style = '';
        numInp.value = '';
        arrInp.value = '';
        primeNum.value = '';
    }

    const startGame = (e, auto = false) => {
        if (STATUS === 'BLOCKED') return;
        
        STATUS = 'BLOCKED';

        num = 1;
        if (auto) {
            num = Math.floor((Math.random() * 10000) + 3);
        } else {
            num = parseInt(e.target.value);
        }

        biggestPC = getBiggestPrime(getFactors(num));

        if (typeof num === 'number') {
            components = getFactors(num);
            STATE = 'NUMBERCHOSEN'
            titleText.innerHTML = `Chosen number: <br><center><big>${num}</big><center>`;
            numInp.classList.add('noshow');
            setTimeout(() => {
                arrInp.classList.remove('noshow');
                moreText.classList.remove('noshow');
                moreText.innerHTML = `<small>${arrInp.dataset.text}</small>`;
                STATUS = 'VACANT';
            }, 500)
            arrInp.addEventListener('keypress', e => {
                if (e.key === 'Enter' && arrInp.value !== '') {
                    playing = 'PLAYER';
                    inputArray(e);
                }
            });
        }
    }

    const inputArray = (e, auto = false) => {
        if (STATUS === 'BLOCKED') return;

        STATUS = 'BLOCKED';

        STATE = 'FACTORARRAY';
        if (auto) {
            factors = components;
        } else {
            factors = components;
            playerFactors = e.target.value.split(',').map(n => {
                let num = parseInt(n);
                if (isNaN(num)) {
                    return 1;
                } else {
                    return parseInt(n);
                }
            })
            playerFactors = new Set(playerFactors);
        }

        arrInp.classList.add('noshow');
        primeNum.classList.remove('noshow');
        titleText.innerHTML = `<strong><center>Now enter the biggest prime factor for <p>${num}</p></center></strong>`;
        moreText.classList.add('noshow');

        if (playing === 'PLAYER') {
            start(num, playerFactors);
        } else {
            start(num, factors);
        }
        

        primeNum.addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                playing = 'PLAYER';
                guessLargest(e);
            }
        })
    }

    const guessLargest = (e, auto = false) => {
        if (STATUS === 'BLOCKED') return;

        STATUS = 'BLOCKED';

        STATE = 'END';
        let guessNum;
        if (auto) {
            guessNum = biggestPC;
        } else {
            guessNum = parseInt(e.target.value);
        }
        if (!isNaN(guessNum)) {
            primeNum.classList.add('noshow');
            biggestPlayer = guessNum;
            if (playing === 'PLAYER') {
                nextStart(guessNum, playerFactors);
            } else {
                nextStart(guessNum, factors);
            }
        }
    }

    numInp.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            playing = 'PLAYER';
            startGame(e);
        }
    });

    autoBtn.addEventListener('click', () => {
        if (STATE === 'BEFORE') {
            playing = 'COMPUTER';
            startGame(null, true);
        } else if (STATE === 'NUMBERCHOSEN') {
            playing = 'COMPUTER';
            inputArray(null, true);
        } else if (STATE === 'FACTORARRAY') {
            playing = 'COMPUTER';
            guessLargest(null, true);
        } else if (STATE === 'END') {
            restart();
        }
    });
}