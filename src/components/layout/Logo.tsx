export function Logo({ className = "", showText = true, dark = false }: { className?: string; showText?: boolean; dark?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-teal shadow-soft">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="white" strokeWidth="1.6">
          <path d="M12 12c0-2.5 1.8-4 3.5-4S19 9.3 19 11s-1.5 3-3.5 3" strokeLinecap="round" />
          <path d="M12 12c0-2.5-1.8-4-3.5-4S5 9.3 5 11s1.5 3 3.5 3" strokeLinecap="round" />
          <path d="M12 12c-2.5 0-4 1.8-4 3.5S9.3 19 11 19s3-1.5 3-3.5" strokeLinecap="round" />
          <path d="M12 12c2.5 0 4-1.8 4-3.5S14.7 5 13 5s-3 1.5-3 3.5" strokeLinecap="round" />
        </svg>
      </div>
      {showText && (
        <div className="leading-none">
          <span className={`block font-serif text-lg font-semibold ${dark ? "text-sidebar-foreground" : "text-foreground"}`}>
            Hellow <span className="text-gold">AI</span>
          </span>
          <span className={`block text-[10px] uppercase tracking-[0.2em] ${dark ? "text-sidebar-foreground/60" : "text-muted-foreground"}`}>
            Suite
          </span>
        </div>
      )}
    </div>
  );
}
