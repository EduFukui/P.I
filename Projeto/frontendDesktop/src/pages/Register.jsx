import RegisterForm from "../components/Home/Register/RegisterForm";
import HomeLEFT from "../components/Home/HomeLEFT";

export default function Register() {
    return (
        <main className="flex min-h-screen bg-[#131313]">
            <HomeLEFT />
            <RegisterForm />
        </main>
    );
}