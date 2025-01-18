import React from 'react';

function footer() {
    return (
        <footer>
            <section className="footer-primary">
                <div className="footer-group">
                    <span className="footer-item-title">refresh space</span>
                    <form action="" className="send-message">
                        <p>Abonează-te la noutățile Refresh Space pentru a primi notificări despre produsele noi, oferte
                            și
                            reduceri.</p>
                        <div className="form-group">
                            <input type="email" name="email" placeholder="E-mail" required/>
                            <button type="submit">
                                <img src="../sources/arrow-right-button.png" alt="arrow-right"/>
                            </button>
                        </div>
                        <label>
                            <input type="checkbox" required/>
                            Accept termenii Politicii de Confidențialitate
                        </label>
                    </form>
                </div>
                <div className="footer-group footer-group-catalog">
            <span className="footer-item-title">
                Catalog
            </span>
                    <span className="footer-item catalog-link" data-id="1">
                Îngrijirea pielii
            </span>
                    <span className="footer-item catalog-link" data-id="3">
                Păr & Corp
            </span>
                    <span className="footer-item catalog-link" data-id="2">
                Cosmetică
            </span>
                </div>
                <div className="footer-group">
            <span className="footer-item-title">
                Suport
            </span>
                    <span className="footer-item">
                Plată & Livrare
            </span>
                    <span className="footer-item">
                Returnare
            </span>
                    <span className="footer-item">
                Cooperare
            </span>
                    <span className="footer-item">
                Întrebări frecvente
            </span>
                </div>
                <div className="footer-group">
            <span className="footer-item-title">
                Suplimentar
            </span>
                    <a href="../about.html" className="footer-item">
                        Despre Noi
                    </a>
                    <a href="../blog.html" className="footer-item">
                        Blog
                    </a>
                    <span className="footer-item">
                Oferte publice
            </span>
                </div>
                <div className="footer-group">
            <span className="footer-item-title">
                Adrese
            </span>
                    <span className="footer-item">
                str. Lera 26, Lvov, LeraLand
            </span>
                    <span className="footer-item">
                Luni - Vineri
            </span>
                    <span className="footer-item gray main-gray">
                 09:00 AM - 09:00 PM
            </span>
                    <span className="footer-item gray">
                +373 76 783 043
            </span>
                    <span className="footer-item gray main-gray">
                lera.questions@lera.com
            </span>
                </div>
            </section>
            <section className="footer-secondary">
                <span className="footer-item-title secondary-title">&#169; 2024 REFRESH SPACE</span>
                <span className="footer-item-title secondary-title">Politica de Condidențialitate</span>
                <span className="footer-item-title secondary-title">Politica de Cookies</span>
                <span className="footer-item-title secondary-title">Termeni și Condiții</span>
                <span className="footer-item-title secondary-title">Politici corporative</span>
                <span className="footer-item-title secondary-title">Toate Drepturile Sunt Rezervate</span>
            </section>
            <div className="fake-mobile-footer"></div>
            <section className="mobile-footer">
                <a href="../home.html">
                    <img src="../sources/mobile-home-active.png" alt=""/>
                </a>
                <a href="../catalog.html">
                    <img src="../sources/mobile-catalog.png" alt=""/>
                </a>
                <a href="../bag.html">
                    <img src="../sources/mobile-cart.png" alt=""/>
                </a>
                <a href="#">
                    <img src="../sources/mobile-favorites.png" alt=""/>
                </a>
                <a href="../log-in.html">
                    <img src="../sources/mobile-account.png" alt=""/>
                </a>
            </section>
        </footer>
    );
}

export default footer;
