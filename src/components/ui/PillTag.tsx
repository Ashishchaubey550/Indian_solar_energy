type PillTagProps = {
  children: React.ReactNode;
  variant?: "light" | "dark" | "outline";
  className?: string;
};

export default function PillTag({
  children,
  variant = "outline",
  className = "",
}: PillTagProps) {
  const variants = {
    light: "bg-[#d8e8d8] text-[#1b3022] border-transparent",
    dark: "bg-white text-[#1b3022] border-transparent",
    outline: "bg-white text-gray-500 border-gray-200",
  };

  return (
    <span
      className={`inline-block rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
