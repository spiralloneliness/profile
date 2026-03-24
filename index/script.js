document.addEventListener("DOMContentLoaded", () => {
    /* ------------------------------------------------
       1. 디데이(기념일) 자동 계산 및 포맷 변경 기능
       ------------------------------------------------ */
    const ddayElements = document.querySelectorAll(".dday-text");
    
    // 오늘 날짜 셋팅 (시간은 자정으로 맞춰 오차 방지)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    ddayElements.forEach(element => {
        // HTML 요소의 data 속성에서 날짜와 설명을 가져옵니다.
        const targetDateStr = element.getAttribute("data-date");
        const description = element.getAttribute("data-desc");

        const targetDate = new Date(targetDateStr);
        targetDate.setHours(0, 0, 0, 0);

        // 두 날짜 간의 일(day) 단위 차이 계산
        const diffTime = today.getTime() - targetDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        let ddayNumberText = "";

        if (diffDays > 0) {
            // ⭐️ 과거의 날짜인 경우: 시작일을 1일째로 포함하기 위해 +1을 해줍니다.
            ddayNumberText = `D+${diffDays + 1}`; 
        } else if (diffDays < 0) {
            // 미래의 날짜인 경우 (남은 기간 D-n일)
            ddayNumberText = `D${diffDays}`; 
        } else {
            // 당일인 경우
            ddayNumberText = "D-DAY"; // 당일을 D+1로 표기하고 싶다면 이 부분을 `D+1`로 바꿔주셔도 됩니다.
        }

        // 원하시는 형태로 글씨를 합칩니다: D+196 (설명)
        const finalDisplayText = `${ddayNumberText} (${description})`;

        // 계산된 텍스트를 화면에 출력합니다.
        element.innerText = finalDisplayText;
    });

    /* ------------------------------------------------
       2. 빈 링크(href="#") 클릭 시 최상단 이동 방지
       ------------------------------------------------ */
    const emptyLinks = document.querySelectorAll('a[href="#"]');
    emptyLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // 스크롤 이동 방지
        });
    });
});