export default class Calculator {
  constructor(previousInput, currentInput) {
    this.previousInput = previousInput
    this.currentInput = currentInput
    this.currentValue = ''
  }

  showDigitOnScreen(digit) {
    if (digit === '.' && this.currentInput.innerText.includes('.')) {
      return
    }
    this.currentValue = digit
    this.updateScreen()
  }

  updateScreen(
    result = null,
    operation = null,
    firstOperand = null,
    secondOperand = null,
    newOperation
  ) {
    // console.log(`${firstOperand} ${operation} ${secondOperand} = ${result}`)

    if (result === null) {
      this.currentInput.innerText += this.currentValue
      // console.log(this.previousInput.innerText)
    
    } else {
      if (firstOperand === 0) {
        result = secondOperand
      }

      if (!newOperation) {
        this.previousInput.innerText = `${result} ${operation}`
        this.currentInput.innerText = ''

      } else if (['+', '-', '/', '*'].includes(newOperation)) {
        this.previousInput.innerText = `${result} ${newOperation}`
        this.currentInput.innerText = ''

      } else {
        this.previousInput.innerText = `${firstOperand} ${operation} ${secondOperand} =`
        this.currentInput.innerText = result
      }
    }
  }

  operation(keyFunction) {
    if (this.currentInput.innerText === '' && keyFunction !== 'C') {
      if (this.previousInput.innerText !== '') {
        this.changeOperation(keyFunction)
      }
      return
    }

    let result
    const newOperation = ['+', '-', '/', '*'].includes(this.previousInput.innerText.split(' ')[1]) ? keyFunction : false
    
    const firstOperand = +this.previousInput.innerText.split(' ')[0]
    const secondOperand = +this.currentInput.innerText
    
    if (
      ['+', '-', '/', '*'].includes(this.previousInput.innerText.split(' ')[1]) &&
      this.currentInput.innerText !== '' &&
      !['C', '<', '.'].includes(keyFunction)
    ) {
      // console.log('Já há uma operação')
      keyFunction = this.previousInput.innerText.split(' ')[1]
      // console.log(newOperation)
    }

    // console.log(firstOperand, keyFunction, secondOperand)
    // console.log(this.currentInput.innerText)

    switch (keyFunction) {
      case '+':
        result = firstOperand + secondOperand
        this.updateScreen(result, keyFunction, firstOperand, secondOperand, newOperation)
        break

      case '-':
        result = firstOperand - secondOperand
        this.updateScreen(result, keyFunction, firstOperand, secondOperand, newOperation)
        break

      case '/':
        result = firstOperand / secondOperand
        this.updateScreen(result, keyFunction, firstOperand, secondOperand, newOperation)
        break

      case '*':
        result = firstOperand * secondOperand
        this.updateScreen(result, keyFunction, firstOperand, secondOperand, newOperation)
        break

      case '=':
        const operation = this.previousInput.innerText.split(' ')[1]
        this.operation(operation)
        break

      case 'C':
        this.currentInput.innerText = ''
        this.previousInput.innerText = ''
        break

      case '<':
        this.currentInput.innerText = this.currentInput.innerText.slice(0, -1)
        if (this.previousInput.innerText.includes('=')) {
          this.previousInput.innerText = ''
        }
        break
    }
  }

  changeOperation(operation) {
    const mathOperations = ['/', '*', '+', '-']
    if (!mathOperations.includes(operation)) {
      return
    }

    this.previousInput.innerText = this.previousInput.innerText.slice(0, -1) + operation
  }
}