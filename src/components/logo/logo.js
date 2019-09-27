import React from 'react';

import appinessLogo from '../../assets/images/Scale-up-logo_Final.png';
import  './Logo.css';

const logo = (props) => (
    <div className="Logo" >
        <img src={appinessLogo} alt="appiness" />
    </div>
);

export default logo;