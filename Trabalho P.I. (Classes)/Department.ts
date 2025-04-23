export class Department {
    private departmentName: string;
    private responsibleContact: string;

    constructor(departmentNameConst: string, responsibleContactConst: string) {
        this.departmentName = departmentNameConst;
        this.responsibleContact = responsibleContactConst;
    }

    public getDepartmentName(): string { return this.departmentName; }
    public getResponsibleContact(): string { return this.responsibleContact; }

    public setDepartmentName(): void { this.departmentName = this.departmentName; }
    public setResponsibleContact(): void { this.responsibleContact = this.responsibleContact; }
}
