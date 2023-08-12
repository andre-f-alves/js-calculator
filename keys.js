const keyboard = document.querySelector('div.keyboard')

const labels = ['C', '<', '/', '*', '7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '=', '0', '.']

function generateKeys() {
  labels.forEach(label => {
    const key = document.createElement('button')
    
    const zeroOrEqual = label === '0' ? 'zero' : label === '=' ? 'equal' : 'key'

    key.setAttribute('type', 'button')
    key.classList.add('key', zeroOrEqual)
    key.innerText = label
    keyboard.appendChild(key)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  generateKeys()
})