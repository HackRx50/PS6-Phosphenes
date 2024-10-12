import React, { useState, useEffect } from 'react';
import quizData from '../../../hackrx-backend/questions.json';
import { Gradient } from './design/Services';
import Button from './Button';
import Section from './Section';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);  // New state to track if the user answered

  const [timeLeft, setTimeLeft] = useState(10);
  const [progress, setProgress] = useState(100);

  const { width, height } = useWindowSize();

  useEffect(() => {
    if (timeLeft === 0 && !hasAnswered) {
      // Time is up and user didn't answer
      setIsCorrect(false);  // Automatically mark as incorrect
      setShowFeedback(true);
      setShowNextButton(true); // Allow next question
      setHasAnswered(true);  // Mark as answered to prevent multiple triggers
    }

    const timer = timeLeft > 0 && setInterval(() => {
      setTimeLeft(prev => prev - 1);
      setProgress(prev => prev - (100 / 10));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, hasAnswered]);

  const handleAnswerOptionClick = (selectedOption) => {
    setHasAnswered(true); // Mark as answered
    const correct = selectedOption === quizData[currentQuestion].answer;
    setIsCorrect(correct);
    if (correct) {
      setScore(prevScore => prevScore + 1);
    }
    setShowFeedback(true);
    setShowNextButton(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
      setShowNextButton(false);
      setHasAnswered(false);  // Reset answered state for next question
      resetTimer();
    }
  };

  const handleFinishQuiz = () => {
    setShowScore(true);
  };

  const resetTimer = () => {
    setTimeLeft(10);
    setProgress(100);
  };

  const handleReplay = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowScore(false);
    setShowFeedback(false);
    setShowNextButton(false);
    setHasAnswered(false);
    resetTimer();
  };

  return (
    <Section className="pt-[3rem] -mt-[5.25rem]" crosses crossesOffset="lg:translate-y-[5.25rem]" customPaddings id="quiz">
      <Gradient />
      <div className="flex flex-col items-center justify-center min-h-screen bg-n-8 overflow-clip">

        {showScore && score === quizData.length && (
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={500}
            gravity={0.3}
            initialVelocityY={25}
          />
        )}

        <div className="bg-n-9/40 backdrop-blur border border-n-1/10 p-6 rounded-lg shadow-md w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
          {showScore ? (
            <div className="text-center">
              <h2 className="h2 font-bold mb-4 lg:h3">You scored {score} out of {quizData.length}</h2>
              <Button onClick={handleReplay}>Replay Quiz</Button>
            </div>
          ) : (
            <>
              <div className="relative w-full h-2 bg-gray-300 rounded-full mb-4">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-red-500 transition-all duration-1000 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mb-4">
                <div className="body-2 mb-2">
                  Question {currentQuestion + 1}/{quizData.length}
                </div>
                <div className="h2 mb-4 lg:h5">{quizData[currentQuestion].question}</div>
                <div className="space-y-2 mb-[2rem]">
                  {quizData[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerOptionClick(option)}
                      disabled={showFeedback}
                      className="block w-full disabled:bg-n-9/60 border bg-n-9/40 backdrop-blur px-2 py-2 rounded-lg"
                    >
                      <h3 className="h6">{option}</h3>
                    </button>
                  ))}
                </div>
              </div>

              {showFeedback && (
                <div className={`text-center p-4 rounded-lg ${isCorrect ? ' bg-n-5' : ' bg-n-5'}`}>
                  {isCorrect
                    ? "Correct!"
                    : `Incorrect. The correct answer was ${quizData[currentQuestion].answer}.`}
                </div>
              )}

              {/* Check if it's the last question to show "Finish Quiz" button, otherwise show "Next Question" */}
              {showNextButton && (
                <div className="text-center mt-4">
                  {currentQuestion < quizData.length - 1 ? (
                    <Button onClick={handleNextQuestion}>Next Question</Button>
                  ) : (
                    <Button onClick={handleFinishQuiz}>Finish Quiz</Button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Section>
  );
};

export default Quiz;
