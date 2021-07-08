import React, { useState, useEffect, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import "./app.css";

function NewApp() {
	const [state, setState] = useState({
		who: "",
		what: "",
		characters: [
			{
				id: 1,
				who: "Dude",
				what: "Noting",
				cool: 13,
			},
		],
	});

	const linkRef = useRef(null);

	useEffect(() => {
		fetch("https://api.myjson.com/bins/zg7ze")
			.then((res) => res.json())
			.then((json) => this.setState({ characters: json }));
	}, []);

	const handleWho = (e) => {
		setState({
			...state,
			who: e.target.value,
		});
	};

	/**
	 * SAVE NEW WAT
	 */
	const handleWat = (e) => {
		setState({
			...state,
			what: e.target.value,
		});
	};

	/**
	 * UPDATE COOL
	 */
	const handleCool = (dude, e) => {
		const cool = +e.target.value;

		setState((state) => {
			return {
				...state,
				characters: state.characters.map((char) =>
					char === dude ? { ...dude, cool } : char
				),
			};
		});
	};

	/**
	 * REMOVE DUDE
	 */
	const removeDude = (dude) => {
		setState((state) => {
			return {
				...state,
				characters: state.characters.filter((item) => item !== dude),
			};
		});
	};

	/**
	 * RESET FORM
	 */
	const resetForm = () => {
		setState({
			...state,
			who: "",
			what: "",
		});

		linkRef.current.focus();
	};

	/**
	 * ADD NEW DUDE
	 */
	const handleSubmit = (event) => {
		if (event.key === "Enter" && state.who && state.what) {
			const newDude = {
				id: Math.max(...state.characters.map((d) => d.id)) + 1,
				who: state.who,
				what: state.what,
				cool: 15,
			};

			setState((prevState) => ({
				...prevState,
				characters: prevState.characters.push(newDude),
			}));
			console.log(state);

			resetForm();
		}
	};

	return (
		<div>
			<TransitionGroup component="ul">
				{!!state.characters &&
					state.characters.map((char) => (
						<CSSTransition key={char.id} timeout={200} classNames="dude">
							<li key={char.id} className="dude">
								<a className="ctrl" onClick={() => removeDude(char)}>
									x
								</a>

								<article
									className={
										char.cool < 10 ? "faded" : char.cool > 50 ? "gold" : ""
									}
								>
									{char.who}
									<span>{char.what}</span>
								</article>

								<input
									className="ctrl"
									type="number"
									value={char.cool}
									onChange={(e) => handleCool(char, e)}
								/>
							</li>
						</CSSTransition>
					))}
			</TransitionGroup>

			<form className="add-new" onKeyPress={handleSubmit}>
				<input
					autoFocus
					type="text"
					ref={linkRef}
					value={state.who}
					onChange={handleWho}
				/>

				<input type="text" value={state.what} onChange={(e) => handleWat(e)} />
			</form>

			<p className="preview">
				{state.who}
				<br />
				<small>{state.what}</small>
			</p>
		</div>
	);
}

export default NewApp;
