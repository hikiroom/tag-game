import Head from 'next/head';
import styles from '@/styles/Home.module.scss';
import Link from 'next/link';
import useRanking from '@/hooks/useRanking';

const Home = () => {
    const ranking = useRanking();

    return (
        <>
            <Head>
                <title>壁を掘って鬼から逃げろ！</title>
            </Head>
            <article className={styles.container}>
                <h1 className={styles.hdgLv1}>壁を掘って鬼から逃げろ！</h1>
                <p className={styles.icon}>⛏</p>
                <Link href="/game">
                    <a className={styles.startBtn}>スタート</a>
                </Link>

                <section className={styles.section}>
                    <h2 className={styles.hdgLv2}>このゲームは何？👀</h2>
                    <p>ブラウザでできる鬼ごっこゲームです。</p>
                </section>
                <section className={styles.section}>
                    <h2 className={styles.hdgLv2}>遊び方🕹</h2>
                    <p><em>追いかけてくる鬼からとにかく逃げましょう！</em></p>
                    <p>左下のコントローラーで壁を掘り、右下のコントローラーで移動ができます。<br />連続して壁を掘りすすめると一時的に壁を掘ることができなくなるので注意が必要です。</p>
                    <p><small><span>※</span>PCの場合はWASDキーが左下、矢印キーが右下のコントローラーと対応しています。</small></p>
                </section>
                <section className={styles.section}>
                    <h2 className={styles.hdgLv2}>ランキング👑</h2>
                    <ol className={styles.ranking}>
                        {ranking.map((rankingObj) => {
                            return <li>{rankingObj.name}：{rankingObj.time}秒</li>
                        })}
                    </ol>
                </section>
            </article>
            <footer className={styles.footer}>
                <p><small>© 2020 ひきるーむ</small></p>
            </footer>
        </>
    );
}

export default Home;