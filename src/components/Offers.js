function Offers(){
    return (
        <div className="offers">
            <img className="offers__section offers__section__left__image" src="./offers_image_left.jpg"/>
            <div className="offers__section offers__section__right__in-details">
                <h1 style={{font: "obviously-narrow", fontSize: "2em"}}>Keep Your Mateina Flowing & Save</h1>
                <p>Subscribe to your custom bundle and:</p>
                <ul>
                    <li>
                        <p>&#x2714;&emsp;Enjoy up to 20% Off + Free Shipping!</p>
                     </li>
                     <li>
                        <p>&#x2714;&emsp;Exclusive Early Tastes of New Flavors</p>
                     </li>
                     <li>
                        <p>&#x2714;&emsp;Flexibility to Pause, Skip, or Cancel Anytime</p>
                     </li>
                </ul>
            </div>

        </div>
    );
}

export default Offers;