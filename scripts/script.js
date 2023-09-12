import Calculator from './calculator.js'

const previousInput = document.querySelector('.second-line')
const currentInput = document.querySelector('.first-line')
const keyboard = document.querySelector('.keyboard')

const calc = new Calculator(previousInput, currentInput)

const keys = calc.keys.map(label => {
  const key = document.createElement('button')

  key.setAttribute('type', 'button')
  key.setAttribute('id', label)
  key.classList.add('key')
  key.innerHTML = convertToHTMLEntity(label)

  return key
})

function convertToHTMLEntity(character) {
  const HTMLEntities = {
    '<': '&lArr;',
    '+': '&plus;',
    '-': '&minus;',
    '*': '&times;',
    '/': '&divide;',
    '=': '&equals;'
  }
  return HTMLEntities[character] ?? character
}

keys.forEach(key => {
  const keyValue = key.getAttribute('id')
  keyboard.appendChild(key)

  if (+keyValue >= 0 || keyValue === '.') {
    key.addEventListener('click', () => calc.updateDisplay(keyValue, {}))
    return
  }

  switch (keyValue) {
    case 'C':
      key.addEventListener('click', () => calc.clearDisplay())
      break
  
    case '<':
      key.addEventListener('click', () => calc.backspace())
      break
    
    default:
      key.addEventListener('click', () => {
        if (calc.mathOperators.includes(previousInput.innerText.split(' ')[1]) && currentInput.innerText === '') {
          calc.changeOperation(keyValue)
          return
        }
  
        try {
          const mathExpression = calc.operation(keyValue)
          calc.updateDisplay('', mathExpression)
  
        } catch {
          alert('Impossível divisão por zero! Por favor, digite outro número.')
          calc.backspace()
        }
      })
      break
  }
})
