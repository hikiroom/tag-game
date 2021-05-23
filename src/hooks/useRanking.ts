import { useState, useEffect } from 'react';
import db from '@/utils/firebase';

type Ranking = {
    name: string,
    time: number,
};

const useRanking = (): Ranking[] => {
    const [ranking, setRanking] = useState<Ranking[]>([]);

    useEffect(() => {
        // db.collection('ranking').orderBy('time').limit(10).get().then((res) => {
        //     const items = res.docs.map((item) => {
        //         return item.data() as Ranking;
        //     });

        //     setRanking(items);
        // });
        setRanking([
            {name: '🤓', time: 100},
            {name: '🥲', time: 100},
            {name: '🥺', time: 100},
            {name: '🥲', time: 100},
            {name: '😇', time: 100},
            {name: '😌', time: 100},
            {name: '😚', time: 100},
            {name: '😚', time: 100},
            {name: '😣', time: 100},
            {name: '🤬', time: 100},
        ]);
    }, []);

    return ranking;
};

export default useRanking;