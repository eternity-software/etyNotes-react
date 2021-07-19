import "./Layout.scss";

export const Layout = props => {
	const cls = ["Layout"];
	if(props.className) cls.push(props.className);

	return (
		<div className={cls.join(" ")}>
			{props.children}
		</div>
	);
}