import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
	const [isOpen, setIsOpen] = useState([]);
	const [fileContents, setFileContents] = useState([]);

	const privacyPolicyItems = [
		{
			title: "이용 약관",
			fileIndex: 1,
		},
		{
			title: "신용 정보 이용",
			fileIndex: 2,
		},
		{
			title: "위치 정보 이용",
			fileIndex: 3,
		},
		// Add more privacy policy items as needed
	];

	useEffect(() => {
		const fetchTextFile = async (index) => {
			try {
				var url = "/privacy/public/" + index + ".txt";
				const response = await fetch(url);
				console.log(response);
				const text = await response.text();

				const updatedContents = [...fileContents];
				updatedContents[index] = text;
				setFileContents(updatedContents);
			} catch (error) {
				console.error(`Error fetching text file ${index}:`, error);
			}
		};

		setIsOpen(Array(privacyPolicyItems.length).fill(false));
		setFileContents(Array(privacyPolicyItems.length).fill(""));

		privacyPolicyItems.forEach((_, index) => {
			fetchTextFile(index);
		});
	}, []);

	const toggleList = (index) => {
		const updatedIsOpen = [...isOpen];
		updatedIsOpen[index] = !updatedIsOpen[index];
		setIsOpen(updatedIsOpen);
	};

	return (
		<div>
			<h2>어깨동무 개인정보처리방침</h2>
			{privacyPolicyItems.map((item, index) => (
				<div key={index}>
					<button onClick={() => toggleList(index)}>
						{isOpen[index]
							? `${item.title} 보기`
							: `${item.title} 보기`}
					</button>
					{isOpen[index] && <pre>{fileContents[item.fileIndex]}</pre>}
				</div>
			))}
		</div>
	);
}
export default App;

