"use client";

type Props = {
  children: React.ReactNode;
  lightMode?: boolean;
  style?: React.CSSProperties;
};

export default function GlassCard({
  children,
  lightMode = false,
  style = {},
}: Props) {
  return (
    <div
      style={{
        marginTop: "40px",
        background: lightMode
          ? "rgba(255,255,255,0.9)"
          : "linear-gradient(135deg, rgba(17,24,39,0.95), rgba(30,41,59,0.9))",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "30px",
        padding: "40px",
        boxShadow: "0 10px 60px rgba(0,0,0,0.35)",
        backdropFilter: "blur(20px)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}