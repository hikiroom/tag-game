import styles from '@/styles/components/linkBtn.module.scss';
import Link from 'next/link';

type Type = 'skeleton';
type Props = {
    href: string,
    type?: Type,
    children: React.ReactNode,
};

const LinkBtn: React.VFC<Props> = (props) => {
    const type = styles[`type_${props.type}`] ?? '';

    return (
        <Link href={props.href}>
            <a className={styles.linkBtn + ` ${type}`}>{props.children}</a>
        </Link>
    );
};

export default LinkBtn;