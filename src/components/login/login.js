// import axios from "axios";
import Button from "react-bootstrap/Button";
import "./styles.css";
const CLIENT_ID = "lw0v5u35m9g8elt19v0esa6rbo8wx8";
const REDIRECT_URI = "http://localhost:3000/chat?";

const login = () => {
  const url = `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=chat%3Aread+chat%3Aedit`;
  window.location.href = url;
};

function LoginPage() {
  return (
    <div className='container'>
      <div className='button-container'>
        <Button onClick={login}>Log in with Twitch</Button>
      </div>
    </div>
  );
}

export default LoginPage;
