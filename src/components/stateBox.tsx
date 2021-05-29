import styles from '@/styles/components/stateBox.module.scss';

type Is = 'left' | 'right';
type Props = {
    icon: string,
    text: string,
    is: Is,
};

const StateBox:React.VFC<Props> = (props) => {
    const is = styles[`is_${props.is}`] ?? '';

    return (
        <p className={styles.stateBox + ` ${is}`}>{props.icon}<span>{props.text}</span></p>
    );
};

export default StateBox;