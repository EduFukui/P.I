
export default function FeatureCard({
    icon: Icon,
    title,
}) {
    return (
        <div className="rounded-xl border border-white/5 bg-[#1A1A1A]/70 p-4 backdrop-blur-md">

            <Icon className="mb-2 h-7 w-7 text-lime-400" />

            <p className="font-semibold text-white">
                {title}
            </p>

        </div>
    );
}