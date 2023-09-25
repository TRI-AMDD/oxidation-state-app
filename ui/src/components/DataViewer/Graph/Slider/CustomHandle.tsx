import { useAtom } from 'jotai';
import styles from './Slider.module.css';
import { ReactComponent as SlideIcon } from '@/Assets/Images/slideIcon.svg';
import { exportGraphModalOpenAtom } from '@/atoms/atoms';

const CustomHandle = () => {
    const [exportGraphModalOpen] = useAtom(exportGraphModalOpenAtom);
    return (
        <>
            <div id="custom-handle-slider" className={styles.customHandle} />
            {!exportGraphModalOpen && <SlideIcon className={styles.slideIcon} />}
        </>
    );
};

export default CustomHandle;
