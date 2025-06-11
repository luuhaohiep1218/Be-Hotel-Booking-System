export const fetchAIAssistantResponse = async (userInput, userData) => {
  try {
    const response = await fetch("http://localhost:8000/api/ai/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: userInput, user: userData }),
    });
    const data = await response.json();
    return data.response || "Xin lỗi, tôi không hiểu yêu cầu của bạn.";
  } catch (error) {
    console.error("AI Assistant API error:", error);
    return "Xin lỗi, hiện tại hệ thống đang gặp sự cố!";
  }
};
