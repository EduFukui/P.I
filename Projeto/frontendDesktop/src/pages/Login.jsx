import RegisterHero from "../components/RegisterHero";
import LoginForm from "../components/Login/LoginForm";

export default function Login() {
    return (
        <main className="flex min-h-screen bg-[#131313]">

            <RegisterHero />

            <LoginForm />

        </main>
    );
}