
let countdownInterval;
let targetDate;

function startCountdown() {
    const dateInput = document.getElementById("dateInput").value;
    targetDate = new Date(dateInput).getTime();

    if (isNaN(targetDate)) {
        alert("올바른 날짜를 입력하세요.");
        return;
    }

    clearInterval(countdownInterval); // 이전 타이머 중지

    countdownInterval = setInterval(function () {
        const currentDate = new Date().getTime();
        const timeLeft = targetDate - currentDate;

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown").innerHTML = "타이머 종료!";
            // 웹 푸시 알람 보내기
            sendPushNotification();
        } else {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            // 시간과 날짜를 디지털 시계 형식으로 포맷팅
            const digitalClock = `${days}일 ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
            document.getElementById("countdown").innerHTML = digitalClock;
        }
    }, 1000);
}

// 시간 구성 요소 (시간, 분, 초)를 두 자릿수로 포맷팅하는 도우미 함수
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}


function sendPushNotification() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        navigator.serviceWorker.register('service-worker.js')
            .then(function(registration) {
                return registration.showNotification('카운트 다운 종료', {
                    body: '타이머가 종료되었습니다!',
                    icon: 'icon.png'
                });
            })
            .catch(function(error) {
                console.error('Service Worker 등록 중 오류:', error);
            });
    }
}
