export class Problem {
    private problemName: string;
    private problemPriority: string;
    private problemDescription: string;
    private resolutionComment: string;
    private userRating: string;
    private resolutionDateTime: number;
    private resolutionResponsible: string;

    constructor(
        problemNameConst: string,
        problemPriorityConst: string,
        problemDescriptionConst: string,
        resolutionCommentConst: string,
        userRatingConst: string,
        resolutionDateTimeConst: number,
        resolutionResponsibleConst: string
    ) {
        this.problemName = problemNameConst;
        this.problemPriority = problemPriorityConst;
        this.problemDescription = problemDescriptionConst;
        this.resolutionComment = resolutionCommentConst;
        this.userRating = userRatingConst;
        this.resolutionDateTime = resolutionDateTimeConst;
        this.resolutionResponsible = resolutionResponsibleConst;
    }

    public getProblemName(): string { return this.problemName; }

    public getProblemPriority(): string { return this.problemPriority; }

    public getProblemDescription(): string { return this.problemDescription; }

    public getResolutionComment(): string { return this.resolutionComment; }

    public getUserRating(): string { return this.userRating; }

    public getResolutionDateTime(): number { return this.resolutionDateTime; }

    public getResolutionResponsible(): string { return this.resolutionResponsible; }

    
    public setProblemName(): void { this.problemName = this.problemName; }

    public setProblemPriority(): void { this.problemPriority = this.problemPriority; }

    public setProblemDescription(): void { this.problemDescription = this.problemDescription; }

    public setResolutionComment(): void { this.resolutionComment = this.resolutionComment; }

    public setUserRating(): void { this.userRating = this.userRating; }

    public setResolutionDateTime(): void { this.resolutionDateTime = this.resolutionDateTime; }

    public setResolutionResponsible(): void { this.resolutionResponsible = this.resolutionResponsible; }
}