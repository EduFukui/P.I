import HomeLEFT from "../components/Home/HomeLEFT";
import LoginForm from "../components/Home/Login/LoginForm";

export default function Login() {
    return (
        <main className="flex min-h-screen bg-[#131313]">
            <HomeLEFT />
            <LoginForm />
        </main>
    );
}