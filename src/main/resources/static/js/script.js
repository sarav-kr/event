document.addEventListener("DOMContentLoaded", function () {

    let currentUser = null;
    let selectedEvent = null;

    // =========================
    // INITIALIZE APP
    // =========================
    async function initializeApp() {
        await displayEvents();

        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            currentUser = JSON.parse(savedUser);
            updateUIForLoggedInUser();
        }
    }

    // =========================
    // FETCH EVENTS FROM BACKEND
    // =========================
    async function displayEvents() {
        try {
            const response = await fetch("http://localhost:8080/api/events");
            const events = await response.json();

            const eventsGrid = document.getElementById('eventsGrid');
            eventsGrid.innerHTML = '';

            events.forEach(event => {
                const eventCard = document.createElement('div');
                eventCard.className = 'event-card';

                eventCard.innerHTML = `
                    <div class="event-image"></div>
                    <div class="event-details">
                        <span class="event-date">${event.date}</span>
                        <h3>${event.name}</h3>
                        <div class="event-location">📍 ${event.location}</div>
                        <div class="event-price">$${event.price}</div>
                        <p style="margin-bottom:10px;">${event.description}</p>
                        <button class="btn-book" onclick='bookEvent(${JSON.stringify(event)})'>Book Now</button>
                    </div>
                `;

                eventsGrid.appendChild(eventCard);
            });

        } catch (error) {
            console.error("Error fetching events:", error);
        }
    }

    // =========================
    // LOGIN (SIMULATION)
    // =========================
    function initGoogleLogin() {
        const mockUser = {
            email: 'user@gmail.com',
            name: 'Demo User',
            picture: 'https://ui-avatars.com/api/?name=Demo+User'
        };

        currentUser = mockUser;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        updateUIForLoggedInUser();
        closeModal('loginModal');

        alert("Logged in successfully!");
    }

    function updateUIForLoggedInUser() {
        document.getElementById('navLoginBtn').style.display = 'none';

        const userProfile = document.getElementById('userProfile');
        userProfile.classList.add('active');

        document.getElementById('userName').textContent = currentUser.name;
        document.getElementById('userAvatar').src = currentUser.picture;
    }

    function logout() {
        currentUser = null;
        localStorage.removeItem('currentUser');

        document.getElementById('navLoginBtn').style.display = 'block';
        document.getElementById('userProfile').classList.remove('active');

        alert("Logged out!");
    }

    // =========================
    // BOOK EVENT
    // =========================
    function bookEvent(event) {
        selectedEvent = event;

        if (!currentUser) {
            openModal('loginModal');
            alert("Please login first!");
            return;
        }

        // Pre-fill form
        document.getElementById('bookingName').value = currentUser.name;
        document.getElementById('bookingEmail').value = currentUser.email;

        openModal('bookingModal');
    }

    // =========================
    // SUBMIT BOOKING
    // =========================
    document.getElementById('ticketBookingForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const booking = {
            eventName: selectedEvent.name,
            eventDate: selectedEvent.date,
            eventLocation: selectedEvent.location,
            userName: document.getElementById('bookingName').value,
            userEmail: document.getElementById('bookingEmail').value,
            userPhone: document.getElementById('bookingPhone').value,
            quantity: parseInt(document.getElementById('ticketQuantity').value),
            totalPrice: selectedEvent.price * parseInt(document.getElementById('ticketQuantity').value)
        };

        try {
            await fetch("http://localhost:8080/api/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(booking)
            });

            alert("Booking Successful!");
            closeModal('bookingModal');

        } catch (error) {
            console.error("Booking failed:", error);
        }
    });

    // =========================
    // MODALS
    // =========================
    function openModal(id) {
        document.getElementById(id).classList.add('active');
    }

    function closeModal(id) {
        document.getElementById(id).classList.remove('active');
    }

    // =========================
    // EVENT LISTENERS
    // =========================
    document.getElementById('navLoginBtn').addEventListener('click', () => openModal('loginModal'));
    document.getElementById('googleLoginBtn').addEventListener('click', initGoogleLogin);
    document.getElementById('logoutBtn').addEventListener('click', logout);

    // =========================
    // START APP
    // =========================
    initializeApp();

});