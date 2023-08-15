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
    if (result === null) {
      this.currentInput.innerText += this.currentValue
      return
    }
    const isEqual = newOperation === '='

    this.previousInput.innerText = isEqual ? `${firstOperand} ${operation} ${secondOperand} =` : `${result} ${operation}`
    this.currentInput.innerText = isEqual ? result : ''
  }

  // TODO: fix division bug
  operation(keyFunction) {
    if (this.currentInput.innerText === '' && keyFunction !== 'C' && this.previousInput.innerText !== '') {
      this.changeOperation(keyFunction)
      return
    }
    const thereIsPreviousOperator = ['+', '-', '/', '*'].includes(this.previousInput.innerText.split(' ')[1])
    let result
    let newOperation = thereIsPreviousOperator ? keyFunction : false
    
    let firstOperand = this.previousInput.innerText.includes('=') ? 0 : +this.previousInput.innerText.split(' ')[0]
    const secondOperand = +this.currentInput.innerText

    const operations = {
      '+': function sum(a, b) {
        return a + b
      },
    
      '-': function subtraction(a, b) {
        return a - b
      },
    
      '*': function multiplication(a, b) {
        return a * b
      },
    
      '/': function division(a, b) {
        return a / b
      }
    }

    if (
      thereIsPreviousOperator &&
      this.currentInput.innerText !== '' &&
      !['C', '<', '.'].includes(keyFunction)
    ) {
      keyFunction = this.previousInput.innerText.split(' ')[1]
    }

    if (['+', '-', '/', '*'].includes(keyFunction)) {
      const operationFunction = operations[keyFunction]
      result = operationFunction(firstOperand, secondOperand)

      keyFunction = thereIsPreviousOperator && ['+', '-', '/', '*'].includes(newOperation) ? newOperation : keyFunction 
      this.updateScreen(result, keyFunction, firstOperand, secondOperand, newOperation)
      return
    }

    switch (keyFunction) {
      case '=':
        const operator = this.previousInput.innerText.split(' ')[1]
        const operationFunction = operations[operator]
        result = operationFunction(firstOperand, secondOperand)
        this.updateScreen(result, operator, firstOperand, secondOperand, newOperation)
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