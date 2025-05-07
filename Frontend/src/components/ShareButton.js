import React from "react";
import "./ShareButton.scss";

const ShareButton = ({ techName, linkText }) => {
  const pageUrl = `https://codefellow.netlify.app/learn/${linkText}`;
  const shareText = `Learn ${techName} with top resources at CodeFellow! 🚀\n${pageUrl}`;
  const shareText2 = `Learn ${techName} with top resources at CodeFellow! 🚀\n`;

  // Function to handle Web Share API (For mobile & compatible browsers)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Learn ${techName} on CodeFellow`,
          text: shareText2,
          url: pageUrl,
        });
      } catch (error) {
        console.error("Sharing failed:", error);
      }
    } else {
      copyToClipboard(); // Fallback if Web Share API is not supported
    }
  };

  // Function to copy the link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(pageUrl);
  };

  return (
    <div className="share-buttons">
      <button onClick={handleNativeShare} className="share-btn">
        📤 Share
      </button>
      <button onClick={copyToClipboard} className="copy-btn">
        📋 Copy Link
      </button>

      {/* Social Media Share Links */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        🐦 Tweet
      </a>
      <a
        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
          shareText
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        📱 WhatsApp
      </a>
      <a
        href={`https://t.me/share/url?url=${encodeURIComponent(
          pageUrl
        )}&text=${encodeURIComponent(shareText)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        📢 Telegram
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          pageUrl
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        💼 LinkedIn
      </a>
    </div>
  );
};

export default ShareButton;
