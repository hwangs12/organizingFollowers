import React, { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import Follower from "./Follower";
function App() {
	const [page, setPage] = useState(0);
	const [dataPage, setDataPage] = useState([]);

	const { loading, data } = useFetch();

	useEffect(() => {
		if (loading) return;
		setDataPage(data[page]);
	}, [loading, data, page]);

	const handleClick = (e, id) => {
		const clickedButton = e.target.innerHTML;
		if (id !== null) {
			const idAsNum = parseInt(id);
			setPage(idAsNum);
		}
		if (clickedButton === "next") {
			setPage((page) => (page + 1) % 10);
		}
		if (clickedButton === "prev") {
			setPage((page) => (page === 0 ? 9 : page - 1));
		}
		// if (parseInt(clickedButton) === parseInt(buttonPage) + 1) {
		// 	setPage(parseInt(clickedButton));
		// }
	};

	return (
		<main>
			<div className="section-title">
				<h1>{(loading && "loading...") || "pagination"}</h1>
				<div className="underline"></div>
			</div>
			<section className="followers">
				<div className="container">
					{dataPage.map((item) => {
						return <Follower key={item.id} {...item} />;
					})}
				</div>
				{loading || (
					<div className="btn-container">
						<button
							className="prev-btn"
							onClick={(e) => handleClick(e, null)}
						>
							prev
						</button>

						{Object.keys(data).map((buttonPage) => {
							if (parseInt(buttonPage) === page) {
								return (
									<button
										key={buttonPage}
										className="page-btn active-btn"
										onClick={(e) =>
											handleClick(e, buttonPage)
										}
									>
										{parseInt(buttonPage) + 1}
									</button>
								);
							}
							return (
								<button
									key={buttonPage}
									className="page-btn null"
									onClick={(e) => handleClick(e, buttonPage)}
								>
									{parseInt(buttonPage) + 1}
								</button>
							);
						})}
						<button
							className="next-btn"
							onClick={(e) => handleClick(e, null)}
						>
							next
						</button>
					</div>
				)}
			</section>
		</main>
	);
}

export default App;
