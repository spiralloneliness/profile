document.addEventListener("DOMContentLoaded", () => {
    // data-date 속성을 가진 모든 요소를 선택합니다.
    const ddayElements = document.querySelectorAll(".dday-text");
    
    // 오늘 날짜 셋팅 (시간은 자정으로 맞춰 오차 방지)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    ddayElements.forEach(element => {
        // HTML 요소에 적힌 목표 날짜를 가져옵니다.
        const targetDateStr = element.getAttribute("data-date");
        const targetDate = new Date(targetDateStr);
        targetDate.setHours(0, 0, 0, 0);

        // 두 날짜 간의 밀리초 차이를 구하고, 일(day) 단위로 변환합니다.
        const diffTime = today.getTime() - targetDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        let displayText = "";

        if (diffDays > 0) {
            // 과거의 날짜인 경우 (기념일 등 시작한 지 OOO일째)
            // 보통 1일차부터 시작하므로 +1을 해줍니다 (취향에 따라 제거 가능)
            displayText = `D+${diffDays}`; 
        } else if (diffDays < 0) {
            // 미래의 날짜인 경우 (목표일까지 남은 기간)
            // diffDays가 음수이므로 그대로 붙여주면 D-n 형태가 됩니다.
            displayText = `D${diffDays}`; 
        } else {
            // 당일인 경우
            displayText = "D-DAY";
        }

        // 계산된 텍스트를 화면에 출력합니다.
        element.innerText = displayText;
    });
});