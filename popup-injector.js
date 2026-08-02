(function() {
    // Set the expiration date (YYYY-MM-DDTHH:MM:SS format).
    // Example: '2026-07-31T00:00:00' disables it at exactly 12:00 AM on July 31st.
    const expirationDate = new Date('2026-08-03T00:00:00'); 
    if (new Date() >= expirationDate) {
        return; // Exit the script entirely; the popup will not be injected or shown
    }

    // 1. Inject the exact same CSS
    const style = document.createElement('style');
    style.innerHTML = `
        .dd-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(17, 24, 39, 0.6);
            backdrop-filter: blur(4px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }

        .dd-modal-container {
            background: #ffffff;
            width: 90%;
            max-width: 450px;
            border-radius: 20px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            overflow: hidden;
            position: relative;
            transform: scale(0.9) translateY(20px);
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .dd-modal-overlay.active {
            opacity: 1;
            visibility: visible;
        }

        .dd-modal-overlay.active .dd-modal-container {
            transform: scale(1) translateY(0);
        }

        .dd-modal-close {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(255, 255, 255, 0.8);
            border: none;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #333;
            transition: background 0.2s ease;
            z-index: 10;
        }

        .dd-modal-close:hover {
            background: #f3f4f6;
        }

        .dd-modal-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        .dd-modal-link {
            position: relative;
            display: block;
        }

        .dd-watermark {
            position: absolute;
            bottom: 15px;
            right: 15px;
            width: 40px;
            height: auto;
            opacity: 0.9;
            pointer-events: none;
            z-index: 5;
        }

    `;
    document.head.appendChild(style);

    // 2. Inject the exact same HTML structure
    const modalHTML = `
        <div class="dd-modal-overlay" id="centralizedModalOverlay">
            <div class="dd-modal-container">
                <button class="dd-modal-close" id="centralCloseBtn">&times;</button>
                <a href="https://www.thedteam.in" target="_blank" class="dd-modal-link">
                    <img class="dd-modal-image" src="https://scontent.fblr20-2.fna.fbcdn.net/v/t51.82787-15/758543286_18482473153099348_7640469806003311170_n.webp?stp=dst-jpg_tt6&cstp=mx1080x1080&ctp=s1080x1080&_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=QhTxbceen9kQ7kNvwHjO2OA&_nc_oc=AdqAyRSTjksP_IPXLCq1bWhbiAjcxQX9AEtjr8Dnoe96n-JIJJJ04BhvYevaLXiJ4kk&_nc_zt=23&_nc_ht=scontent.fblr20-2.fna&_nc_gid=fDuHTQNEOPfVxFA3mcHwhQ&_nc_ss=7a2a8&oh=00_AQG6b5aq29PcT7ZXdZjuAAn07cVMNb0f2gPvw2trdMeFlw&oe=6A709E7D" alt="Special Offer" draggable="false" oncontextmenu="return false;">
                    <img class="dd-watermark" src="https://client.thedteam.in/assets/images/favicon.png" alt="Watermark" draggable="false" oncontextmenu="return false;">
                </a>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // 3. Add the logic to open and close it
    const modalOverlay = document.getElementById('centralizedModalOverlay');
    const closeModalBtn = document.getElementById('centralCloseBtn');

    let autoDismissTimeout;

    // Function to close the modal
    function closeModal() {
        modalOverlay.classList.remove('active');
        if (autoDismissTimeout) {
            clearTimeout(autoDismissTimeout);
        }
    }

    // Close on 'X' click
    closeModalBtn.addEventListener('click', closeModal);

    // Close when clicking outside the modal container (on the dark overlay)
    modalOverlay.addEventListener('click', function(event) {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

    // Close on Escape key press
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // --- TRIGGER LOGIC ---
    // Make the popup appear automatically 3 seconds after the page loads
    setTimeout(() => {
        modalOverlay.classList.add('active');
    }, 34500);

    // Automatically close the modal after 8 seconds (8000ms)
    autoDismissTimeout = setTimeout(() => {
    closeModal();
    }, 39999);

})();
