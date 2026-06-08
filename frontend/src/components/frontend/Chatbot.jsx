import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Loader2,
  RotateCcw,
  Sparkles,
  Calculator,
  FolderOpen,
  Phone,
  Briefcase,
} from "lucide-react";

const STORAGE_KEY = "ghani-sakan-chat-history";

const Chatbot = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const welcomeMessage = useCallback(
    () => ({
      role: "assistant",
      content: t("chatbot.welcome"),
    }),
    [t]
  );

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      }
    } catch {
      /* ignore */
    }
    setMessages([welcomeMessage()]);
  }, [welcomeMessage]);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length <= 1 && prev[0]?.role === "assistant") {
        return [welcomeMessage()];
      }
      return prev;
    });
  }, [i18n.language, welcomeMessage]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const apiBase = import.meta.env.VITE_BACKEND_URL;

  const quickSuggestions = [
    { key: "quick_services", icon: Sparkles },
    { key: "quick_quote", icon: Calculator },
    { key: "quick_contact", icon: MessageSquare },
    { key: "quick_projects", icon: Bot },
  ];

  const navLinks = [
    { to: "/services", labelKey: "link_services", icon: Briefcase },
    { to: "/projects", labelKey: "link_projects", icon: FolderOpen },
    { to: "/demander-service", labelKey: "link_contact", icon: Phone },
  ];

  const closeOnNavigate = () => setIsOpen(false);

  const renderMessageContent = (content) => {
    if (!content) return null;

    const pattern = /(\/(?:services|projects|demander-service|devis)(?:\/[^\s,.;!?]*)?)/g;
    const parts = content.split(pattern);

    return parts.map((part, index) => {
      const match = part.match(/^\/(services|projects|demander-service|devis)/);
      if (!match) {
        return <span key={index}>{part}</span>;
      }

      const path = part.split(/[\s,.;!?]/)[0];
      const label =
        path === "/services"
          ? t("chatbot.link_services")
          : path === "/projects"
            ? t("chatbot.link_projects")
            : path === "/demander-service"
              ? t("chatbot.link_contact")
              : t("chatbot.devis_link");

      return (
        <Link
          key={index}
          to={path}
          className="chatbot-inline-link"
          onClick={closeOnNavigate}
        >
          {label}
        </Link>
      );
    });
  };

  const resetChat = () => {
    const fresh = [welcomeMessage()];
    setMessages(fresh);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  };

  const sendMessage = async (text) => {
    const trimmed = text?.trim();
    if (!trimmed || isLoading) return;

    const userMessage = { role: "user", content: trimmed };
    const historyForApi = messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .slice(-8);

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    if (!apiBase) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: t("chatbot.error_config") },
      ]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${apiBase}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: historyForApi,
          locale: i18n.language?.startsWith("ar")
            ? "ar"
            : i18n.language?.startsWith("en")
              ? "en"
              : "fr",
        }),
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        /* réponse non-JSON */
      }

      if (!response.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.reply || t("chatbot.error_generic"),
          },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || t("chatbot.error_generic"),
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: t("chatbot.error_connection") },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickReply = (translationKey) => {
    sendMessage(t(`chatbot.${translationKey}`));
  };

  const toggleChat = () => setIsOpen((prev) => !prev);

  const showSuggestions =
    messages.length <= 1 && !isLoading && messages[0]?.role === "assistant";

  return (
    <>
      <button
        onClick={toggleChat}
        className={`chatbot-toggle shadow ${isOpen ? "is-open" : ""}`}
        aria-label={isOpen ? t("chatbot.close") : t("chatbot.open")}
        type="button"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && <span className="chatbot-toggle-pulse" aria-hidden="true" />}
      </button>

      {isOpen && (
        <div className="chatbot-window shadow-lg">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <Bot size={22} />
              </div>
              <div>
                <h5 className="m-0">{t("chatbot.title")}</h5>
                <span className="chatbot-status">
                  <span className="status-dot" />
                  {t("chatbot.subtitle")}
                </span>
              </div>
            </div>
            <div className="chatbot-header-actions">
              <button
                type="button"
                className="chatbot-icon-btn"
                onClick={resetChat}
                title={t("chatbot.reset")}
                aria-label={t("chatbot.reset")}
              >
                <RotateCcw size={16} />
              </button>
              <button
                type="button"
                className="chatbot-icon-btn"
                onClick={toggleChat}
                aria-label={t("chatbot.close")}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={`${msg.role}-${index}`}
                className={`message-wrapper ${msg.role}`}
              >
                <div className="message-icon" aria-hidden="true">
                  {msg.role === "user" ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className="message-bubble">
                  {msg.role === "assistant"
                    ? renderMessageContent(msg.content)
                    : msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="message-wrapper assistant">
                <div className="message-icon" aria-hidden="true">
                  <Bot size={14} />
                </div>
                <div className="message-bubble loading">
                  <Loader2 size={16} className="spinner" />
                  <span>{t("chatbot.typing")}</span>
                </div>
              </div>
            )}

            {showSuggestions && (
              <div className="chatbot-suggestions">
                {quickSuggestions.map(({ key, icon: Icon }) => (
                  <button
                    key={key}
                    type="button"
                    className="suggestion-chip"
                    onClick={() => handleQuickReply(key)}
                    disabled={isLoading}
                  >
                    <Icon size={14} />
                    {t(`chatbot.${key}`)}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-nav-links">
            <p className="chatbot-links-title">{t("chatbot.links_title")}</p>
            <div className="chatbot-nav-links-grid">
              {navLinks.map(({ to, labelKey, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className="chatbot-nav-link"
                  onClick={closeOnNavigate}
                >
                  <Icon size={15} />
                  {t(`chatbot.${labelKey}`)}
                </Link>
              ))}
              <Link
                to="/devis"
                className="chatbot-nav-link"
                onClick={closeOnNavigate}
              >
                <Calculator size={15} />
                {t("chatbot.devis_link")}
              </Link>
            </div>
          </div>

          <div className="chatbot-footer-meta">
            <span className="chatbot-powered">{t("chatbot.powered")}</span>
          </div>

          <form onSubmit={handleSubmit} className="chatbot-input">
            <input
              ref={inputRef}
              type="text"
              placeholder={t("chatbot.placeholder")}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              maxLength={1000}
              autoComplete="off"
            />
            <button type="submit" disabled={isLoading || !input.trim()} aria-label={t("chatbot.send")}>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
