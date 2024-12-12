import React, { useState } from 'react';
import  { useContext } from "react";
import './Quiz.css';
import { fetchQuestion } from './server'; // 서버 API 호출 함수 가져오기
//import { submitAnswer } from './server'; // 서버 API 호출 함수 가져오기
import { SelectedNumberContext } from "./SelectedNumberContext";

const Quiz = () => {
    const [currentPage, setCurrentPage] = useState(1);
    //const [selectedNumber, setSelectedNumber] = useState(null);
    const [question, setQuestion] = useState("");
    const { selectedNumber, setSelectedNumber } = useContext(SelectedNumberContext);
    //const [loading, setLoading] = useState(false); // 로딩 상태
    const [answer, setAnswer] = useState(""); // 사용자가 입력한 답변
    const [result, setResult] = useState(""); // 서버로부터 받은 결과 메시지
    const buttonsPerPage = 20;
    const totalButtons = 120;
    const totalPages = Math.ceil(totalButtons / buttonsPerPage);

    const getButtonsForPage = () => {
        const start = (currentPage - 1) * buttonsPerPage + 1;
        const end = Math.min(start + buttonsPerPage - 1, totalButtons);
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const handlePageChange = (direction) => {
        if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleNumberClick = (number) => {
        setSelectedNumber(number);
        localStorage.setItem("selectedNumber", number); // 저장
        setQuestion("");
        setAnswer(""); // 답변 초기화
        setResult(""); // 결과 초기화
        console.log(`Selected number: ${number}`);
    };

    const loadQuestion = async () => {
        if (selectedNumber) {
            try {
                const fetchedQuestion = await fetchQuestion(selectedNumber);
                setQuestion(fetchedQuestion);
            } catch (error) {
                setQuestion('문제를 불러올 수 없습니다.');
            }
        }
    };

    return (
        <div>
            <h1>Aama Quiz</h1>
            <h2>번호를 골라 문제풀이에 도전하세요!</h2>

            <div className="button-grid">
                {getButtonsForPage().map((number) => (
                    <button
                        key={number}
                        onClick={() => handleNumberClick(number)}
                        className={selectedNumber === number ? 'selected' : ''}
                    >
                        {number}
                    </button>
                ))}
            </div>

            <div className="pagination">
                <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
                    이전
                </button>
                <button onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>
                    다음
                </button>
            </div>

            {selectedNumber && (
                <div className="question-actions">
                    <p>선택된 번호: {selectedNumber}</p>
                    <button onClick={loadQuestion}>문제 불러오기</button>
                    
                </div>
            )}

        </div>
    );
};

export default Quiz;