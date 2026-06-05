(function() {
    // 1. Inject the exact same CSS
    const style = document.createElement('style');
    style.innerHTML = `
        :root {
            --primary-color: #4F46E5;
            --text-main: #1F2937;
            --text-muted: #6B7280;
            --bg-color: #ffffff;
        }

        .modal-overlay {
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

        .modal-container {
            background: var(--bg-color);
            width: 90%;
            max-width: 450px;
            border-radius: 20px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            overflow: hidden;
            position: relative;
            transform: scale(0.9) translateY(20px);
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .modal-overlay.active {
            opacity: 1;
            visibility: visible;
        }

        .modal-overlay.active .modal-container {
            transform: scale(1) translateY(0);
        }

        .modal-close {
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

        .modal-close:hover {
            background: #f3f4f6;
        }

        .modal-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            display: block;
        }

        .modal-content {
            padding: 30px 25px;
            text-align: center;
        }

        .modal-content h2 {
            margin: 0 0 10px;
            color: var(--text-main);
            font-size: 24px;
            font-family: system-ui, -apple-system, sans-serif;
        }

        .modal-content p {
            margin: 0 0 25px;
            color: var(--text-muted);
            font-size: 15px;
            line-height: 1.5;
            font-family: system-ui, -apple-system, sans-serif;
        }

        .modal-btn {
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 12px 24px;
            font-size: 16px;
            font-weight: 600;
            border-radius: 8px;
            cursor: pointer;
            width: 100%;
            transition: background 0.2s ease;
            font-family: system-ui, -apple-system, sans-serif;
        }

        .modal-btn:hover {
            background: #4338CA;
        }
    `;
    document.head.appendChild(style);

    // 2. Inject the exact same HTML structure
    const modalHTML = `
        <div class="modal-overlay" id="centralizedModalOverlay">
            <div class="modal-container">
                <button class="modal-close" id="centralCloseBtn">&times;</button>
                <img class="modal-image" src="https://lh3.googleusercontent.com/geougc/AF1QipMFDipAek-xqk8vUugWiO4SqTr0TwOP7qoepqJ7=h305-no" alt="Special Offer">
                
                <div class="modal-content">
                    <h2>Special Announcement!</h2>
                    <p>We just launched our new feature. Join thousands of users who are already upgrading their workflow today.</p>
                    <button class="modal-btn" onclick="alert('Button Clicked!')">Learn More</button>
                </div>
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
    }, 3000);

    // Automatically close the modal after 8 seconds (8000ms)
    autoDismissTimeout = setTimeout(() => {
    closeModal();
    }, 8000);

})();