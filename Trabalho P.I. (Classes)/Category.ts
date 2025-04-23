export class category {
    private category_name: string;
    private category_description: string;

    constructor(category_nameConst: string, category_descriptionConst: string) {
        this.category_name = category_nameConst;
        this.category_description = category_descriptionConst;
    }

    public getCateName(): string { return this.category_name }

    public getCateDescription(): string { return this.category_description }

    public setCateName(): void { this.category_name = this.category_name }

    public setCateDescription(): void {this.category_description = this.category_description}
}