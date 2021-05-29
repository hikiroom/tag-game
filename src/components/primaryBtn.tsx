import styles from '@/styles/components/primaryBtn.module.scss';

type Props = {
    onClick: () => void;
    children: React.ReactNode,
};

const PrimaryBtn: React.VFC<Props> = (props) => {
    return (
        <button type="button" onClick={props.onClick} className={styles.primaryBtn}>{props.children}</button>
    );
};

export default PrimaryBtn;