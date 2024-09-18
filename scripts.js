document.addEventListener('DOMContentLoaded', function() {
    const homeLink = document.getElementById('home-link');
    const calendarLink = document.getElementById('calendar-link');
    const musicLink = document.getElementById('music-link');

    const homeSection = document.getElementById('home');
    const calendarSection = document.getElementById('calendar');
    const musicSection = document.getElementById('music');

    const calendarEvents = document.getElementById('calendar-events');
    const calendarForm = document.getElementById('calendar-form');
    const eventNameInput = document.getElementById('event-name');
    const eventDateInput = document.getElementById('event-date');

    const audioPlayer = document.getElementById('audio-player');
    const audioUpload = document.getElementById('audio-upload');

    let events = JSON.parse(localStorage.getItem('calendarEvents')) || [];

    function renderEvents() {
        calendarEvents.innerHTML = ''; // Clear existing events
        events.forEach((event, index) => {
            const eventDiv = document.createElement('div');
            eventDiv.innerHTML = `
                ${event.name} - ${event.date}
                <button onclick="editEvent(${index})">Edit</button>
                <button onclick="deleteEvent(${index})">Delete</button>
            `;
            calendarEvents.appendChild(eventDiv);
        });
    }

    function saveEvents() {
        localStorage.setItem('calendarEvents', JSON.stringify(events));
    }

    function addEvent(e) {
        e.preventDefault();
        if (eventNameInput.value && eventDateInput.value) {
            events.push({
                name: eventNameInput.value,
                date: eventDateInput.value
            });
            saveEvents();
            renderEvents();
            calendarForm.reset(); // Clear form fields
        }
    }

    window.editEvent = function(index) {
        eventNameInput.value = events[index].name;
        eventDateInput.value = events[index].date;
        calendarForm.onsubmit = function(e) {
            e.preventDefault();
            events[index] = {
                name: eventNameInput.value,
                date: eventDateInput.value
            };
            saveEvents();
            renderEvents();
            calendarForm.reset(); // Clear form fields
            calendarForm.onsubmit = addEvent; // Reset to add new event
        };
    }

    window.deleteEvent = function(index) {
        events.splice(index, 1);
        saveEvents();
        renderEvents();
    }

    calendarForm.onsubmit = addEvent;
    renderEvents(); // Initial render

    audioUpload.addEventListener('change', function() {
        const file = audioUpload.files[0];
        if (file) {
            const objectURL = URL.createObjectURL(file);
            audioPlayer.src = objectURL;
        }
    });

    homeLink.addEventListener('click', function() {
        homeSection.style.display = 'block';
        calendarSection.style.display = 'none';
        musicSection.style.display = 'none';
    });

    calendarLink.addEventListener('click', function() {
        homeSection.style.display = 'none';
        calendarSection.style.display = 'block';
        musicSection.style.display = 'none';
    });

    musicLink.addEventListener('click', function() {
        homeSection.style.display = 'none';
        calendarSection.style.display = 'none';
        musicSection.style.display = 'block';
    });
});