// Delta Database System
class DeltaDatabase {
    constructor() {
        this.connected = false;
        this.data = {
            persons: [],
            vehicles: [],
            locations: [],
            events: []
        };
    }

    async connect() {
        // Симуляция подключения к базе данных
        return new Promise((resolve) => {
            setTimeout(() => {
                this.connected = true;
                this.loadSampleData();
                resolve();
            }, 1000);
        });
    }

    loadSampleData() {
        this.data.persons = [
            {
                id: 'P-001',
                name: 'ПЕТРЕНКО ІВАН ВОЛОДИМИРОВИЧ',
                dob: '1985-03-15',
                address: 'Київ, вул. Хрещатик, 25',
                status: 'active'
            },
            {
                id: 'P-002', 
                name: 'СІДОРЕНКО ОЛЕНА ВАСИЛІВНА',
                dob: '1990-07-22',
                address: 'Львів, пл. Ринок, 10',
                status: 'active'
            }
        ];

        this.data.vehicles = [
            {
                plate: 'АА 1234 ВС',
                owner: 'ПЕТРЕНКО І.В.',
                type: 'Легковий автомобіль',
                status: 'registered'
            }
        ];

        this.data.locations = [
            {
                id: 'L-001',
                name: 'ЦЕНТРАЛЬНИЙ ОФІС СБУ',
                type: 'hq',
                coordinates: [50.4501, 30.5234]
            }
        ];
    }

    searchPersons(query) {
        return this.data.persons.filter(person => 
            person.name.toLowerCase().includes(query.toLowerCase()) ||
            person.address.toLowerCase().includes(query.toLowerCase())
        );
    }

    searchVehicles(query) {
        return this.data.vehicles.filter(vehicle =>
            vehicle.plate.toLowerCase().includes(query.toLowerCase()) ||
            vehicle.owner.toLowerCase().includes(query.toLowerCase())
        );
    }

    addEvent(event) {
        event.id = `E-${Date.now()}`;
        event.timestamp = new Date().toISOString();
        this.data.events.push(event);
        return event;
    }
}
