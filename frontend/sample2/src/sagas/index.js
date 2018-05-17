import watch from './request';
import countersWatch from './counters';

export default function* rootSaga() {
    yield [
        watch(),
        countersWatch()
    ];
};
