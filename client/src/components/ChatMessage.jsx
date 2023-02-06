import AI from "../assets/ai.png";
import User from "../assets/user.png";
import "../App.css";

const ChatMessage = ({ message }) => {
	return (
		<div className={`chat-message ${message.usr}`}>
			<div className="chat-message-body">
				<div className={`avatar ${message.usr}`}>
					<img alt="AI" height="30px" src={message.usr === "usr" ? User : AI} width="30px" />
				</div>
				<div className="message">{message.msg}</div>
			</div>
		</div>
	);
};

export default ChatMessage;
