// Delta Map System
class DeltaMap {
    constructor() {
        this.map = null;
        this.layers = {};
        this.markers = [];
        this.init();
    }

    init() {
        this.initializeMap();
        this.addBaseLayers();
        this.addMarkers();
        this.addControls();
    }

    initializeMap() {
        this.map = L.map('mainMap', {
            center: [50.4501, 30.5234],
            zoom: 10,
            zoomControl: false
        });

        // Позиционирование контрола zoom
        L.control.zoom({
            position: 'topright'
        }).addTo(this.map);
    }

    addBaseLayers() {
        // Базовая карта OSM
        const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(this.map);

        // Спутниковый слой
        const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '© Esri'
        });

        this.layers = {
            base: osmLayer,
            satellite: satelliteLayer
        };
    }

    addMarkers() {
        // Ключевые объекты для мониторинга
        const keyLocations = [
            {
                coords: [50.4501, 30.5234],
                title: 'ЦЕНТРАЛЬНИЙ ОФІС СБУ',
                type: 'hq',
                details: 'Головний офіс Служби безпеки України'
            },
            {
                coords: [50.4482, 30.5238],
                title: 'УРЯДОВА БУДІВЛЯ',
                type: 'government',
                details: 'Адміністративна будівля уряду'
            },
            {
                coords: [50.4543, 30.5364],
                title: 'ВІЙСЬКОВА ЧАСТИНА',
                type: 'military',
                details: 'Військове формування'
            },
            {
                coords: [50.4825, 30.6022],
                title: 'ЖИТЛОВИЙ МАСИВ',
                type: 'residential',
                details: 'Щільне житлове заселення'
            },
            {
                coords: [50.5849, 30.4891],
                title: 'ЕНЕРГЕТИЧНИЙ ОБ\'ЄКТ',
                type: 'infrastructure',
                details: 'Критична інфраструктура'
            }
        ];

        keyLocations.forEach(location => {
            const marker = this.createMarker(location);
            this.markers.push(marker);
        });
    }

    createMarker(location) {
        let iconColor;
        switch(location.type) {
            case 'hq': iconColor = 'red'; break;
            case 'government': iconColor = 'orange'; break;
            case 'military': iconColor = 'darkred'; break;
            case 'residential': iconColor = 'blue'; break;
            case 'infrastructure': iconColor = 'purple'; break;
            default: iconColor = 'gray';
        }

        const icon = L.divIcon({
            className: `delta-marker delta-${location.type}`,
            html: `
                <div class="marker-pulse"></div>
                <div class="marker-icon">Δ</div>
            `,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });

        const marker = L.marker(location.coords, { icon: icon })
            .addTo(this.map)
            .bindPopup(`
                <div class="map-popup">
                    <h4>${location.title}</h4>
                    <p>${location.details}</p>
                    <button onclick="selectObject('${location.type}', '${location.title}')">
                        ДЕТАЛЬНІШЕ
                    </button>
                </div>
            `);

        return marker;
    }

    addControls() {
        // Добавление дополнительных контролов
        const scale = L.control.scale({ position: 'bottomleft' });
        scale.addTo(this.map);
    }
}

// Map Control Functions
function toggleLayer(layerName) {
    const system = window.deltaSystem;
    
    if (layerName === 'satellite') {
        if (window.deltaMap.layers.satellite._map) {
            window.deltaMap.map.removeLayer(window.deltaMap.layers.satellite);
            system.log('Супутниковий шар вимкнено', 'info');
        } else {
            window.deltaMap.layers.satellite.addTo(window.deltaMap.map);
            system.log('Супутниковий шар активовано', 'info');
        }
    }
}

function toggleHeatmap() {
    window.deltaSystem.log('Теплова карта активована', 'info');
}

function scanArea() {
    const system = window.deltaSystem;
    system.log('Сканування району запущено...', 'warning');
    
    // Симуляция сканирования
    setTimeout(() => {
        system.log('Сканування завершено. Обробка даних...', 'success');
    }, 2000);
}

function showAllUnits() {
    window.deltaSystem.log('Відображення всіх одиниць', 'info');
}

function showCameras() {
    window.deltaSystem.log('Відображення камер спостереження', 'info');
}

function showPatrols() {
    window.deltaSystem.log('Відображення патрулів', 'info');
}

function showAlerts() {
    window.deltaSystem.log('Відображення тривог', 'info');
}

function selectObject(type, title) {
    const details = document.getElementById('objectDetails');
    
    details.innerHTML = `
        <div class="object-info">
            <h4>${title}</h4>
            <div class="object-meta">
                <p><strong>Тип:</strong> ${getTypeName(type)}</p>
                <p><strong>Статус:</strong> <span class="status-active">АКТИВНИЙ</span></p>
                <p><strong>Рівень безпеки:</strong> ВИСОКИЙ</p>
            </div>
            <div class="object-cameras">
                <h5>ДОСТУПНІ КАМЕРИ:</h5>
                <div class="camera-list">
                    <button class="cam-select" onclick="selectCamera('CAM-${type.toUpperCase()}-01')">
                        📹 CAM-${type.toUpperCase()}-01
                    </button>
                    <button class="cam-select" onclick="selectCamera('CAM-${type.toUpperCase()}-02')">
                        📹 CAM-${type.toUpperCase()}-02
                    </button>
                </div>
            </div>
        </div>
    `;
}

function getTypeName(type) {
    const types = {
        'hq': 'ЦЕНТРАЛЬНИЙ ОФІС',
        'government': 'УРЯДОВА БУДІВЛЯ',
        'military': 'ВІЙСЬКОВИЙ ОБ\'ЄКТ',
        'residential': 'ЖИТЛОВИЙ МАСИВ',
        'infrastructure': 'КРИТИЧНА ІНФРАСТРУКТУРА'
    };
    return types[type] || 'НЕВІДОМИЙ ТИП';
}

function selectCamera(cameraId) {
    const feed = document.getElementById('cameraFeed');
    
    feed.innerHTML = `
        <div class="live-camera-feed">
            <div class="camera-header">
                <span>${cameraId}</span>
                <span class="live-badge">🔴 LIVE</span>
            </div>
            <div class="video-placeholder">
                <div class="scanning-animation">
                    <div class="scan-line"></div>
                </div>
                <p>ПІДКЛЮЧЕННЯ ДО КАМЕРИ...</p>
            </div>
        </div>
    `;
    
    window.deltaSystem.log(`Камера активована: ${cameraId}`, 'success');
}

// Инициализация карты
document.addEventListener('DOMContentLoaded', function() {
    window.deltaMap = new DeltaMap();
});
