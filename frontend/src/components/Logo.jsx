export default function Logo({ size = 'md', showAuthor = false }) {
    const sizes = {
        sm: { height: 32, fontSize: 'text-xl', authorSize: 'text-[0.65rem]' },
        md: { height: 32, fontSize: 'text-2xl', authorSize: 'text-[0.7rem]' },
        lg: { height: 48, fontSize: 'text-4xl', authorSize: 'text-xs' },
    };

    const { height, fontSize, authorSize } = sizes[size];

    return (
        <div className="flex flex-col items-center leading-none">
            <span
                className={`font-bold ${fontSize}`}
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
                <span className="text-[#00A8FF]">X</span>
                <span className="text-white">Steam</span>
            </span>
            {showAuthor && (
                <span
                    className={`text-white ${authorSize} font-light tracking-wide opacity-75 mt-0.5`}
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                    By Sambhav Das
                </span>
            )}
        </div>
    );
}
