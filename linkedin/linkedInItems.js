var linkedInItems = {
	name: "Full Name Here" // NOT NULL
	headshot: "http://www.example.com/image.png", // NOT NULL
	company: "Company Name", // POSSIBLY NULL
	title: "Job Title", // POSSIBLY NULL
	postTitle: "Title Goes Here", // POSSIBLY NULL
	postUrl: "http://www.linkedin/article/link", // POSSIBLY NULL
	sharedConnections: [
		{ name: "Full Name 1", headshot: "http://www.example.com/image1.png", url: "http://www.linedin/in/profileName1" },
		{ name: "Full Name 2", headshot: "http://www.example.com/image2.png", url: "http://www.linedin/in/profileName2" },		
		{ name: "Full Name 3", headshot: "http://www.example.com/image3.png", url: "http://www.linedin/in/profileName3" }
	]  // POSSIBLY AN EMPTY ARRAY
}

module.exports = linkedInItems;