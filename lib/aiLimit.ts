export function checkAILimit(limit = 100) {
  if (typeof window === "undefined") {
    return { allowed: true, remaining: limit };
  }

  const today = new Date().toISOString().slice(0, 10);
  const key = `vira-ai-limit-${today}`;

  const used = Number(localStorage.getItem(key) || "0");
  const remaining = Math.max(0, limit - used);

  if (used >= limit) {
    return { allowed: false, remaining: 0 };
  }

  localStorage.setItem(key, String(used + 1));

  return {
    allowed: true,
    remaining: Math.max(0, limit - used - 1),
  };
}