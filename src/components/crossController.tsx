import styles from '@/styles/components/crossController.module.scss';

type Is = 'left' | 'right';
type Props = {
    icon: string,
    labelOption: {
        top: string,
        right: string,
        bottom: string,
        left: string,
    },
    is: Is,
    onClick?: (direction: Direction) => void,
};

const Controller: React.VFC<Props> = (props) => {
    const is = styles[`is_${props.is}`] ?? '';

    return (
        <div className={styles.crossController + ` ${is}`}>
            <button onClick={props.onClick?.bind(this, 'top')} className={styles.topButton} type="button" aria-label={props.labelOption.top}></button>
            <button onClick={props.onClick?.bind(this, 'right')} className={styles.rightButton} type="button" aria-label={props.labelOption.right}></button>
            <button onClick={props.onClick?.bind(this, 'bottom')} className={styles.bottomButton} type="button" aria-label={props.labelOption.bottom}></button>
            <button onClick={props.onClick?.bind(this, 'left')} className={styles.leftButton} type="button" aria-label={props.labelOption.left}></button>
            <p className={styles.icon} aria-hidden="true">{props.icon}</p>
        </div>
    );
};

export default Controller;