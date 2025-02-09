const students = [
    "Валиева Мадина", "Нуршымыр Салтанат", "Алмурадова Қадырбек", "Байбатчаев Алдияр",
    "Булеген Диас", "Досали Асель", "Затыбекұлы Аян", "Зиябек Гүлзина",
    "Куанышбек Қарақат", "Сайлаубек Сымбат", "Сапаркул Толғанай", "Иса Есімхан"
];

const studentContainer = document.getElementById('students');

const loadRatings = () => JSON.parse(localStorage.getItem('ratings')) || {};
const saveRatings = (ratings) => localStorage.setItem('ratings', JSON.stringify(ratings));
const ratings = loadRatings();

const updateStats = () => {
    const total = students.reduce((sum, name) => sum + (ratings[name] || 0), 0);
    const leader = Object.entries(ratings).reduce((max, [name, count]) => 
        count > (max[1] || 0) ? [name, count] : max, ['', 0]);
    
    document.getElementById('total').textContent = total;
    document.getElementById('leader').textContent = 
        leader[1] > 0 ? `${leader[0]} (${leader[1]})` : '-';
};

students.forEach(name => {
    const studentDiv = document.createElement('div');
    studentDiv.classList.add('student');

    const nameSpan = document.createElement('span');
    nameSpan.classList.add('student-name');
    nameSpan.textContent = name;

    const ratingContainer = document.createElement('div');
    ratingContainer.classList.add('rating-container');

    const ratingCountDisplay = document.createElement('span');
    ratingCountDisplay.classList.add('rating-count');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "-";
    deleteButton.classList.add('button', 'delete-button');

    const clearButton = document.createElement('button');
    clearButton.textContent = "C";
    clearButton.classList.add('button', 'clear-button');

    let ratingCount = ratings[name] || 0;

    const updateRatingDisplay = () => {
        ratingContainer.innerHTML = '';
        
        for (let i = 0; i < ratingCount; i++) {
            const ratingDiv = document.createElement('div');
            ratingDiv.classList.add('rating');

            if (i >= 9) ratingDiv.style.backgroundColor = 'blue';
            else if (i >= 6) ratingDiv.style.backgroundColor = 'green';
            else if (i >= 3) ratingDiv.style.backgroundColor = 'orange';
            else ratingDiv.style.backgroundColor = 'red';

            ratingContainer.appendChild(ratingDiv);
        }

        ratingCountDisplay.textContent = `(${ratingCount})`;
        deleteButton.style.display = ratingCount > 0 ? 'inline-block' : 'none';
        clearButton.style.display = ratingCount > 0 ? 'inline-block' : 'none';
        updateStats();
    };

    updateRatingDisplay();

    studentDiv.addEventListener('click', () => {
        if (ratingCount < 10) {
            ratingCount++;
            ratings[name] = ratingCount;
            saveRatings(ratings);
            updateRatingDisplay();
        }
    });

    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        if (ratingCount > 0) {
            ratingCount--;
            ratings[name] = ratingCount;
            saveRatings(ratings);
            updateRatingDisplay();
        }
    });

    clearButton.addEventListener('click', (e) => {
        e.stopPropagation();
        ratingCount = 0;
        delete ratings[name]; // Удаляем запись из объекта
        saveRatings(ratings);
        updateRatingDisplay();
    });

    studentDiv.appendChild(nameSpan);
    studentDiv.appendChild(ratingContainer);
    studentDiv.appendChild(ratingCountDisplay);
    studentDiv.appendChild(deleteButton);
    studentDiv.appendChild(clearButton);
    studentContainer.appendChild(studentDiv);
});

updateStats();
