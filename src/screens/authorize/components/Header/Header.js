import "./Header.scss";
import {Image} from "../../../../components";
import {Link} from "react-router-dom";

const Header = props => {
	return (
		<header className="Header">
			<div className="container">
				<Link to="/"><Image src="/img/white-logo.png" alt="logotype" /></Link>
			</div>
		</header>
	);
}

export default Header;