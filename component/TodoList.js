import html from '../store/core.js';
import { connect } from '../store/store.js';
import TodoItem from './TodoItem.js';

function TodoList({ todos, filter, filters, editIndex }) {
	return html` <section class="main">
		<input
			id="toggle-all"
			class="toggle-all"
			type="checkbox"
			onchange="dispatch('toggleAll', this.checked)"
			${todos.every((todo) => filters.completed(todo)) && 'checked'}
		/>
		<label for="toggle-all">Mark all as complete</label>
		<ul class="todo-list">
			${todos
				.filter(todo => filters[filter](todo))
				.map((value, index) => TodoItem(value, index, editIndex))}
		</ul>
	</section>`;
}

export default connect()(TodoList);
