const fileSystem = require("fs");

const readFilePromisified = (pathString) => {
	const executor = (resolve, reject) => {
		fileSystem.readFile(pathString, "utf-8", (error, data) => {
			if (error) {
				console.log(error);
				reject(error);
			}
			resolve(data);
		});
	};
	return new Promise(executor);
};

const replaceTemplateContent = (template, content) => {
	let output = template;
	for (const [key, value] of Object.entries(content)) {
		const searchRegExp = new RegExp(`{{DATA_${key.toUpperCase()}}}`, "g");
		output = output.replace(searchRegExp, value);
	}
	return output;
};

const getContentFromElements = (elements, template) => {
	return elements
		.map((element) => replaceTemplateContent(template, element))
		.join("\r");
};

module.exports = {
	readFilePromisified,
	replaceTemplateContent,
	getContentFromElements
};
