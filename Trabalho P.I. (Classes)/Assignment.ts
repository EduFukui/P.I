export class Assignment {
    private observations: string;
    private assignmentDateTime: number;

    constructor(observationsConst: string, assignmentDateTimeConst: number) {
        this.observations = observationsConst;
        this.assignmentDateTime = assignmentDateTimeConst;
    }

    public getObservations(): string { return this.observations; }
    public getAssignmentDateTime(): number { return this.assignmentDateTime; }

    public setObservations(): void { this.observations = this.observations; }
    public setAssignmentDateTime(): void { this.assignmentDateTime = this.assignmentDateTime; }
}