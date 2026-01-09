import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { askFinanceAI } from "../../api/aiApi";

type ChatMessage = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "fintrackChat";

const FinTrackAI: React.FC = () => {
  // ✅ Initialize from localStorage synchronously
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔄 Persist to localStorage whenever messages change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // swallow storage errors (quota, private mode, etc.)
    }
  }, [messages]);

  // Optional: auto-scroll to latest message
  const chatRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await askFinanceAI(userMsg.content);
      const assistantMsg: ChatMessage = {
        role: "assistant",
        content: res.answer || "No response.",
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: err?.response?.data?.error || "Something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        FinTrack Pro AI
      </Typography>

      <Paper
        ref={chatRef}
        sx={{
          p: 2,
          mb: 2,
          minHeight: 300,
          maxHeight: 400,
          overflowY: "auto", // scrollable when content grows
        }}
      >
        {messages.length === 0 ? (
          <Typography color="text.secondary">
            Ask about your spending, budgets, or get general advice—e.g., “How
            much did I spend on Food this month?” or “Suggest a savings plan.”
          </Typography>
        ) : (
          messages.map((m, idx) => (
            <Box key={idx} sx={{ mb: 1 }}>
              <Typography
                variant="subtitle2"
                color={m.role === "user" ? "primary" : "secondary"}
              >
                {m.role === "user" ? "You" : "FinTrack Pro AI"}
              </Typography>
              <Typography>{m.content}</Typography>
            </Box>
          ))
        )}
      </Paper>

      <Box display="flex" gap={2}>
        <TextField
          fullWidth
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <Button variant="contained" onClick={sendMessage} disabled={loading}>
          {loading ? "Thinking..." : "Send"}
        </Button>
      </Box>
    </Box>
  );
};

export default FinTrackAI;
