
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  Bot,
  LayoutDashboard,
  MessageSquare,
  History,
  BookOpen,
  Settings,
  Plus,
  Paperclip,
  Send,
  ShieldCheck,
  Monitor,
  Wifi,
  Mail,
  Laptop,
  ChevronDown,
  Headphones,
  Sparkles,
} from "lucide-react";

import "./App.css";

interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  {
    icon: Monitor,
    title: "Windows troubleshooting",
    description: "Resolve slow performance and system issues.",
    prompt:
      "My Windows computer is running slowly. How can I troubleshoot it?",
  },
  {
    icon: Mail,
    title: "Outlook support",
    description: "Fix email synchronization and access issues.",
    prompt:
      "My Outlook emails are not synchronizing. How can I fix this?",
  },
  {
    icon: Wifi,
    title: "VPN connectivity",
    description: "Get help connecting to your company VPN.",
    prompt:
      "I cannot connect to my company VPN. What should I do?",
  },
  {
    icon: Laptop,
    title: "Hardware support",
    description: "Troubleshoot laptop and device problems.",
    prompt:
      "My laptop is not responding. What troubleshooting steps should I follow?",
  },
];

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Reference to the bottom of the conversation
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Automatically scroll whenever messages or loading status changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isLoading, error]);

  // Send a message to the FastAPI backend
  const sendMessage = async (event?: FormEvent) => {
    event?.preventDefault();

    const userMessage = message.trim();

    if (!userMessage || isLoading) return;

    const newUserMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      content: userMessage,
    };

    setMessages((previous) => [...previous, newUserMessage]);
    setMessage("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to get a response from VHelpbot.");
      }

      const data: { answer: string } = await response.json();

      setMessages((previous) => [
        ...previous,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: data.answer,
        },
      ]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">
            <Bot size={25} />
          </div>

          <div>
            <h2>VHelpbot</h2>
            <span>Enterprise IT Support</span>
          </div>
        </div>

        <button
          className="new-chat"
          onClick={() => {
            setMessages([]);
            setMessage("");
            setError("");
          }}
        >
          <Plus size={18} />
          New conversation
        </button>

        <div className="nav-section">
          <span className="nav-label">WORKSPACE</span>

          <a className="nav-item active" href="#">
            <LayoutDashboard size={18} />
            Dashboard
          </a>

          <a className="nav-item" href="#">
            <MessageSquare size={18} />
            AI Assistant
          </a>

          <a className="nav-item" href="#">
            <History size={18} />
            Conversation history
          </a>

          <a className="nav-item" href="#">
            <BookOpen size={18} />
            Knowledge base
          </a>
        </div>

        <div className="sidebar-bottom">
          <div className="support-card">
            <div className="support-icon">
              <Headphones size={20} />
            </div>

            <strong>Need more help?</strong>

            <p>
              Our IT support team is available to assist you.
            </p>

            <button>Contact support</button>
          </div>

          <a className="nav-item" href="#">
            <Settings size={18} />
            Settings
          </a>

          <div className="profile">
            <div className="avatar">VG</div>

            <div className="profile-info">
              <strong>VHelpbot User</strong>
              <span>Employee account</span>
            </div>

            <ChevronDown size={16} />
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            Workspace <span>/</span> Dashboard
          </div>

          <div className="topbar-right">
            <div className="system-status">
              <span className="status-dot"></span>
              Systems operational
            </div>

            <div className="top-avatar">VG</div>
          </div>
        </header>

        <section className="dashboard-content">
          {/* Welcome section */}
          <div className="welcome-section">
            <div className="welcome-eyebrow">
              <Sparkles size={15} />
              YOUR AI-POWERED IT ASSISTANT
            </div>

            <h1>How can I help you today?</h1>

            <p>
              Get instant IT support, troubleshoot technical issues, and
              find answers using your organization's knowledge base.
            </p>
          </div>

          {/* Chat panel */}
          <div className="chat-panel">
            <div className="assistant-heading">
              <div className="assistant-avatar">
                <Bot size={25} />
              </div>

              <div>
                <strong>VHelpbot Assistant</strong>

                <span>
                  <span className="status-dot"></span>
                  AI assistant online
                </span>
              </div>

              <div className="secure-label">
                <ShieldCheck size={15} />
                Enterprise support
              </div>
            </div>

            {/* Conversation */}
            {messages.length > 0 && (
              <div className="conversation">
                {messages.map((item) => (
                  <div
                    key={item.id}
                    className={`message ${item.role}`}
                  >
                    <strong>
                      {item.role === "user" ? "You" : "VHelpbot"}
                    </strong>

                    <div className="message-content">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {item.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="message assistant">
                    <strong>VHelpbot</strong>
                    <p>Thinking...</p>
                  </div>
                )}

                {/* Error message */}
                {error && (
                  <div className="error-message">
                    {error}
                  </div>
                )}

                {/* Automatic scroll target: keep this last */}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Welcome screen and suggested topics */}
            {messages.length === 0 && (
              <>
                <div className="chat-welcome">
                  <div className="welcome-bot-icon">
                    <Bot size={32} />
                  </div>

                  <h2>Hello! I'm VHelpbot.</h2>

                  <p>
                    I'm your virtual IT support assistant. Describe your
                    technical issue, and I'll guide you through the
                    troubleshooting process.
                  </p>
                </div>

                <div className="suggestions-heading">
                  <span>COMMON IT SUPPORT TOPICS</span>
                  <span>Choose a topic to get started</span>
                </div>

                <div className="suggestions-grid">
                  {suggestions.map((item) => {
                    const Icon = item.icon;

                    return (
                      <button
                        className="suggestion-card"
                        key={item.title}
                        onClick={() => setMessage(item.prompt)}
                      >
                        <div className="suggestion-icon">
                          <Icon size={20} />
                        </div>

                        <strong>{item.title}</strong>
                        <p>{item.description}</p>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {/* Chat input */}
            <div className="chat-input-area">
              <div className="input-wrapper">
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Describe your IT issue or ask a question..."
                  rows={2}
                />

                <div className="input-actions">
                  <button
                    className="attachment-button"
                    aria-label="Attach file"
                  >
                    <Paperclip size={18} />
                  </button>

                  <button
                    className="send-button"
                    disabled={!message.trim() || isLoading}
                    aria-label="Send message"
                    onClick={() => sendMessage()}
                  >
                    <Send size={17} />
                    {isLoading ? "Sending..." : "Send message"}
                  </button>
                </div>
              </div>

              <p className="input-disclaimer">
                <ShieldCheck size={13} />
                Never share passwords, authentication codes, or other
                sensitive credentials.
              </p>
            </div>
          </div>

          {/* Footer */}
          <footer className="dashboard-footer">
            <span>VHelpbot © 2026</span>
            <span>Powered by AI · Built for enterprise IT support</span>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default App;
