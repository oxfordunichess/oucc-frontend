const regexes = {
	space: /\s+/g,
	letters: /\w+/g,
	image: /<img\s+.*?src=["'](.*).*?">/,
	date: /^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}_/
};

export default regexes;