"use strict";

const inputBoxWithLabel = ({
	type,
	placeholder = "",
	name,
	id,
	label,
	pattern,
	title,
	customClasses,
}) => {
	const labelElement = document.createElement("label");
	labelElement.innerText = label;
	labelElement.htmlFor = id;

	const inputElement = document.createElement("input");
	inputElement.type = type;
	inputElement.placeholder = placeholder;
	inputElement.name = name;
	inputElement.id = id;
	inputElement.title = title;

	if (pattern) inputElement.setAttribute("data-pattern", pattern);

	if (customClasses) inputElement.classList.add(...customClasses);

	const divElement = document.createElement("div");
	divElement.classList.add("inputBox");
	divElement.append(labelElement);
	divElement.append(inputElement);

	return divElement;
};

const createForm = () => {
	const firstNameInputBox = inputBoxWithLabel({
		type: "text",
		placeholder: "Enter your first name",
		name: "firstName",
		id: "first-name",
		label: "First Name",
		pattern: "^[a-zA-Z]{3,}",
		title: "First name must have 3 letters and should not contain numbers",
	});

	const lastNameInputBox = inputBoxWithLabel({
		type: "text",
		placeholder: "Enter your last name",
		name: "lastName",
		id: "last-name",
		label: "Last Name",
		pattern: "^[a-zA-Z]{3,}",
		title: "Last name must have be 3 letters and should not contain numbers",
	});

	const nameInputDivElement = document.createElement("div");
	nameInputDivElement.classList.add("flex", "flex-row");
	nameInputDivElement.style = "gap: 1rem";
	nameInputDivElement.append(firstNameInputBox, lastNameInputBox);

	const emailInputBox = inputBoxWithLabel({
		type: "text",
		placeholder: "abc@xyz.com",
		name: "email",
		id: "email",
		label: "Email",
		pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
		title: "Email must be format abc@xyz.com",
	});

	const panInputBox = inputBoxWithLabel({
		type: "text",
		placeholder: "Enter your Pan Number",
		name: "pan",
		id: "pan",
		label: "Pan",
		pattern: "^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$",
		title: "Pan number must be of format XXXXXX-0000-X",
		customClasses: ["input-uppercase"],
	});

	const phoneInputBox = inputBoxWithLabel({
		type: "text",
		placeholder: "Enter your phone number",
		name: "phone",
		id: "phone-number",
		label: "Phone Number",
		pattern: "^[0-9]{10}$",
		title: "Phone number must be of 10 numbers",
	});

	const dateInputBox = inputBoxWithLabel({
		type: "date",
		name: "dob",
		id: "date-of-birth",
		label: "Date of Birth",
		title: "Date of birth should be smaller than current date",
	});

	const creditCardInputBox = inputBoxWithLabel({
		type: "text",
		placeholder: "Enter your card number",
		name: "cardNumber",
		id: "card-number",
		label: "Card Details",
		pattern: "^[a-zA-Z0-9]{16}$",
		title: "Credit Card number must of 16 characters",
		customClasses: ["input-uppercase"],
	});

	return [
		nameInputDivElement,
		emailInputBox,
		panInputBox,
		phoneInputBox,
		dateInputBox,
		creditCardInputBox,
	];
};

const checkValidation = (formElements) => {};

const setErrorOnInputBox = (errorMsg, inputBox) => {
	if (
		inputBox.children[2] &&
		inputBox.children[2].tagName === "P" &&
		inputBox.children[2].innerText === errorMsg
	) {
		return;
	} else if (
		inputBox.children[2] &&
		inputBox.children[2].tagName === "P" &&
		inputBox.children[2].innerText !== errorMsg
	) {
		inputBox.children[2].innerText = errorMsg;
		return;
	}
	const errorElement = document.createElement("p");
	errorElement.innerText = errorMsg;
	errorElement.classList.add("err-msg");

	inputBox.append(errorElement);
	const formInputElement = inputBox.children[1];
	formInputElement.classList.add("err-input");
};

const removeErrorOnInputBox = (inputBox) => {
	if (!inputBox.children[2] || inputBox.children[2].tagName !== "P") {
		return;
	}

	inputBox.children[2].remove();
	inputBox.children[1].classList.remove("err-input");
};

const constructForm = () => {
	const root = document.getElementById("form");

	const lineElement = document.createElement("div");
	lineElement.classList.add("line");
	root.append(lineElement);

	const formElements = createForm();
	root.append(...formElements);

	const submitButton = document.createElement("button");
	submitButton.innerText = "Submit";
	submitButton.type = "submit";

	submitButton.addEventListener("click", function (e) {
		e.preventDefault();

		document.querySelectorAll(".inputBox").forEach((item) => {
			const formInputElement = item.children[1];
			const value = formInputElement.value;
			const regex = new RegExp(formInputElement.getAttribute("data-pattern"));

			if (value === "") {
				setErrorOnInputBox("Required field", item);
			} else if (!regex.test(value) && formInputElement.getAttribute("data-pattern")) {
				setErrorOnInputBox(formInputElement.title, item);
			} else {
				removeErrorOnInputBox(item);
			}
			// if (checkxValidation(formElements)) console.log("Submit");
		});
	});

	root.append(submitButton);
};

constructForm();
