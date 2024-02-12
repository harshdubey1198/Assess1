import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('');
  const [prevValue, setPrevValue] = useState('');
  const [operator, setOperator] = useState('');

  const handleButtonClick = (value) => {
    if (value === '=') {
      let result;
      switch (operator) {
        case '+':
          result = parseFloat(prevValue) + parseFloat(displayValue);
          break;
        case '-':
          result = parseFloat(prevValue) - parseFloat(displayValue);
          break;
        case '*':
          result = parseFloat(prevValue) * parseFloat(displayValue);
          break;
        case '/':
          result = parseFloat(prevValue) / parseFloat(displayValue);
          break;
        default:
          result = displayValue;
      }
      setDisplayValue(result.toString());
      setPrevValue('');
      setOperator('');
    } else if (value === 'C') {
      setDisplayValue('');
      setPrevValue('');
      setOperator('');
    } else if (value === '+' || value === '-' || value === '*' || value === '/') {
      setPrevValue(displayValue);
      setOperator(value);
      setDisplayValue('');
    } else {
      setDisplayValue(displayValue + value);
    }
  };

  return (
    <div className="calculator">
      <div className="display">{displayValue}</div>
      <div className="buttons">
        <button className='btn-cal' onClick={() => handleButtonClick('7')}>7</button>
        <button className='btn-cal' onClick={() => handleButtonClick('8')}>8</button>
        <button className='btn-cal' onClick={() => handleButtonClick('9')}>9</button>
        <button className='btn-cal' onClick={() => handleButtonClick('+')}>+</button>
        <button className='btn-cal' onClick={() => handleButtonClick('4')}>4</button>
        <button className='btn-cal' onClick={() => handleButtonClick('5')}>5</button>
        <button className='btn-cal' onClick={() => handleButtonClick('6')}>6</button>
        <button className='btn-cal' onClick={() => handleButtonClick('-')}>-</button>
        <button className='btn-cal' onClick={() => handleButtonClick('1')}>1</button>
        <button className='btn-cal' onClick={() => handleButtonClick('2')}>2</button>
        <button className='btn-cal' onClick={() => handleButtonClick('3')}>3</button>
        <button className='btn-cal' onClick={() => handleButtonClick('*')}>*</button>
        <button className='btn-cal' onClick={() => handleButtonClick('0')}>0</button>
        <button className='btn-cal' onClick={() => handleButtonClick('.')}>.</button>
        <button className='btn-cal' onClick={() => handleButtonClick('=')}>=</button>
        <button className='btn-cal' onClick={() => handleButtonClick('/')}>/</button>
        <button className="btn-cal" onClick={() => handleButtonClick('C')}>C</button>
      </div>
    </div>
  );
};

export default Calculator;
