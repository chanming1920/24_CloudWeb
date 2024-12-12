import ReactDOM from 'react-dom/client';  // react-dom/client로 수정
import { SelectedNumberProvider } from './SelectedNumberContext';  // 예시, 실제 경로에 맞게 수정
import Quiz from './Quiz';  // 예시, 실제 경로에 맞게 수정
import App from './App';  // 예시, 실제 경로에 맞게 수정

const Root = () => (
    <SelectedNumberProvider>
        <div>
            <Quiz />
            <App />
        </div>
    </SelectedNumberProvider>
);

// React 18 이상에서는 createRoot로 루트를 생성하고 render합니다.
const root = ReactDOM.createRoot(document.getElementById("root"));  
root.render(<Root />);