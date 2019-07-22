import React from 'react';
import styles from './App.module.css';

function Footer() {
    return(
        <div className={styles.footer}>
            <div className="container">                                    
                <div className="row justify-content-center">             
                    <div className="col-auto">
                        <p>© Copyright 2019 Edgar Jeong, 42 Silicon Valley</p>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Footer;