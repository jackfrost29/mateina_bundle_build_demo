function Footer() {
    return (
        <div className="footer">
            <div className="footer__section footer__section__newslater">
                <p className="title-font-obv">JOIN OUR FAMILIA!</p>
                <p>Subscribe to our newsletter for product updates and exclusive deals.</p>
                <form>Subscribe</form>
            </div>
            <div className="footer__section footer__section__block-shop">
                <p className="title-font-obv">SHOP</p>
                <ul>
                    <li>Products</li>
                    <li>DIscover</li>
                    <li>Build Your Bundle</li>
                </ul>
            </div>
            <div className="footer__section footer__section__block-about">
                <p className="title-font-obv">ABOUT</p>
                <ul>
                    <li>Store Locator</li>
                    <li>FAQ</li>
                    <li>Newsletter</li>
                    <li>Manage Subscription</li>
                    <li>Shipping & Returns</li>
                    <li>Privacy Policy</li>
                    <li>Terms of Service</li>
                    <li>Affiliate Program </li>
                </ul>
            </div>
            <div className="footer__section footer__section__socials">
                <a href="https://www.facebook.com/mateina/"><img className="footer-icons" src="./icons/socials/facebook.svg" /></a>
                <a href="https://www.instagram.com/mateina/"><img className="footer-icons" src="./icons/socials/instagram.svg" /></a>
                <a href="https://www.tiktok.com/@yerbamateina"><img className="footer-icons" src="./icons/socials/tiktok.svg" /></a>
                <a href="https://www.youtube.com/channel/UCdr8xgguaQOx1MlppJB6enQ?view_as=subscriber"><img className="footer-icons" src="./icons/socials/youtube.svg" /></a>
                <a href="info@mateina.ca"><img className="footer-icons" src="./icons/socials/mail.svg" /></a>
            </div>
            <p className="footer__section footer__section-copyright">© 2024, Mateina.</p>
        </div>
    );
}

export default Footer;