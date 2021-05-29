import Head from 'next/head';
import styles from '@/styles/Home.module.scss';
import { useRanking } from '@/hooks/useRanking';

import LinkBtn from '@/components/linkBtn';

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
                <LinkBtn href="/game">スタート</LinkBtn>

                <section className={styles.section}>
                    <h2 className={styles.hdgLv2}>このゲームは何？👀</h2>
                    <p>ブラウザでできる鬼ごっこゲームです。</p>
                </section>
                <section className={styles.section}>
                    <h2 className={styles.hdgLv2}>遊び方🕹</h2>
                    <p><em>追いかけてくる鬼からとにかく逃げましょう！</em></p>
                    <p>左下のコントローラーで移動、右下のコントローラーで壁を掘ることができます。<br />連続して壁を掘りすすめると一時的に壁を掘ることができなくなるので注意しましょう。</p>
                    <p><small><span>※</span>PCの場合はWASDキーで移動、矢印キーで壁を掘ることもできます。</small></p>
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