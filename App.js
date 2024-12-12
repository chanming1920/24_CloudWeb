import React, { useState, useContext } from "react";
import { SelectedNumberContext } from "./SelectedNumberContext";

const App = () => {
    const { selectedNumber } = useContext(SelectedNumberContext); // 선택된 번호 가져오기
    const [inputText, setInputText] = useState(""); // 텍스트 입력 상태
    const [responseMessage, setResponseMessage] = useState(""); // 서버 응답 메시지

    const getApiEndpoint = (questionId) => {
        return `https://x3unndt057.execute-api.ap-northeast-2.amazonaws.com/prod/check_answer/${questionId}`;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedNumber) {
            setResponseMessage("번호를 선택해주세요.");
            return;
        }

        if (!inputText.trim()) {
            setResponseMessage("답변을 입력해주세요.");
            return;
        }

        const apiEndpoint = getApiEndpoint(selectedNumber);

        try {
            const response = await fetch(apiEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ UserAnswer: inputText }), // 사용자가 입력한 답변 전송
            });

            if (response.ok) {
                const result = await response.json();
                setResponseMessage("정답 제출 성공: " + JSON.stringify(result));
            } else {
                setResponseMessage("오류: " + response.status);
            }
        } catch (error) {
            setResponseMessage("요청 실패: " + error.message);
        }
    };

    return (
        <div>
            <h1>정답을 입력해주세요</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="정답을 입력하세요"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
            <p>선택된 번호: {selectedNumber || "선택된 번호 없음"}</p>
            <p>{responseMessage}</p>
        </div>
    );
};

export default App;