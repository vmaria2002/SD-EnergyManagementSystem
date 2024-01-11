import React from "react";
import { Link } from "react-router-dom";
import '../style/Unauthorized.css';

export default function Unauthorized() {
    setTimeout(() => {
        window.location.reload();
    }, 2000);
    return (
        <div className="unauthorized-container">
            <header>
                <h1>Acces Unauthorized</h1>

            </header>

            <main>
                <section className="button-section">
                    <Link to="/" className="button">
                         Home
                    </Link>
                    <Link to="/register" className="button">
                        Register
                    </Link>
                    <Link to="/login" className="button">
                        Login
                    </Link>
                </section>

                <section className="image-section">
                    <img src="https://cyberhoot.com/wp-content/uploads/2019/12/access_denied.png" alt = "" />
                </section>
            </main>
        </div>
    );
}
