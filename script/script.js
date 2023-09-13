
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

            document.getElementById("countdown").innerHTML = `${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;
        }
    }, 1000);
}

function stopCountdown() {
    clearInterval(countdownInterval);
    document.getElementById("countdown").innerHTML = "타이머 중지!";
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
