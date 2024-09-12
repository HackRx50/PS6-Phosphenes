import React, { useState, useEffect } from 'react';
import questions from '../assets/questions.json'; // Assuming questions.json is in the same directory
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs
import { saveAs } from 'file-saver'; // For saving the JSON file

const QuizCard = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [timer, setTimer] = useState(5); // Timer in seconds
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [wrongQuestions, setWrongQuestions] = useState([]);
    const [replayCount, setReplayCount] = useState(0);
    const [isUserDetailsProvided, setIsUserDetailsProvided] = useState(false);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const currentQuestion = questions[currentQuestionIndex];

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        if (option === currentQuestion.answer) {
            setFeedback('Correct!');
            setScore(score + 1);
        } else {
            setFeedback('Wrong answer!');
            setWrongQuestions([...wrongQuestions, currentQuestionIndex + 1]); // Store wrong question number
        }
        setTimeout(handleNextQuestion, 1000); // Move to next question after 1 second
    };

    const handleNextQuestion = () => {
        setFeedback('');
        setSelectedOption(null);
        setTimer(5); // Reset timer
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setFeedback(`Quiz finished! Your score is ${score}/${questions.length}`);
            setIsQuizFinished(true);
            saveAnalytics();
        }
    };

    const handleReplayQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setScore(0);
        setFeedback('');
        setWrongQuestions([]);
        setReplayCount(replayCount + 1);
        setIsQuizFinished(false);
        setTimer(5);
    };

    const saveAnalytics = () => {
        const userId = uuidv4(); // Generate a unique ID for each user
        const grade =
            score >= 8
                ? 'understood well'
                : score > 5
                    ? 'need more understanding'
                    : 'not understood';

        const analytics = {
            id: userId,
            name: userName,
            email: userEmail,
            totalScore: score,
            wrongQuestions,
            replayCount,
            grade,
        };

        const blob = new Blob([JSON.stringify(analytics, null, 2)], { type: 'application/json' });
        saveAs(blob, `${userId}_questionanalytics.json`);
    };

    const handleUserDetailsSubmit = () => {
        if (userName && userEmail) {
            setIsUserDetailsProvided(true);
        } else {
            alert('Please enter both name and email.');
        }
    };

    useEffect(() => {
        let timerInterval;
        if (timer > 0 && !isQuizFinished && isUserDetailsProvided) {
            timerInterval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0 && !isQuizFinished && isUserDetailsProvided) {
            handleNextQuestion();
        } else if (isQuizFinished && timer === 0) {
            clearInterval(timerInterval);
        }
        return () => clearInterval(timerInterval);
    }, [timer, isQuizFinished, isUserDetailsProvided]);

    if (!isUserDetailsProvided) {
        return (
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-bold mb-4">Enter Your Details</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <button
                    onClick={handleUserDetailsSubmit}
                    className="w-full py-2 bg-blue-500 text-white rounded-lg"
                >
                    Start Quiz
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            {isQuizFinished ? (
                <div className="text-center">
                    <p className="text-lg font-semibold mb-4">{feedback}</p>
                    <button
                        onClick={handleReplayQuiz}
                        className="w-full py-2 bg-blue-500 text-white rounded-lg"
                    >
                        Replay Quiz
                    </button>
                </div>
            ) : (
                <div>
                    <h2 className="text-2xl font-bold mb-4">{currentQuestion.question}</h2>
                    <div className="mb-4">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleOptionClick(option)}
                                className={`w-full p-2 mb-2 rounded-lg text-white ${selectedOption === option
                                        ? option === currentQuestion.answer
                                            ? 'bg-green-500'
                                            : 'bg-red-500'
                                        : 'bg-blue-500'
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    {feedback && <p className="mb-4 text-lg font-semibold">{feedback}</p>}
                    <div className="relative w-full h-2 bg-gray-300 rounded">
                        <div
                            style={{
                                width: `${(timer / 5) * 100}%`,
                                transition: 'width 1s ease-in-out', // Smooth transition for the width change
                            }}
                            className="h-full bg-blue-500 rounded"
                        ></div>
                    </div>
                    <p className="text-center mt-2">Time left: {timer}s</p>
                </div>
            )}
        </div>
    );
};

export default QuizCard;
