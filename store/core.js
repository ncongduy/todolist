export default function html([first, ...strings], ...values) {
	return values
		.reduce((acc, value) => acc.concat(value, strings.shift()), [first])
		.filter((x) => (x && x !== true) || x === 0)
		.join('');
}

export function createStore(reducer) {
	let state = reducer();
	const roots = new Map();

	function render() {
		for (const [component, root] of roots) {
			const output = component();
			root.innerHTML = output;
		}
	}

	return {
		attach(component, root) {
			roots.set(component, root);
			render();
		},
		connect(selector = (state) => state) {
			return (component) =>
				(props, ...args) =>
					component(
						Object.assign({}, props, selector(state), ...args)
					);
		},
		dispatch(action, ...values) {
			state = reducer(state, action, values);
			render();
		},
	};
}
