import styles from './Slider.module.css';
import { ReactComponent as SlideIcon } from 'Assets/Images/slideIcon.svg';
import { useEffect } from 'react';
const CustomHandle = () => {
    useEffect(() => {
        const handle = document.getElementById('custom-handle-slider');
        if (typeof handle !== 'undefined' && handle) {
            const parentElement = handle.parentElement;
            if (typeof parentElement !== 'undefined' && parentElement) {
                const styleString = parentElement.getAttribute('style') + ' top: -12%;';
                parentElement.setAttribute('style', styleString);
            }
        }
    });
    return (
        <>
            <SlideIcon />
            <div id="custom-handle-slider" className={styles.customHandle} />
        </>
    );
};

export default CustomHandle;
