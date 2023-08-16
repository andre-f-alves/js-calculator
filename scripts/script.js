import Calculator from './calculator.js'

const previousInput = document.querySelector('#previous-input')
const currentInput = document.querySelector('#current-input')
const keyboard = document.querySelector('.keyboard')
const calc = new Calculator(
  previousInput,
  currentInput
)

const keys = calc.keys.map(label => {
  const key = document.createElement('button')
  const classZeroOrEqual = label === '0' ? 'zero' : label === '=' ? 'equal' : 'key'

  key.setAttribute('type', 'button')
  key.classList.add('key', classZeroOrEqual)
  key.innerText = label

  return key
})

keys.forEach(key => {
  keyboard.appendChild(key)

  key.addEventListener('click', (event) => {
    const keyValue = event.target.innerText

    if (+keyValue >= 0 || keyValue === '.') {
      calc.showDigitOnScreen(keyValue)

    } else {
      calc.operation(keyValue)
    }
  })
})
