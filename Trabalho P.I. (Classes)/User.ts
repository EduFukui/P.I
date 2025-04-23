export class User {
    private full_name_user: string;
    private CPF: string;
    private email: string;
    private password: string;
    private phone_user: number;
    private data_login: number;

    constructor(full_name_userConst: string, CPFConst: string, emailConst: string, passwordConst: string, phone_userConst: number, data_loginConst: number) {
        this.full_name_user = full_name_userConst;
        this.CPF = CPFConst;
        this.email = emailConst;
        this.password = passwordConst
        this.phone_user = phone_userConst
        this.data_login = data_loginConst;
    }

    public getName(): string { return this.full_name_user }

    public getEmail(): string { return this.email }

    public getCPF(): string { return this.CPF }

    public getPassword(): string { return this.password }

    public getPhoneUser(): number { return this.phone_user }

    public getData(): number { return this.data_login }


    public setName(): void { this.full_name_user = this.full_name_user }

    public setEmail(): void { this.email = this.email }

    public setCPF(): void { this.CPF = this.CPF }

    public setPassword(): void { this.password = this.password }

    public setPhoneUser(): void { this.phone_user = this.phone_user }

    public setData(): void { this.data_login = this.data_login }
}