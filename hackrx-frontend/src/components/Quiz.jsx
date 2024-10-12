import React, { useState, useEffect } from 'react';
// import quizData from '../constants/quiz';
import quizData from '../../../hackrx-backend/questions.json';
import { Gradient } from './design/Services';
import Button from './Button';
import Section from './Section';
import Confetti from 'react-confetti';  // Import the confetti component
import { useWindowSize } from 'react-use'; // To adjust the confetti size dynamically

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState(10); // 30 seconds for each question
  const [progress, setProgress] = useState(100); // Progress bar for timer
  
  // Window size for confetti dimensions
  const { width, height } = useWindowSize();

  // Timer effect
  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion(); // Automatically move to the next question when time is up
    }

    const timer = timeLeft > 0 && setInterval(() => {
      setTimeLeft(prev => prev - 1);
      setProgress(prev => prev - (100 / 10)); // Progress decrement over 30 seconds
    }, 1000);

    return () => clearInterval(timer); // Clean up interval
  }, [timeLeft]);

  const handleAnswerOptionClick = (selectedOption) => {
    const correct = selectedOption === quizData[currentQuestion].answer;
    setIsCorrect(correct);
    if (correct) {
      setScore(prevScore => prevScore + 1);
    }
    setShowFeedback(true);

    // Automatically move to the next question after a short delay
    setTimeout(() => {
      handleNextQuestion();
    }, 1000); // 1 second delay before moving to the next question
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
      resetTimer(); // Reset timer for the next question
    } else {
      setShowScore(true);
    }
  };

  const resetTimer = () => {
    setTimeLeft(30); // Reset to 30 seconds
    setProgress(100); // Reset the progress bar
  };

  const handleReplay = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowScore(false);
    setShowFeedback(false);
    resetTimer(); // Reset the timer when replaying
  };

  return (
    <Section className="pt-[3rem] -mt-[5.25rem]" crosses crossesOffset="lg:translate-y-[5.25rem]" customPaddings id="quiz">
      <Gradient />
      <div className="flex flex-col items-center justify-center min-h-screen bg-n-8 overflow-clip">

        {/* Show confetti when the user scores full marks */}
        {showScore && score === quizData.length && (
          <Confetti
            width={width}      // Use window size to adjust confetti width and height
            height={height}     // Confetti should cover the screen height
            recycle={false}     // Confetti will fall once and won't keep falling
            numberOfPieces={500} // Number of confetti pieces
            gravity={0.3}       // Control how fast confetti falls
            initialVelocityY={25} // Start confetti from top with a slow initial speed
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
              {/* Timer Progress Bar */}
              <div className="relative w-full h-2 bg-gray-300 rounded-full mb-4">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-red-500 transition-all duration-1000 ease-linear"
                  style={{ width: `${progress}%` }} // Smooth transition for progress bar
                />
              </div>

              <div className="mb-4">
                <div className="body-2 mb-2">
                  Question {currentQuestion + 1}/{quizData.length}
                </div>
                <div className="h2 mb-4 lg:h4">{quizData[currentQuestion].question}</div>
                <div className="space-y-2 mb-[2rem]">
                  {quizData[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerOptionClick(option)}
                      disabled={showFeedback}
                      className="block w-full disabled:bg-gray-300"
                    >
                      <h3 className="h6">{option}</h3>
                    </button>
                  ))}
                </div>
              </div>

              {showFeedback && (
                <div className={`text-center p-4 rounded-lg ${isCorrect ? ' bg-n-5' : ' bg-n-5'}`}>
                  {isCorrect ? "Correct!" : `Incorrect. The correct answer was ${quizData[currentQuestion].answer}.`}
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
