import html from '../store/core.js';
import { connect } from '../store/store.js';

function Footer({ todos, filter, filters }) {
	return html` <footer class="footer">
		<span class="todo-count">
			<strong>
				${todos.filter((todo) => filters.active(todo)).length} </strong
			>item left
		</span>
		<ul class="filters">
			${Object.keys(filters).map(
				(type) => html`
					<li onclick="dispatch('switchFilter', '${type}')">
						<a class="${type === filter && 'selected'}" href="#">
							${type[0].toUpperCase() + type.slice(1)}
						</a>
					</li>
				`
			)}
		</ul>
		${todos.filter((todo) => filters.completed(todo)).length > 0 &&
		html`<button
			class="clear-completed"
			onclick="dispatch('clearCompleted')">
				Clear completed
			</button>`}
	</footer>`;
}

export default connect()(Footer);
