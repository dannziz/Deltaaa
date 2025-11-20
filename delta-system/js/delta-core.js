// Delta Core System
class DeltaSystem {
    constructor() {
        this.version = '4.2.7';
        this.operator = 'СБУ-4872';
        this.securityLevel = 'ДЕЛЬТА';
        this.isOnline = true;
        this.database = new DeltaDatabase();
        this.analytics = new DeltaAnalytics();
        this.init();
    }

    init() {
        this.updateTimestamp();
        setInterval(() => this.updateTimestamp(), 1000);
        
        this.loadSystemData();
        this.startLiveUpdates();
        
        this.log('Система Δ DELTA ініціалізована', 'system');
    }

    updateTimestamp() {
        const now = new Date();
        const timestamp = now.toLocaleString('uk-UA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        document.getElementById('liveTimestamp').textContent = timestamp;
    }

    async loadSystemData() {
        try {
            // Загрузка данных системы
            await this.database.connect();
            await this.analytics.initialize();
            
            this.updateSystemMetrics();
            this.populateEvents();
            this.populateObservations();
            
            this.log('Дані системи завантажено', 'success');
        } catch (error) {
            this.log(`Помилка завантаження: ${error.message}`, 'error');
        }
    }

    updateSystemMetrics() {
        // Обновление метрик системы
        setInterval(() => {
            const cpu = 30 + Math.random() * 40;
            const memory = 40 + Math.random() * 35;
            const network = 20 + Math.random() * 30;
            
            document.querySelectorAll('.metric-fill')[0].style.width = `${cpu}%`;
            document.querySelectorAll('.metric-value')[0].textContent = `${Math.round(cpu)}%`;
            
            document.querySelectorAll('.metric-fill')[1].style.width = `${memory}%`;
            document.querySelectorAll('.metric-value')[1].textContent = `${Math.round(memory)}%`;
            
            document.querySelectorAll('.metric-fill')[2].style.width = `${network}%`;
            document.querySelectorAll('.metric-value')[2].textContent = `${Math.round(network)}%`;
        }, 2000);
    }

    populateEvents() {
        const events = [
            {
                time: '14:23:45',
                type: 'Рух виявлено',
                location: 'Київ, вул. Хрещатик, 25',
                camera: 'CAM-KY-487',
                priority: 'high'
            },
            {
                time: '14:20:12',
                type: 'Доступ до системи',
                location: 'Центральний офіс',
                user: 'Оператор #5842',
                priority: 'medium'
            },
            {
                time: '14:15:33',
                type: 'Оновлення бази',
                details: 'Додано 15 нових об\'єктів',
                priority: 'low'
            }
        ];

        const eventsList = document.getElementById('eventsList');
        eventsList.innerHTML = events.map(event => `
            <div class="event-item">
                <div class="event-time">${event.time}</div>
                <div class="event-type">${event.type}</div>
                <div class="event-details">${event.location || event.details}</div>
            </div>
        `).join('');
    }

    populateObservations() {
        const observations = [
            {
                time: '14:18:22',
                type: 'Транспортний засіб',
                details: 'Номер: АА 1234 ВС',
                location: 'КПП Краковець'
            },
            {
                time: '14:12:05',
                type: 'Особа',
                details: 'Петренко І.В.',
                location: 'Київ, метро "Хрещатик"'
            },
            {
                time: '14:05:47',
                type: 'Подія',
                details: 'Зупинка транспорту',
                location: 'Львів, вокзал'
            }
        ];

        const obsList = document.getElementById('observationsList');
        obsList.innerHTML = observations.map(obs => `
            <div class="observation-item">
                <div class="event-time">${obs.time}</div>
                <div class="event-type">${obs.type}</div>
                <div class="event-details">${obs.details} • ${obs.location}</div>
            </div>
        `).join('');
    }

    log(message, type = 'info') {
        const console = document.getElementById('systemConsole');
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        entry.textContent = `[${new Date().toLocaleTimeString('uk-UA')}] ${message}`;
        console.appendChild(entry);
        console.scrollTop = console.scrollHeight;
    }

    startLiveUpdates() {
        // Симуляция живых обновлений
        setInterval(() => {
            this.simulateLiveData();
        }, 5000);
    }

    simulateLiveData() {
        const events = [
            'Нове спостереження камери',
            'Оновлення бази даних',
            'Сканування мережі',
            'Перевірка безпеки'
        ];
        
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        this.log(randomEvent, 'info');
    }
}

// System Functions
function systemScan() {
    const system = window.deltaSystem;
    system.log('Запуск повного сканування системи...', 'warning');
    
    // Симуляция сканирования
    setTimeout(() => {
        system.log('Сканування завершено. Загроз не виявлено.', 'success');
    }, 3000);
}

function toggleDatabaseSync() {
    const system = window.deltaSystem;
    system.log('Перемикання синхронізації бази даних...', 'info');
}

function emergencyProtocol() {
    const system = window.deltaSystem;
    system.log('🚨 АКТИВАЦІЯ ЕКСТРЕНОГО ПРОТОКОЛУ!', 'error');
    
    // Визуальные эффекты для экстренного режима
    document.body.classList.add('emergency-mode');
    setTimeout(() => {
        document.body.classList.remove('emergency-mode');
    }, 5000);
}

// Modal Functions
function showPersonSearch() {
    document.getElementById('personSearchModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function searchPerson() {
    const query = document.getElementById('personSearch').value;
    const system = window.deltaSystem;
    
    system.log(`Пошук особи: ${query}`, 'info');
    
    // Симуляция результатов поиска
    const results = [
        { name: 'ПЕТРЕНКО ІВАН ВОЛОДИМИРОВИЧ', dob: '15.03.1985', location: 'Київ' },
        { name: 'ПЕТРЕНКО ІГОР ВАСИЛЬОВИЧ', dob: '22.07.1978', location: 'Львів' }
    ];
    
    const resultsContainer = document.getElementById('personResults');
    resultsContainer.innerHTML = results.map(person => `
        <div class="search-result">
            <h4>${person.name}</h4>
            <p>Дата народження: ${person.dob}</p>
            <p>Місце проживання: ${person.location}</p>
        </div>
    `).join('');
}

// Camera Functions
function recordFeed() {
    window.deltaSystem.log('Запис відеопотоку запущено', 'info');
}

function captureFrame() {
    window.deltaSystem.log('Знімок екрана збережено', 'success');
}

function toggleAnalysis() {
    window.deltaSystem.log('Аналіз відео активовано', 'info');
}

function toggleNightVision() {
    window.deltaSystem.log('Нічний режим перемикано', 'info');
}

// Console Functions
function executeCommand() {
    const input = document.getElementById('consoleInput');
    const command = input.value.trim();
    
    if (command) {
        window.deltaSystem.log(`КОМАНДА: ${command}`, 'system');
        input.value = '';
        
        // Обработка команд
        handleSystemCommand(command);
    }
}

function clearConsole() {
    document.getElementById('systemConsole').innerHTML = '';
}

function handleSystemCommand(command) {
    const system = window.deltaSystem;
    
    switch(command.toLowerCase()) {
        case 'status':
            system.log('СТАТУС СИСТЕМИ: АКТИВНА', 'success');
            break;
        case 'scan':
            systemScan();
            break;
        case 'help':
            system.log('Доступні команди: status, scan, emergency, clear', 'info');
            break;
        case 'emergency':
            emergencyProtocol();
            break;
        default:
            system.log(`Невідома команда: ${command}`, 'error');
    }
}

// Инициализация системы
document.addEventListener('DOMContentLoaded', function() {
    window.deltaSystem = new DeltaSystem();
});
