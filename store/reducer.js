import storage from '../util/storage.js';

const init = {
	todos: storage.get(),
	filter: 'all',
	filters: {
		all: () => true,
		active: (todo) => !todo.completed,
		completed: (todo) => todo.completed,
	},
	editIndex: null,
};

const actions = {
	add({ todos }, value) {
		if (value) {
			todos.push({ title: value, completed: false });
			storage.set(todos);
		}
	},
	toggle({ todos }, index) {
		const todo = todos[index];
		todo.completed = !todo.completed;
		storage.set(todos);
	},
	toggleAll({ todos }, checkToggleAll) {
		todos.forEach((todo) => (todo.completed = checkToggleAll));
		storage.set(todos);
	},
	destroy({ todos }, index) {
		todos.splice(index, 1);
		storage.set(todos);
	},
	switchFilter(state, type) {
		state.filter = type;
	},
	clearCompleted(state) {
		state.todos = state.todos.filter(state.filters.active);
		storage.set(state.todos);
	},
	startEdit(state, index) {
		state.editIndex = index;
	},
	endEdit(state, newTitle) {
		if (state.editIndex !== null) {
			if (newTitle) {
				state.todos[state.editIndex].title = newTitle;
				storage.set(state.todos);
			} else {
				this.destroy(state, state.editIndex);
			}
			state.editIndex = null;
		}
	},
	cancelEdit(state) {
		state.editIndex = null;
	},
};

export default function reducer(state = init, action, values) {
	actions[action] && actions[action](state, ...values);
	return state;
}
