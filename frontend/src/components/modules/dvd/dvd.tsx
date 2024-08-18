import { useSpring, animated } from "@react-spring/web";
import "./dvd.css";
import { useCallback, useEffect, useRef, useState } from "react";

type Color = "red" | "blue" | "green" | "yellow";

type DvdProps = {};
export default function Dvd(dvdProps: DvdProps) {
    const [props, api] = useSpring(() => ({
        from: { x: 0, y: 0 },
    }));
    const containerRef = useRef<HTMLDivElement>(null);
    const [movestate, setMove] = useState(false);
    const [xDirection, setXDirection] = useState(1);
    const [yDirection, setYDirection] = useState(1);
    const [lastBounce, setLastBounce] = useState(0);
    const [color, setColor] = useState<Color>("red");
    const size = 50;
    const animationFrameId = useRef<number | null>(null);

    const bounce = useCallback(() => {
        const now = Date.now();
        if (now - lastBounce > 2500) {
            console.log("bounce");
            setLastBounce(now);
            const colors: Color[] = ["red", "blue", "green", "yellow"];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            setColor(randomColor);
        }
    }, [lastBounce]);

    const checkCorners = useCallback(() => {
        if (containerRef.current) {
            const container = containerRef.current;
            const x = props.x.get();
            const y = props.y.get();
            const containerWidth = container.clientWidth;
            const containerHeight = container.clientHeight;
            if (x + size >= containerWidth) {
                setXDirection(-1);
                bounce();
            } else if (x <= 0) {
                setXDirection(1);
                bounce();
            }
            if (y + size >= containerHeight) {
                setYDirection(-1);
                bounce();
            } else if (y <= 0) {
                setYDirection(1);
                bounce();
            }
        }
    }, [props.x, props.y, size, bounce]);

    const startApi = useCallback(() => {
        const x = props.x.get();
        const y = props.y.get();
        api.start({
            x: x + 10 * xDirection,
            y: y + 10 * yDirection,
        });
        checkCorners();
        animationFrameId.current = requestAnimationFrame(startApi);
    }, [xDirection, yDirection, props.x, props.y, api, checkCorners]);

    useEffect(() => {
        if (movestate) {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            animationFrameId.current = requestAnimationFrame(startApi);
        } else {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
                animationFrameId.current = null;
            }
        }
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [movestate, startApi]);

    const handleClick = () => {
        setMove(!movestate);
    };

    return (
        <>
            <div className="dvd-container" ref={containerRef}>
                <animated.div style={props}>
                    <DVDIcon size={50} color={color} />
                </animated.div>
            </div>
            <button
                onClick={handleClick}
                style={{ position: "fixed", top: "50%", left: "50%" }}
            >
                {movestate ? "Stop" : "Start"}
            </button>
        </>
    );
}

type DVDIconProps = {
    size: number;
    color?: string;
    className?: string;
};

function DVDIcon(props: DVDIconProps) {
    return (
        <svg className={props.className}>
            <rect height={props.size} width={props.size} fill={props.color}></rect>
        </svg>
    );
}