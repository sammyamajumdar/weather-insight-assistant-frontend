import React, { useState, useRef } from "react";
import Connector from "./Connector";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
const API_ENDPOINT = "http://nasstarproject.bbe4c8gqgufcagcb.uksouth.azurecontainer.io:8000/get_response"

const handleSend = async () => {
  if (!input.trim()) return;
  const userMessage = { sender: "user", text: input };
  setMessages((msgs) => [...msgs, userMessage]);
  setLoading(true);

  try {
    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: input }),
    });

    if (!res.ok) {
      // Server returned an error status
      setMessages((msgs) => [
        ...msgs,
        { sender: "bot", text: "server error please try again later" },
      ]);
    } else {
      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        { sender: "bot", text: data.response?.output || "No response." },
      ]);
    }
  } catch (e) {
    setMessages((msgs) => [
      ...msgs,
      { sender: "bot", text: "server error please try again later" },
    ]);
  }
  setInput("");
  setLoading(false);
  setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
};

  const handleClear = () => {
    setMessages([]);
    setInput("");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        background: "linear-gradient(to bottom, #e3f2fd, #ffffff)",
        display: "flex",
        flexDirection: "column",
        p: 2,
      }}
    >
      <Typography variant="h6" sx={{ color: "#1976d2", mb: 1 }} className="flex justify-center">
        Query weather data
      </Typography>
      <Paper
        elevation={3}
        sx={{
          flex: 1,
          mb: 2,
          overflowY: "auto",
          background: "#fff",
          p: 2,
        }}
      >
        <List>
          {messages.map((msg, idx) => (
            <ListItem
              key={idx}
              sx={{
                justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              <ListItemText
                primary={msg.text}
                sx={{
                  bgcolor: msg.sender === "user" ? "#1976d2" : "#e3f2fd",
                  color: msg.sender === "user" ? "#fff" : "#1976d2",
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  maxWidth: "70%",
                  textAlign: msg.sender === "user" ? "right" : "left",
                }}
              />
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Paper>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) handleSend();
          }}
          disabled={loading}
          sx={{ bgcolor: "#fff" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSend}
          disabled={loading}
        >
          Send
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleClear}
          disabled={loading}
        >
          Clear
        </Button>
      </Box>
      <Connector />
    </Box>
  );
};

export default Chatbot;
