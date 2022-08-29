import React from "react";
import ReactLoading from "react-loading";
import styles from './index.module.css';
/** end JS Dependency */
// import "../../assets/scss/custom/loading.scss";

export const Loading = () => {
    return <React.Fragment>
        <div className={`${styles.loadingcontainer}`}>
            <ReactLoading type="spinningBubbles" color="#fff" />
            <h3 id={`${styles.customloading}`}>Loading</h3>
        </div>
    </React.Fragment>
}
export default Loading;