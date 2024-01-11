// UserExist.js
import React from "react";
import { Link } from "react-router-dom";
import '../style/UserExist.css';

export default function TemplateExist({ imageUrl, msg }) {

    return (
        <div>
            <div className="error-container">
                <div className="error-message">
                    <p>
                        {msg}
                    </p>
                </div>
                <div className="error-image">
                    <img src={imageUrl} alt="Imagine eroare" />
                </div>
                <div className="error-buttons">
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
                </div>
            </div>
        </div>
    );
}
