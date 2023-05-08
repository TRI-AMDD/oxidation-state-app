import styles from './FormatterStyles.module.css';

const ELECTRIC_CHARGE = ['+', '-'];

export const formatOxidationState = (oxidationState: string) => {
    let item = {
        element: '',
        state: ''
    };
    const finalArr = [];
    for (let i = 0; i < oxidationState.length; i++) {
        if (ELECTRIC_CHARGE.includes(oxidationState[i])) {
            item.state = oxidationState[i - 1].concat(oxidationState[i]);
            item.element = item.element.slice(0, -1);

            finalArr.push(item);

            item = {
                element: '',
                state: ''
            };
        } else {
            item = { ...item, element: item.element.concat(oxidationState[i]) };
        }
    }

    if (finalArr.length > 0) {
        return finalArr.map((element, index) => {
            return (
                <div key={`oxidationState-${index}`}>
                    {element.element}
                    <sup className={styles.super}>{element.state}</sup>
                </div>
            );
        });
    } else {
        return <></>;
    }
};
