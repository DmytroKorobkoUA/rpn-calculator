'use client';

import React, { useState, useEffect } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('');
  const [isOn, setIsOn] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [selectedPen, setSelectedPen] = useState<string | null>(null);

  const togglePower = () => {
    setIsOn(!isOn);
    if (!isOn) {
      setDisplay('');
      setHistory([]);
    }
  };

  const handleButtonClick = (value: string) => {
    if (isOn) {
      if (value === '0' && display === '0') return;
      if (display === '0' && value !== '.') {
        setDisplay(value); // Замена 0 на новую цифру
      } else {
        setDisplay((prev) => prev + value);
      }
    }
  };

  const handleCalculate = async () => {
    try {
      const response = await fetch(`http://localhost:3000/calculator`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expression: display }),
      });
      const result = await response.json();
      setDisplay(result.toString());

      if (selectedPen) {
        setHistory((prev) => [...prev, `${display} = ${result}`]);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePenClick = (penColor: string) => {
    setSelectedPen(selectedPen === penColor ? null : penColor);
  };

  const handleErase = () => {
    setHistory([]);
  };

  const handleBackspace = () => {
    setDisplay((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!isOn) return;

      if (!isNaN(Number(event.key)) || ['+', '-', '*', '/', '(', ')', '.'].includes(event.key)) {
        handleButtonClick(event.key);
      } else if (event.key === 'Enter') {
        handleCalculate();
      } else if (event.key === 'Backspace') {
        handleBackspace();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isOn]);

  return (
      <div className="flex justify-center items-center h-screen bg-gray-800">
        <div className="bg-gray-900 p-5 rounded-xl shadow-lg calculator-container mr-10">
          <div className="calculator-screen bg-green-700 text-white text-right p-3 rounded-lg mb-4 text-3xl h-16">
            {isOn ? (display || '0') : ''}
          </div>
          <div className="grid grid-cols-4 gap-4 calculator-buttons">
            <button className="bg-red-600 p-4 rounded-lg shadow-lg text-white text-2xl" onClick={togglePower}>
              On/Off
            </button>
            <button className="bg-gray-700 p-4 rounded-lg shadow-lg text-white text-2xl"
                    onClick={() => handleButtonClick('(')}>
              (
            </button>
            <button className="bg-gray-700 p-4 rounded-lg shadow-lg text-white text-2xl"
                    onClick={() => handleButtonClick(')')}>
              )
            </button>
            <button className="bg-gray-700 p-4 rounded-lg shadow-lg text-white text-2xl"
                    onClick={() => handleButtonClick('.')}>
              .
            </button>
            <button className="bg-gray-700 p-4 rounded-lg shadow-lg text-white text-2xl"
                    onClick={() => handleButtonClick('1')}>
              1
            </button>
            <button className="bg-gray-700 p-4 rounded-lg shadow-lg text-white text-2xl"
                    onClick={() => handleButtonClick('2')}>
              2
            </button>
            <button className="bg-gray-700 p-4 rounded-lg shadow-lg text-white text-2xl"
                    onClick={() => handleButtonClick('3')}>
              3
            </button>
            <button className="bg-blue-600 p-4 rounded-lg shadow-lg text-white text-2xl"
                    onClick={() => handleButtonClick('+')}>
              +
            </button>
            <button className="bg-gray-700 p-4 rounded-lg shadow-lg text-white text-2xl"
                    onClick={() => handleButtonClick('4')}>
              4
            </button>
            <button className="bg-gray-700 p-4 rounded-lg shadow-lg text-white text-2xl"
                    onClick={() => handleButtonClick('5')}>
              5
            </button>
            <button className="bg-gray-700 p-4 rounded-lg shadow-lg text-white text-2xl"
                    onClick={() => handleButtonClick('6')}>
              6
            </button>
            <button className="bg-blue-600 p-4 rounded-lg shadow-lg text-white text-2xl"
                    onClick={() => handleButtonClick('-')}>
              -
            </button>
            <button className="bg-gray-700 p-4 rounded-lg shadow-lg text-white text-2xl"
                    onClick={() => handleButtonClick('7')}>
              7
            </button>
            <button className="bg-gray-700 p-4 rounded-lg shadow-lg text-white text-2xl"
                    onClick={() => handleButtonClick('8')}>
              8
            </button>
            <button className="bg-gray-700 p-4 rounded-lg shadow-lg text-white text-2xl"
                    onClick={() => handleButtonClick('9')}>
              9
            </button>
            <button className="bg-blue-600 p-4 rounded-lg shadow-lg text-white text-2xl"
                    onClick={() => handleButtonClick('*')}>
              *
            </button>
            <button className="bg-gray-700 p-4 rounded-lg shadow-lg text-white text-2xl" onClick={() => setDisplay('')}>
              C
            </button>
            <button className="bg-gray-700 p-4 rounded-lg shadow-lg text-white text-2xl"
                    onClick={() => handleButtonClick('0')}>
              0
            </button>
            <button className="bg-gray-700 p-4 rounded-lg shadow-lg text-white text-2xl"
                    onClick={() => handleBackspace()}>
              ⌫
            </button>
            <button className="bg-blue-600 p-4 rounded-lg shadow-lg text-white text-2xl"
                    onClick={() => handleButtonClick('/')}>
              /
            </button>
            <button className="col-span-4 bg-green-500 p-4 rounded-lg shadow-lg text-white text-2xl"
                    onClick={handleCalculate}>
              =
            </button>
          </div>
        </div>

        <div className="bg-yellow-100 p-5 rounded-xl shadow-lg notebook-container">
          <div className="notebook bg-white p-4 rounded-lg shadow-lg mb-5 h-64 overflow-auto">
            {history.length === 0 ? (
                <p className="text-gray-400">Page is blank...</p>
            ) : (
                history.map((entry, index) => (
                    <p key={index} className={`text-${selectedPen} border-b border-gray-300 py-1`} style={{ animation: 'write 1s ease-in-out' }}>
                      {entry}
                    </p>
                ))
            )}
          </div>

          <div className="pens flex justify-between mb-5">
            <button className={`pen pen-black ${selectedPen === 'black' ? 'open' : ''}`} onClick={() => handlePenClick('black')}>
              <span className="text-black">Black pen</span>
            </button>
            <button className={`pen pen-blue ${selectedPen === 'blue' ? 'open' : ''}`} onClick={() => handlePenClick('blue')}>
              <span className="text-blue-500">Blue pen</span>
            </button>
            <button className={`pen pen-red ${selectedPen === 'red' ? 'open' : ''}`} onClick={() => handlePenClick('red')}>
              <span className="text-red-500">Red pen</span>
            </button>
          </div>

          <button className="eraser bg-gray-500 text-white p-3 rounded-lg shadow-lg" onClick={handleErase}>
            Erase all
          </button>
        </div>
      </div>
  );
};

export default Calculator;
