export const fadeInLeft = (delay = 0) => ({
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { delay, duration: 0.5 },
});

export const fadeInUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.5 },
});

export const fadeInRight = (delay = 0) => ({
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { delay, duration: 0.5 },
});

export const fadeInDown = (delay = 0) => ({
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.5 },
});

export const scaleIn = (delay = 0) => ({
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { delay, duration: 0.6 },
});

export const slideUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.6 },
});

// Background floating animations
export const floatingCircle = (duration = 15, delay = 0) => ({
    animate: {
        scale: [1, 1.2, 1],
        rotate: [0, 10, 0],
    },
    transition: {
        duration,
        repeat: Infinity,
        delay,
    },
});

export const floatingSquare = (duration = 12, delay = 1) => ({
    animate: {
        scale: [1, 1.3, 1],
        rotate: [0, -20, 0],
    },
    transition: {
        duration,
        repeat: Infinity,
        delay,
    },
});

export const floatingDot = (duration = 8, delay = 2) => ({
    animate: {
        scale: [1, 1.1, 1],
        x: [0, 10, 0],
    },
    transition: {
        duration,
        repeat: Infinity,
        delay,
    },
});

// Container animations
export const containerSlideUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
});

export const cardScaleIn = (delay = 0.4) => ({
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { delay, duration: 0.6 },
});
