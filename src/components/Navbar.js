function Navbar() {
    return (
        <div className="navbar">
            <nav className="navbar__section navbar__section__left">
                <ul>
                    <li>
                        <span>Shop</span>
                        <i className="arrow down"></i>
                    </li>
                    <li>
                        <span>Shop</span>
                        <i className="arrow down"></i>
                    </li>
                    <li><span>Build Your Bundle</span></li>
                </ul>
            </nav>
            <a className="navbar__section" href="https://mateina.ca"><img src="./LOGO_MATEINA_V2.png" alt="company logo" style={{ margin: "10px" }} /></a>
            <div className="navbar__section navbar__section__right">
                <img className="icon-image" src="./flags/canada.svg" />
                <span className="icon-image" style={{marginLeft:"0px",marginRight:"0px",marginTop:"30px"}}><i className="arrow down"></i></span>
                <img className="navbar__section__icon" src="./icons/location.svg" />
                <img className="navbar__section__icon" src="./icons/user.svg" />
                <img className="navbar__section__icon" src="./icons/search.svg" />
                <img className="navbar__section__icon" src="./icons/cart.svg" />
                <div className="navbar__section__icon navbar__section-country">FR</div>

            </div>
        </div>
    );
}

export default Navbar;

