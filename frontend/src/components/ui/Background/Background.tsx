import {animated, config, useSpring} from "@react-spring/web";
import './background.css';

export default function Background() {
    const [{background}] = useSpring(() => ({
        from: {background: 'var(--step1)'},
        to: [
            {background: 'var(--step1)'},
            {background: 'var(--step2)'},
            {background: 'var(--step3)'},
            {background: 'var(--step4)'}],
        config: {...config.molasses, duration: 3000},
        loop: {reverse: true},

    }),
        [])

    return (
        <animated.div className='background' style={{background}}></animated.div>
    )
}
