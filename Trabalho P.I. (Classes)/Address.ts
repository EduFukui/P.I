export class address {
    private CEP: number;
    private street: string;
    private number: number;
    private complement: string;
    private city: string;
    private neighborhood: string;
    private state: string;
    private country: string;
    private longitude: number;
    private latitude: number;

    constructor(CEPConst: number, streetConst: string, numberConst: number, complementConst: string, cityConst: string, neighborhoodConst: string, stateConst: string, countryConst: string, longitudeConst: number, latitudeConst: number) {
        this.CEP = CEPConst;
        this.street = streetConst;
        this.number = numberConst;
        this.complement = complementConst;
        this.city = cityConst;
        this.neighborhood = neighborhoodConst;
        this.state = stateConst;
        this.country = countryConst;
        this.longitude = longitudeConst;
        this.latitude = latitudeConst;
    }

    public getCEP(): number { return this.CEP }

    public getStreet(): string { return this.street }

    public getNumber(): number { return this.number }

    public getComplement(): string { return this.complement }

    public getCity(): string { return this.city }

    public getNeighborhood(): string { return this.neighborhood }

    public getState(): string { return this.state }

    public getCountry(): string { return this.country }

    public getLongitude(): number { return this.longitude }

    public getLatitude(): number { return this.latitude }

    
    public setCEP(): void { this.CEP = this.CEP }

    public setStreet(): void { this.street = this.street }

    public setNumber(): void { this.number = this.number }

    public setComplement(): void { this.complement = this.complement }

    public setCity(): void { this.city = this.city }

    public setNeighborhood(): void { this.neighborhood = this.neighborhood }

    public setState(): void { this.state = this.state }

    public setCountry(): void { this.country = this.country }

    public setLongitude(): void { this.longitude = this.longitude }

    public setLatitude(): void { this.latitude = this.latitude }
}