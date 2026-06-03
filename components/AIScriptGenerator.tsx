"use client";

import { useState } from "react";


import { useSession } from "next-auth/react";
import { saveItemToSupabase } from "@/lib/saveHistory";

export default function AIScriptGenerator({
  lightMode,
}: {
  lightMode: boolean;
}) {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState<any>(null);
  const { data: session } = useSession();
const [saved, setSaved] = useState(false);

  const generateScript = async () => {
  if (!idea.trim()) return;

  if (
    idea.includes("youtube.com") ||
    idea.includes("youtu.be")
  ) {
    alert("Please enter a topic, not a YouTube link.");
    return;
  }

  setLoading(true);
  setSaved(false);
  setScript(null);

  setTimeout(() => {
    const cleanIdea = idea
  .replace(/https?:\/\/[^\s]+/g, "")
  .replace(/www\.[^\s]+/g, "")
  .replace(/youtube\.com/gi, "")
  .replace(/youtu\.be/gi, "")
  .trim();

    const pick = (arr: any[]) =>
  arr[Math.floor(Math.random() * arr.length)];

    const hooks = [
      `Most people don't know this about ${cleanIdea}.`,
      `Stop scrolling if you care about ${cleanIdea}.`,
      `This could change how you think about ${cleanIdea}.`,
      `Nobody explains ${cleanIdea} like this.`,
      `Here is the fastest way to understand ${cleanIdea}.`,
      `You are probably doing ${cleanIdea} wrong.`,
      `This one mistake ruins ${cleanIdea}.`,
      `I wish I knew this about ${cleanIdea} earlier.`,
      `Before you try ${cleanIdea}, watch this.`,
      `The truth about ${cleanIdea} is surprising.`,
      `This simple trick improves ${cleanIdea}.`,
      `Here is why ${cleanIdea} matters right now.`,
      `Most beginners miss this part of ${cleanIdea}.`,
      `This is the hidden side of ${cleanIdea}.`,
      `Don't start ${cleanIdea} before knowing this.`,
      `One small change can improve ${cleanIdea}.`,
      `This is what nobody tells you about ${cleanIdea}.`,
      `If you like ${cleanIdea}, you need this.`,
      `Here is a smarter way to do ${cleanIdea}.`,
      `This makes ${cleanIdea} much easier.`,
      `You don't need to overcomplicate ${cleanIdea}.`,
      `The best shortcut for ${cleanIdea} is this.`,
      `This is why people fail at ${cleanIdea}.`,
      `A simple rule for better ${cleanIdea}.`,
      `This changed my view on ${cleanIdea}.`,
      `Use this before your next ${cleanIdea}.`,
      `The easiest way to improve ${cleanIdea}.`,
      `This is the beginner mistake in ${cleanIdea}.`,
      `Want better ${cleanIdea}? Start here.`,
      `This is the secret pattern behind ${cleanIdea}.`,
    ];

    const scene1s = [
      "Start by showing the biggest problem.",
      "Open with a surprising fact.",
      "Show the common mistake first.",
      "Explain the situation in one sentence.",
      "Point out what most people ignore.",
      "Show the before state clearly.",
      "Ask a quick question to create curiosity.",
      "Begin with a bold statement.",
      "Show why this topic matters today.",
      "Use a quick example from real life.",
      "Show the pain point immediately.",
      "Mention the mistake beginners usually make.",
      "Start with a visual comparison.",
      "Explain what people usually believe.",
      "Show the wrong way first.",
      "Present the problem in simple words.",
      "Start with a mini story.",
      "Reveal the myth around the topic.",
      "Show what happens when it goes wrong.",
      "Introduce the idea with urgency.",
      "Show a quick result first.",
      "Begin with a relatable frustration.",
      "Explain the hidden issue.",
      "Start with one clear warning.",
      "Show the viewer what they will learn.",
      "Mention why timing matters.",
      "Show a quick setup.",
      "Introduce the topic with a strong claim.",
      "Show the audience the first step.",
      "Create curiosity with a missing detail.",
    ];

    const scene2s = [
      "Then explain the simple solution.",
      "Break it into one easy step.",
      "Show the method that works better.",
      "Explain why the mistake happens.",
      "Give a practical example.",
      "Show the smarter alternative.",
      "Reveal the key detail.",
      "Explain the benefit quickly.",
      "Show how to fix the problem.",
      "Give the viewer one action to take.",
      "Compare the bad method with the good method.",
      "Explain the main reason behind it.",
      "Show the trick in action.",
      "Give a quick checklist.",
      "Explain what to avoid.",
      "Show the shortcut clearly.",
      "Reveal the most important rule.",
      "Explain the idea in simple language.",
      "Show how beginners can apply it.",
      "Give one useful tip.",
      "Explain the common misunderstanding.",
      "Show the correct order of steps.",
      "Make the solution feel easy.",
      "Give a real-world use case.",
      "Show the small change that helps.",
      "Explain why this works.",
      "Give a quick demonstration.",
      "Show the hidden advantage.",
      "Explain the fastest path.",
      "Turn the idea into a simple formula.",
    ];

    const scene3s = [
      "End by showing the final benefit.",
      "Show what changes after applying it.",
      "Reveal the result clearly.",
      "Summarize the lesson in one sentence.",
      "Show the viewer why this matters.",
      "End with a strong takeaway.",
      "Explain the final outcome.",
      "Show the improved version.",
      "Give the viewer a reason to save it.",
      "End with a practical next step.",
      "Show the transformation.",
      "Explain how this saves time.",
      "End with the main rule.",
      "Show why this is worth trying.",
      "Give a quick recap.",
      "End with a surprising conclusion.",
      "Show the reward of doing it right.",
      "Explain what to do next.",
      "End with one memorable sentence.",
      "Make the viewer feel they learned something.",
      "Show the easy win.",
      "Explain how to repeat the result.",
      "End with a direct recommendation.",
      "Show why the method works long term.",
      "Give a final warning.",
      "Show how to avoid the mistake.",
      "End with a confidence boost.",
      "Explain the result in simple terms.",
      "Give the viewer a challenge.",
      "Close with a strong final line.",
    ];

    const ctas = [
      "Follow for more YouTube growth tips.",
      "Save this and use it later.",
      "Try this in your next video.",
      "Follow for smarter content ideas.",
      "Comment if you want part two.",
      "Send this to a creator friend.",
      "Save this before you forget.",
      "Use this before your next upload.",
      "Follow for more simple tips.",
      "Try this today and compare results.",
      "Comment your niche below.",
      "Follow for daily creator tips.",
      "Save this as your checklist.",
      "Share this with someone starting out.",
      "Use this as your next content idea.",
      "Follow if you want more growth tricks.",
      "Try this on your next Short.",
      "Comment 'more' for another example.",
      "Save this for your next script.",
      "Follow for more viral video ideas.",
      "Test this and see what happens.",
      "Use this formula today.",
      "Follow for better titles and hooks.",
      "Save this if it helped.",
      "Comment your video idea below.",
      "Follow for simple YouTube strategy.",
      "Try this before your next post.",
      "Share this with your team.",
      "Save it and apply it later.",
      "Follow for more content systems.",
    ];

    const captions = [
      `${cleanIdea} made simple.`,
      `A quick lesson about ${cleanIdea}.`,
      `${cleanIdea} explained in seconds.`,
      `Use this tip for better ${cleanIdea}.`,
      `Simple strategy for ${cleanIdea}.`,
      `Stop overcomplicating ${cleanIdea}.`,
      `A smarter way to approach ${cleanIdea}.`,
      `This can improve your ${cleanIdea}.`,
      `Save this ${cleanIdea} tip.`,
      `Quick guide to ${cleanIdea}.`,
      `Try this ${cleanIdea} method.`,
      `Better ${cleanIdea} starts here.`,
      `The simple truth about ${cleanIdea}.`,
      `One useful idea for ${cleanIdea}.`,
      `A fast way to understand ${cleanIdea}.`,
      `This ${cleanIdea} trick helps.`,
      `Improve your ${cleanIdea} today.`,
      `${cleanIdea} without confusion.`,
      `A practical tip for ${cleanIdea}.`,
      `Your next step for ${cleanIdea}.`,
      `This is how ${cleanIdea} gets easier.`,
      `Short and simple ${cleanIdea} advice.`,
      `A beginner-friendly ${cleanIdea} tip.`,
      `Make ${cleanIdea} easier today.`,
      `One small fix for ${cleanIdea}.`,
      `This ${cleanIdea} idea is useful.`,
      `Learn ${cleanIdea} faster.`,
      `A better way to do ${cleanIdea}.`,
      `Use this for your next ${cleanIdea}.`,
      `The shortcut to better ${cleanIdea}.`,
    ];

    const hashtagSets = [
      ["#shorts", "#youtube", "#growth"],
      ["#viral", "#creator", "#shorts"],
      ["#content", "#seo", "#youtube"],
      ["#youtubetips", "#shortsfeed", "#creator"],
      ["#growthtips", "#contentcreator", "#viral"],
      ["#videomarketing", "#shortsvideo", "#tips"],
      ["#socialmedia", "#youtubecreator", "#strategy"],
      ["#creatorlife", "#contenttips", "#shorts"],
      ["#onlinegrowth", "#youtubechannel", "#seo"],
      ["#viralvideo", "#shortscreator", "#content"],
    ];

    const selected = {
      hook: pick(hooks),
      scene1: pick(scene1s),
      scene2: pick(scene2s),
      scene3: pick(scene3s),
      cta: pick(ctas),
      caption: pick(captions),
      hashtags: pick(hashtagSets),
    };

    setScript(selected);
    setLoading(false);
  }, 500);
};
  const copyScript = () => {
    if (!script) return;

    const text = `
HOOK:
${script.hook}

SCENE 1:
${script.scene1}

SCENE 2:
${script.scene2}

SCENE 3:
${script.scene3}

CTA:
${script.cta}

CAPTION:
${script.caption}

HASHTAGS:
${script.hashtags?.join(" ")}
`;

    navigator.clipboard.writeText(text);
  };

  return (
    <div
      style={{
        marginTop: "40px",
        background:
          "linear-gradient(135deg, rgba(17,24,39,0.95), rgba(30,41,59,0.9))",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "30px",
        padding: "40px",
        boxShadow: "0 10px 60px rgba(0,0,0,0.35)",
        backdropFilter: "blur(20px)",
      }}
    >
      <h2 style={{ fontSize: "36px", fontWeight: "900" }}>
        AI Script Generator
      </h2>

      <p
        style={{
          marginTop: "10px",
          color: lightMode ? "#475569" : "#94a3b8",
        }}
      >
        Turn any viral idea into a ready-to-record Shorts script.
      </p>

      <div
        style={{
          marginTop: "24px",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "14px",
          alignItems: "center",
        }}
      >
        <input
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Enter video idea..."
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "18px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: lightMode
              ? "rgba(255,255,255,0.95)"
              : "rgba(255,255,255,0.05)",
            color: lightMode ? "#0f172a" : "white",
            outline: "none",
            fontSize: "16px",
          }}
        />

        <button
        
          onClick={generateScript}

          
          disabled={loading}
          style={{
            background: "linear-gradient(to right,#7c3aed,#06b6d4)",
            border: "none",
            color: "white",
            padding: "16px 24px",
            borderRadius: "18px",
            cursor: "pointer",
            fontWeight: "800",
            whiteSpace: "nowrap",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "Generating..." : "🎬 Generate Script"}
        </button>
      </div>

      {script && (
        <div
          style={{
            marginTop: "26px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "24px",
            padding: "24px",
          }}
        >
          <ScriptBlock title="Hook" value={script.hook} />
          <ScriptBlock title="Scene 1" value={script.scene1} />
          <ScriptBlock title="Scene 2" value={script.scene2} />
          <ScriptBlock title="Scene 3" value={script.scene3} />
          <ScriptBlock title="CTA" value={script.cta} />
          <ScriptBlock title="Caption" value={script.caption} />

          {script.hashtags?.length > 0 && (
            <div style={{ marginTop: "18px" }}>
              <p style={{ color: "#94a3b8", fontWeight: "800" }}>
                Hashtags
              </p>

              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                {script.hashtags.map((tag: string, i: number) => (
                  <span
                    key={i}
                    style={{
                      background: "rgba(124,58,237,0.18)",
                      border: "1px solid rgba(124,58,237,0.3)",
                      color: "#c4b5fd",
                      padding: "8px 12px",
                      borderRadius: "999px",
                      fontWeight: "800",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={copyScript}
            style={{
              marginTop: "24px",
              background: "linear-gradient(to right,#22c55e,#06b6d4)",
              border: "none",
              color: "white",
              padding: "14px 20px",
              borderRadius: "16px",
              cursor: "pointer",
              fontWeight: "900",
            }}
          >
            Copy Script
          </button>

<button
  onClick={async () => {
    if (!script || !session?.user?.email) return;

    const content = `
HOOK:
${script.hook}

SCENE 1:
${script.scene1}

SCENE 2:
${script.scene2}

SCENE 3:
${script.scene3}

CTA:
${script.cta}

CAPTION:
${script.caption}

HASHTAGS:
${script.hashtags?.join(" ")}
`;

    const ok = await saveItemToSupabase({
      userEmail: session.user.email,
      type: "script",
      title: `Script: ${idea.slice(0, 40) || "AI Script"}`,
      content,
    });

    if (ok) setSaved(true);
  }}
  style={{
    marginTop: "24px",
    marginLeft: "10px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "white",
    padding: "14px 20px",
    borderRadius: "16px",
    cursor: "pointer",
    fontWeight: "900",
  }}
>
  {saved ? "Saved ✓" : "Save Script"}
</button>

        </div>
      )}
    </div>
  );
}

function ScriptBlock({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div style={{ marginTop: "16px" }}>
      <p style={{ color: "#94a3b8", fontWeight: "800" }}>
        {title}
      </p>

      <p
        style={{
          marginTop: "6px",
          color: "#e5e7eb",
          lineHeight: 1.6,
          fontWeight: "700",
        }}
      >
        {value}
      </p>
    </div>
  );
}