import React from 'react';
import Image from 'next/image';
import styles from './card.module.css';
// import Pattern1 from './pattern1';

function CardDeck({title="title",value="12.000",unit="unit",primaryFill,secondaryFill}) {
  return (
    <div className={styles.cardContainer} style={{background:primaryFill}}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.valueGroup}>
            <p className={styles.value}>{value}</p>
            <p className={styles.unit}>{unit}</p>
        </div>
        <div className={styles.pattern1}>
            <svg width="49" height="41" viewBox="0 0 49 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M48.3714 0C47.7591 6.90961 44.0071 26.3399 28.5501 35.1535C13.5533 43.7046 3.6738 40.7638 2.85428e-05 38L2.76704e-05 19.9823C0.00956388 8.94477 8.96022 6.22092e-06 20 4.47833e-06L48.3714 0Z" fill={secondaryFill}/>
            </svg>
        </div>
        <div className={styles.pattern2}>
            <svg width="59" height="77" viewBox="0 0 59 77" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M59 -0.00012207V57C59 68.0253 50.0788 76.967 39.0612 77H0.200012C2.54069 62.0071 12.3181 32.0214 32.7021 32.0214C51.4772 32.0214 57.8498 12.2354 59 -0.00012207Z" fill={secondaryFill}/>
            </svg>
        </div>
    </div>
  )
}

export default CardDeck