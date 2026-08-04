import RegisterHero from "../components/Register/RegisterHero";
import RegisterForm from "../components/Register/RegisterForm";

export default function Register() {
    return (
        <main className="flex min-h-screen bg-[#131313]">

            <RegisterHero />

            <RegisterForm />

        </main>
    );
}