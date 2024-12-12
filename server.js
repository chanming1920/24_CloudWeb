export const fetchQuestion = async (questionId) => {
    try {
        const response = await fetch(
            `https://x3unndt057.execute-api.ap-northeast-2.amazonaws.com/prod/get_question/${questionId}`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch question");
        }
        const data = await response.json();
        console.log("API 응답 데이터:", data); // 서버에서 받은 데이터
        return data.question; // 서버 JSON의 'question' 필드 사용
    } catch (error) {
        console.error("Error fetching question:", error);
        throw error;
    }
};

export const submitAnswer = async (questionId, userAnswer) => {
    try {
        const response = await fetch(
            `https://x3unndt057.execute-api.ap-northeast-2.amazonaws.com/prod/check_answer/${questionId}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    UserAnswer: userAnswer, // 사용자 답변
                }),
            }
        );

        if (!response.ok) {
            throw new Error("Failed to submit answer");
        }

        const data = await response.json();
        return data; // 서버 JSON 응답
    } catch (error) {
        console.error("Error submitting answer:", error);
        throw error;
    }
};