import styles from './Slider.module.css';
import { ReactComponent as SlideIcon } from 'Assets/Images/slideIcon.svg';

const CustomHandle = () => {
    return (
        <>
            <div id="custom-handle-slider" className={styles.customHandle} />
            <SlideIcon className={styles.slideIcon} />
        </>
    );
};

export default CustomHandle;
