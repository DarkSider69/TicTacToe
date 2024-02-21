'use strict'

const tiles = document.querySelectorAll('.tile')
const playerX = 'X'
const playerO = '0'
let turn = playerX

const boardState = Array(tiles.length);
boardState.fill(null);

// dafis obiektebi 
const strike = document.querySelector(".strike")
const gameOverContainer = document.querySelector('.game-over-container')
const gameOverText = document.querySelector('.gameover-text')
const playAgainButton = document.querySelector('.play-again-button')

const gameOverEffect = new Audio('sounds/gameovereffect.wav')
const clickSoundEffect = new Audio('sounds/clicksoundeffect.wav')

tiles.forEach(tile=>tile.addEventListener('click', tileClick));

function setHoverText() {
    tiles.forEach(tile=> {
        tile.classList.remove('x-hover')
        tile.classList.remove('o-hover')
    })

    const hoverClass = `${turn.toLocaleLowerCase()}-hover`

    tiles.forEach(tile => {
        if(tile.innerText == "") {
            tile.classList.add(hoverClass)
        }
    })
}

setHoverText();

function tileClick(event) {
    if(gameOverContainer.classList.contains('visible')) {
        return;
    }

    const tile = event.target;
    const tileNumber = tile.dataset.index;
    if(tile.innerText != '') {
        return;
    }

    if(turn === playerX) {
        tile.innerText = playerX;
        boardState[tileNumber-1] = playerX
        turn = playerO
    } else {
        tile.innerText = playerO;
        boardState[tileNumber-1] = playerO
        turn = playerX
    }

    clickSoundEffect.play()
    setHoverText();
    checkWinner();
};

function checkWinner() {
    for(const winCombs of winComb) {
        const {combo, strikeClass} = winCombs;
        const tileValue1 = boardState[combo[0]-1]
        const tileValue2 = boardState[combo[1]-1]
        const tileValue3 = boardState[combo[2]-1]

        if(tileValue1 != null && tileValue1 === tileValue2 && tileValue1 === tileValue3) {
            strike.classList.add(strikeClass);
            gameOverContainer(tileValue1)
        }
    }
    const allTileFilledIn = boardState.every((tile) => tile !== null);
    if(allTileFilledIn) {
        gameOverContainer(null);
    }
}

// gameover funct ------------------------------------------------------
function gameOverContainers(gameOverText) {
    let text = 'Draw!'
    if(gameOverText != null) {
        text = `Winner is ${winner}!`;
    }
    gameOverContainer.className = 'visible'
    gameOverText.innerText = text
    gameOverEffect.play()
}

const winComb = [
    {combo: [1,2,3], strike: 'strike-row-1'},
    {combo: [4,5,6], strike: 'strike-row-2'},
    {combo: [7,8,9], strike: 'strike-row-3'},

    {combo: [1,4,7], strike: 'strike-column-1'},
    {combo: [2,5,8], strike: 'strike-column-2'},
    {combo: [3,6,9], strike: 'strike-column-3'},

    {combo: [1,5,9], strike: 'strike-diagonal-1'},
    {combo: [3,5,7], strike: 'strike-diagonal-2'},
]
