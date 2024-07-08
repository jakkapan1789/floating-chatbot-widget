var agent = {
  init: function ({
    name = "",
    profileImg = "",
    widgetPosition = {},
    customChatTab = {},
  }) {
    this.name = name || "";
    this.profileImg = profileImg || "";
    this.widgetPosition = {
      bottom: widgetPosition.bottom || "20px",
      right: widgetPosition.right || "25px",
      borderRadius: widgetPosition.borderRadius || "50%",
      zIndex: widgetPosition.zIndex || 9999,
    };
    this.customChatTab = {
      btnSend: customChatTab.btnSend || "Send",
      bgColor: {
        to: customChatTab.bgColor?.to || "right",
        firstColor: customChatTab.bgColor?.firstColor || "",
        secondColor: customChatTab.bgColor?.secondColor || "",
      },
    };
    const chatButton = document.createElement("button");
    chatButton.classList.add("agent-chatButton");
    chatButton.setAttribute("id", "chatButton");
    chatButton.onclick = agentOpenChat;
    const chatButtonImg = document.createElement("img");
    if (profileImg !== "") {
      chatButtonImg.src = profileImg;
      srcAgentImg = profileImg;
    }
    chatButton.appendChild(chatButtonImg);
    const chatPopup = document.createElement("div");
    chatPopup.classList.add("agent-popup");
    chatPopup.setAttribute("id", "chatPopup");
    const popupHeader = document.createElement("div");
    popupHeader.classList.add("agent-popup-header");
    const popupTitle = document.createElement("span");
    popupTitle.style.fontWeight = "bold";
    popupTitle.textContent = name !== "" ? name : "ChatBot";
    const closeButton = document.createElement("a");
    closeButton.classList.add("agent-btn-close");
    closeButton.textContent = "X";
    closeButton.setAttribute("id", "closeButton");
    closeButton.onclick = agentCloseChat;
    popupHeader.appendChild(popupTitle);
    popupHeader.appendChild(closeButton);
    const chatMessages = document.createElement("div");
    chatMessages.classList.add("agent-popup-content");
    chatMessages.setAttribute("id", "chatMessages");
    const chatInput = document.createElement("div");
    chatInput.classList.add("agent-chat-input");
    const messageInput = document.createElement("input");
    messageInput.classList.add("agent-input");
    messageInput.setAttribute("id", "messageInput");
    messageInput.setAttribute("type", "text");
    messageInput.placeholder = "Type your message...";
    messageInput.addEventListener("keydown", agentHandleKeyPress);
    const sendButton = document.createElement("a");
    sendButton.classList.add("agen-btn-send");
    sendButton.setAttribute("id", "sendButton");
    sendButton.textContent = "Send";
    sendButton.onclick = clientSendToAgent;
    chatInput.appendChild(messageInput);
    chatInput.appendChild(sendButton);
    chatPopup.appendChild(popupHeader);
    chatPopup.appendChild(chatMessages);
    chatPopup.appendChild(chatInput);
    document.body.appendChild(chatButton);
    document.body.appendChild(chatPopup);

    displayMessageAgent(
      "Hi, What kind of help are you looking for today?",
      "bot"
    );
    displaySuggestFromAgent("IT Support telephone number?", "suggest-1");
    displaySuggestFromAgent("Where's the company calendar?", "suggest-2");
  },
};
let srcAgentImg = "";
function agentOpenChat() {
  chatPopup.classList.add("show");
  chatButton.style.display = "none";
  const messageInput = document.getElementById("messageInput");
  messageInput.focus();
}

function agentCloseChat() {
  chatPopup.classList.remove("show");
  chatButton.style.display = "flex";
}

function agentHandleKeyPress(event) {
  if (event.key === "Enter") {
    clientSendToAgent();
  }
}

async function searcher(message) {
  try {
    let data = {
      intent: "",
      message: message,
      context: "",
    };
    const response = await fetch("https://example/api/agent/searcher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      displayMessageAgent("Unable to connect web services", "bot");
      throw new Error("Failed to send data");
    }
    const responseData = await response.json();
    console.log("responseData.Answers[0].Answers", responseData);
    for (const singleResponse of responseData.Answers) {
      displayMessageAgent(singleResponse.Response, "bot");
    }
    return responseData.Message;
  } catch (error) {
    displayMessageAgent("Unable to connect web services", "bot");
    console.error("Error:", error);
    throw error;
  }
}

function clientSendToAgent() {
  const messageInput = document.getElementById("messageInput");
  const message = messageInput.value.trim();
  if (message !== "") {
    displayMessageAgent(message, "user");
    messageInput.value = "";
    setTimeout(() => {
      searcher(message);
    }, 1000);
  }
}

function RecommendQuestion(message) {
  if (message !== "") {
    messageInput.value = "";
    setTimeout(() => {
      searcher(message);
    }, 200);
  }
}

function displaySuggestFromAgent(message, elementId) {
  const chatMessages = document.getElementById("chatMessages");
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("agent-message-container");
  const messageElement = document.createElement("div");
  messageElement.setAttribute("id", elementId);
  messageElement.classList.add("agent-message");
  messageElement.innerText = message;
  messageElement.style.backgroundColor = "#F6F5F2";
  messageElement.classList.add("agent-message-bot-suggest");
  messageElement.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.1)";
  messageElement.onclick = function () {
    RecommendQuestion(this.innerText);
  };
  messageContainer.appendChild(messageElement);
  chatMessages.appendChild(messageContainer);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function displayMessageAgent(message, sender) {
  const chatMessages = document.getElementById("chatMessages");
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("agent-message-container");
  const messageElement = document.createElement("div");
  messageElement.classList.add("agent-message");
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = message.split(urlRegex);
  for (let i = 0; i < parts.length; i++) {
    if (urlRegex.test(parts[i])) {
      const linkElement = document.createElement("a");
      linkElement.href = parts[i];
      linkElement.target = "_blank";
      linkElement.textContent = parts[i];
      messageElement.appendChild(linkElement);
    } else {
      const textElement = document.createElement("span");
      textElement.textContent = parts[i];
      messageElement.appendChild(textElement);
    }
  }
  if (sender === "bot") {
    const profilePicElement = document.createElement("div");
    profilePicElement.classList.add("agent-profile-pic-small");
    const profilePic = document.createElement("img");
    if (srcAgentImg !== "") profilePic.src = srcAgentImg;
    profilePicElement.appendChild(profilePic);
    messageContainer.appendChild(profilePicElement);
    messageElement.style.backgroundColor = "#F6F5F2";
    messageElement.classList.add("agent-message-bot");
  } else {
    messageElement.classList.add("agent-message-user");
  }
  messageElement.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.1)";
  messageContainer.appendChild(messageElement);
  chatMessages.appendChild(messageContainer);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
