import Card from "react-bootstrap/Card";
import { useState, useEffect, useCallback } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

function LoginPage() {
  const [authToken, setAauthToken] = useState(null);
  const [socketUrl, setSocketUrl] = useState("ws://irc-ws.chat.twitch.tv:80");
  const [messageHistory, setMessageHistory] = useState([]);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(() => {
    if (window.location.href.includes("#"))
      window.location.href = window.location.href.replace("#", "");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get("access_token");
    setAauthToken(token);
  }, []);

  useEffect(() => {
    if (readyState === 1) {
      sendMessage(
        "CAP REQ :twitch.tv/membership twitch.tv/tags twitch.tv/commands"
      );
      sendMessage(`PASS oauth:${authToken}`);
      sendMessage("NICK hrpfuk");
      sendMessage("JOIN #hrpfuk");
    }
  }, [readyState, authToken, sendMessage]);

  useEffect(() => {
    let messageContents = {
      message: "",
      user: "",
    };

    if (lastMessage && lastMessage.data.includes("PRIVMSG")) {
      messageContents = {
        user: lastMessage.data
          .split(";")
          .filter((key) => {
            if (key.includes("display-name")) {
              return key.split("=")[1];
            }
          })[0]
          .split("=")[1],
        message: lastMessage.data.split("PRIVMSG")[1].split(":")[1],
      };
    }
    if (messageContents.user && messageContents.message) {
      setMessageHistory((prev) => prev.concat([messageContents]));
    }
  }, [lastMessage, setMessageHistory]);

  return (
    <>
      <div>
        <ul>
          {messageHistory.map((message, idx) => (
            <Card style={{ width: "18rem" }} key={idx}>
              <Card.Body>
                <Card.Subtitle>
                  {message.user ? message.user : null}
                </Card.Subtitle>
                <Card.Text>
                  {message.message ? message.message : null}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </ul>
      </div>
    </>
  );
}

export default LoginPage;
