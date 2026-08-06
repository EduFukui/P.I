import RegisterForm from "../components/Register/RegisterForm";
import RegisterHero from "../components/RegisterHero";

export default function Register() {
    return (
        <main className="flex min-h-screen bg-[#131313]">

            <RegisterHero />

            <RegisterForm />

        </main>
    );
}