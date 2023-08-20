import Calculator from './calculator.js'

const previousInput = document.querySelector('#previous-input')
const currentInput = document.querySelector('#current-input')
const keyboard = document.querySelector('.keyboard')
const calc = new Calculator(previousInput, currentInput)

function convertToHTMLEntity(character) {
  const HTMLEntities = {
    '<': '&lArr;',
    '+': '&plus;',
    '-': '&minus;',
    '*': '&times;',
    '/': '&divide;',
    '=': '&equals;'
  }
  return HTMLEntities[character] ? HTMLEntities[character] : character
}

const keys = calc.keys.map(label => {
  const key = document.createElement('button')
  const classZeroOrEqual = label === '0' ? 'zero' : label === '=' ? 'equal' : 'key'

  key.setAttribute('type', 'button')
  key.setAttribute('id', label)
  key.classList.add('key', classZeroOrEqual)
  key.innerHTML = convertToHTMLEntity(label)

  return key
})

keys.forEach(key => {
  keyboard.appendChild(key)

  key.addEventListener('click', (event) => {
    const keyValue = event.target.getAttribute('id')

    if (+keyValue >= 0 || keyValue === '.') {
      calc.updateScreen(keyValue, {})
      return

    }
    if (calc.mathOperators.includes(keyValue) || keyValue === '=') {
      if (calc.mathOperators.includes(previousInput.innerText.split(' ')[1]) && currentInput.innerText === '') {
        calc.changeOperation(keyValue)
        return
      }

      const mathExpression = calc.operation(keyValue)
      calc.updateScreen('', mathExpression)
      return
    }

    switch (keyValue) {
      case 'C':
        calc.clearScreen()
        break
    
      case '<':
        calc.backspace()
        break
    }
  })
})
