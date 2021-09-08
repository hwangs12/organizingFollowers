const paginate = (data) => {
	const page = Math.ceil(data.length / 10);
	const pageDivider = {};
	for (let i = 0; i < page; i++) {
		pageDivider[i] = data.slice(i * 10, (i + 1) * 10);
	}

	return pageDivider;
};

export default paginate;
