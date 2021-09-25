export default function logger(reducer) {
	return (preState, action, values) => {
		console.group(action);
        console.log('Previous state: ', preState);
        console.log('Action values: ', values);

		const nextState = reducer(preState, action, values);
        console.log('Next state: ', nextState);

		console.groupEnd();
		return nextState;
	};
}
