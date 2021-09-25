import html from '../store/core.js';

function TodoItem(value, index, editIndex) {
	return html` <li
		class="${value.completed && 'completed'} 
        ${editIndex === index && 'editing'}"
	>
		<div class="view">
			<input
				class="toggle"
				type="checkbox"
				${value.completed && 'checked'}
				onchange="dispatch('toggle', ${index})"
			/>
			<label ondblclick="dispatch('startEdit', ${index})"
				>${value.title}</label
			>
			<button
				class="destroy"
				onclick="dispatch('destroy', ${index})"
			></button>
		</div>
		<input
			class="edit"
			value="${value.title}"
			onkeyup="event.keyCode === 13 && 
            dispatch('endEdit', this.value.trim())
            || event.keyCode === 27 && dispatch('cancelEdit')"
            onblur="dispatch('endEdit', this.value.trim())"
		/>
	</li>`;
}

export default TodoItem;
