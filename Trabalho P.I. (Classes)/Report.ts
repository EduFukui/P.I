export class report {
    private date_report: number;
    private time: number;
    private status: string;
    private description: string;

    constructor(dataRel: number, time: number, status: string, description: string) {
        this.date_report = dataRel
        this.time = time
        this.status = status
        this.description = description
    }

    public getDataRela(): number { return this.date_report }

    public getHora(): number { return this.time }

    public getStatus(): string { return this.status }

    public getDescricao(): string { return this.description }


    public setDataRel(): void { this.date_report = this.date_report }

    public setTime(): void { this.time = this.time }

    public setStatus(): void { this.status = this.status }

    public setDescricao(): void { this.description = this.description }
}