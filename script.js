import Calculator from './calculator.js'

let previousValue = document.getElementById('previous-value')
let currentValue = document.getElementById('current-value')
const keyboard = document.querySelector('div.keyboard')

const labels = ['C', '<', '/', '*', '7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '=', '0', '.']

const keys = labels.map(label => {
  const key = document.createElement('button')
  const classZeroOrEqual = label === '0' ? 'zero' : label === '=' ? 'equal' : 'key'

  key.setAttribute('type', 'button')
  key.classList.add('key', classZeroOrEqual)
  key.innerText = label

  return key
})

const calc = new Calculator(
  previousValue,
  currentValue
)

keys.forEach(key => {
  keyboard.appendChild(key)

  key.addEventListener('click', () => {
    const keyValue = key.innerText

    if (+keyValue >= 0 || keyValue === '.') {
      calc.showDigitOnScreen(keyValue)
    }
  })
})
