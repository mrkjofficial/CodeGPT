const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(cors());

const configuration = new Configuration({
	organization: process.env.OPENAI_ORGANIZATION,
	apiKey: process.env.OPENAI_API_KEY,
});

const port = process.env.PORT;

const openai = new OpenAIApi(configuration);

app.post("/", async (req, res) => {
	const {message} = req.body;
	console.log(message);
	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: `${message}`,
		max_tokens: 100,
		temperature: 0.5,
	});
	console.log(response);
	res.json({
		message: response.data.choices[0].text,
	});
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
