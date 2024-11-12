document.addEventListener('DOMContentLoaded', function () {
    const topBar = document.querySelector('.top-bar');
    const content = document.querySelector('.content');
    const pinButton = document.querySelector('.pin-button');
    let isPinned = false;

    // 모바일 화면 크기 감지
    const isMobile = window.innerWidth <= 768;

    if (!isMobile) { // 모바일이 아닐 때만 스크립트 실행
        pinButton.addEventListener('click', () => {
            isPinned = !isPinned;
            if (isPinned) {
                topBar.classList.add('pinned');
                pinButton.textContent = '📍';
            } else {
                topBar.classList.remove('pinned');
                pinButton.textContent = '📌';
            }
            updateContentPosition();
        });

        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', function () {
            if (!isPinned) {  // 고정 상태가 아닐 때만 실행
                const currentScrollY = window.scrollY;

                if (currentScrollY > lastScrollY && currentScrollY > 0) {
                    topBar.classList.add('hidden');
                } else if (currentScrollY < lastScrollY) {
                    topBar.classList.remove('hidden');
                }

                lastScrollY = currentScrollY;
            }
            updateContentPosition();
        });
    }

    function updateContentPosition() {
        const topBarHeight = topBar.classList.contains('hidden') ? 0 : topBar.offsetHeight;
        content.style.marginTop = `${topBarHeight}px`;
    }

    updateContentPosition();
    window.addEventListener('resize', updateContentPosition); // 화면 크기 조정 시 위치 재조정
});
