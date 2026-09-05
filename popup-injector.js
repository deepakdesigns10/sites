(function() {
    // Set the expiration date (YYYY-MM-DDTHH:MM:SS format).
    // Example: '2026-09-05T00:00:00' disables it at exactly 12:00 AM on September 05th.
    const expirationDate = new Date('2026-09-06T00:00:00'); 
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
            position: absolute !important;
            top: 15px !important;
            right: 15px !important;
            background: rgba(255, 255, 255, 0.8) !important;
            border: none !important;
            width: 32px !important;
            height: 32px !important;
            border-radius: 50% !important;
            font-size: 22px !important;
            line-height: 1 !important;
            padding: 0 0 2px 0 !important;
            margin: 0 !important;
            cursor: pointer !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            color: #333 !important;
            transition: all 0.3s ease !important;
            z-index: 10 !important;
            box-sizing: border-box !important;
        }

        .dd-modal-close:hover {
            background: #f3f4f6 !important;
            transform: rotate(90deg) !important;
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
                    <img class="dd-modal-image" src="https://scontent.fblr20-4.fna.fbcdn.net/v/t39.30808-6/796808911_979585878455155_1964759888164225632_n.jpg?stp=dst-jpg_tt6&cstp=mx1024x1024&ctp=s1024x1024&_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=XdPvxiiElWUQ7kNvwFFAriT&_nc_oc=AdphVrju8Th7s4QYJY5yuol8zyjkJ8vhxPaPQ4puLA9CdmOL2wxzmUxNwx9HmcKXWay1upoh4K0-0w9aAq2T8SH_&_nc_zt=23&_nc_ht=scontent.fblr20-4.fna&_nc_gid=Pr3E1AndLa2WVJkbgIESxg&_nc_ss=7b2a8&oh=00_AQImo50qGum2zUWfKY0-BX4Kx3BXzPeNFUqJsNx442zPAQ&oe=6AA1485A" alt="Special Offer" draggable="false" oncontextmenu="return false;">
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
