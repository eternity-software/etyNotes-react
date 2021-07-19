import "./Image.scss";

export const Image = props => {
	// Предотвращение перетаскивания изображений
	const onDragStart = event => {
		if(!props.drag) event.preventDefault();
	}

	return (
		<img {...props} onDragStart={onDragStart} />
	);
}