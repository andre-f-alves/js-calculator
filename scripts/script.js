import Calculator from './calculator.js'

const previousInput = document.querySelector('.second-line')
const currentInput = document.querySelector('.first-line')
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
  const keyValue = key.getAttribute('id')
  keyboard.appendChild(key)

  if (Number(keyValue) || keyValue === '.') {
    console.log()
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
