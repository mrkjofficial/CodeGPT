import AddIcon from "@mui/icons-material/Add";
import ChatMessage from "./components/ChatMessage";
import { useState } from "react";
import "./App.css";

function App() {
	const [input, setInput] = useState("");
	const [chatLog, setChatLog] = useState([]);
	async function handleSubmit(e) {
		e.preventDefault();
		let chatLogNew = [...chatLog, { usr: "usr", msg: `${input}` }];
		const messages = input;
		setInput("");
		setChatLog(chatLogNew);
		const response = await fetch("http://localhost:5000", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				message: messages,
			}),
		});
		const data = await response.json();
		console.log(data.message);
		setChatLog([...chatLogNew, { usr: "bot", msg: `${data.message}` }]);
	}
	return (
		<div className="app">
			<aside className="side-menu">
				<div className="side-menu-button">
					<span>
						<AddIcon />
					</span>
					New Chat
				</div>
			</aside>
			<section className="chatbox">
				<div className="chat-log">
					{chatLog.map((message, index) => (
						<ChatMessage key={index} message={message} />
					))}
				</div>
				<div className="chat-input-box">
					<form onSubmit={handleSubmit}>
						<input
							className="chat-input"
							onChange={(e) => setInput(e.target.value)}
							type="text"
							value={input}
						/>
					</form>
				</div>
			</section>
		</div>
	);
}

export default App;
