import React from 'react';
import Typography from '@material-ui/core/Typography/Typography';

import styles from './Header.module.css';
import logo from '../../img/virus_logo.png';


const Header: React.FC = () => {
    return <div className={styles.container}>
        <Typography component='h1' variant='h2'>COVID-19</Typography>
        <img className={styles.img} src={logo} alt="COVID-19" />
    </div>;
};

export default Header;