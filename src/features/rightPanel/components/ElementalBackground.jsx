import React, { useEffect, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ElementalBackground = ({ elementType }) => {
    const [init, setInit] = React.useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesConfig = useMemo(() => {
        switch (elementType) {
            case 'fire':
                return {
                    particles: {
                        number: { value: 150 },  // INCREASED from 80
                        color: { value: ["#ff4500", "#ff6347", "#ff8c00", "#ffa500", "#ffb347"] },
                        shape: { type: ["circle", "triangle"] },
                        opacity: {
                            value: { min: 0.3, max: 0.9 },
                            animation: {
                                enable: true,
                                speed: 3,  // FASTER
                                sync: false
                            }
                        },
                        size: {
                            value: { min: 2, max: 8 },
                            animation: {
                                enable: true,
                                speed: 8,  // FASTER
                                sync: false
                            }
                        },
                        move: {
                            enable: true,
                            speed: 6,  // INCREASED from 3
                            direction: "top",
                            random: true,
                            straight: false,
                            outModes: { default: "out" },
                            attract: {
                                enable: true,
                                rotate: { x: 600, y: 1200 }
                            }
                        },
                        links: {
                            enable: false
                        }
                    },
                    background: { color: "transparent" },
                    interactivity: { events: { onClick: { enable: false }, onHover: { enable: false } } }
                };

            case 'water':
                return {
                    particles: {
                        number: { value: 120 },  // INCREASED from 60
                        color: { value: ["#1e40af", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"] },
                        shape: { type: "circle" },
                        opacity: {
                            value: { min: 0.3, max: 0.7 },
                            animation: {
                                enable: true,
                                speed: 2,
                                sync: false
                            }
                        },
                        size: {
                            value: { min: 3, max: 12 }  // LARGER bubbles
                        },
                        move: {
                            enable: true,
                            speed: 4,  // INCREASED from 2
                            direction: "bottom",
                            random: true,
                            straight: false,
                            outModes: { default: "out" },
                            wobble: {
                                enable: true,
                                distance: 20,  // MORE wobble
                                speed: 5  // FASTER wobble
                            }
                        }
                    },
                    background: { color: "transparent" }
                };

            case 'earth':
                return {
                    particles: {
                        number: { value: 100 },  // INCREASED from 50
                        color: { value: ["#15803d", "#22c55e", "#4ade80", "#65a30d", "#84cc16"] },
                        shape: { type: ["circle", "square", "triangle"] },
                        opacity: {
                            value: { min: 0.3, max: 0.6 }
                        },
                        size: {
                            value: { min: 2, max: 7 }
                        },
                        move: {
                            enable: true,
                            speed: 2,  // INCREASED from 0.8
                            direction: "top",
                            random: true,
                            straight: false,
                            outModes: { default: "out" },
                            drift: 5
                        },
                        rotate: {
                            value: { min: 0, max: 360 },
                            animation: {
                                enable: true,
                                speed: 5,
                                sync: false
                            }
                        }
                    },
                    background: { color: "transparent" }
                };

            case 'air':
                return {
                    particles: {
                        number: { value: 180 },  // INCREASED from 100
                        color: { value: ["#bfdbfe", "#dbeafe", "#e0f2fe", "#f0f9ff", "#ffffff"] },
                        shape: { type: "circle" },
                        opacity: {
                            value: { min: 0.1, max: 0.4 }
                        },
                        size: {
                            value: { min: 1, max: 4 }
                        },
                        move: {
                            enable: true,
                            speed: 8,  // MUCH FASTER from 4
                            direction: "right",
                            random: true,
                            straight: false,
                            outModes: { default: "out" },
                            attract: {
                                enable: false
                            }
                        }
                    },
                    background: { color: "transparent" }
                };

            case 'ether':
                return {
                    particles: {
                        number: { value: 120 },  // INCREASED from 70
                        color: { value: ["#7c3aed", "#a855f7", "#c084fc", "#e879f9", "#ec4899", "#f472b6"] },
                        shape: { type: ["star", "circle", "triangle"] },
                        opacity: {
                            value: { min: 0.4, max: 1 },
                            animation: {
                                enable: true,
                                speed: 4,  // FASTER
                                sync: false
                            }
                        },
                        size: {
                            value: { min: 2, max: 7 },
                            animation: {
                                enable: true,
                                speed: 6,  // FASTER
                                sync: false
                            }
                        },
                        move: {
                            enable: true,
                            speed: 3,  // INCREASED from 1.5
                            direction: "none",
                            random: true,
                            straight: false,
                            outModes: { default: "bounce" },
                            attract: {
                                enable: true,
                                rotate: { x: 600, y: 600 }
                            }
                        },
                        rotate: {
                            value: { min: 0, max: 360 },
                            animation: {
                                enable: true,
                                speed: 10,
                                sync: false
                            }
                        },
                        twinkle: {
                            particles: {
                                enable: true,
                                frequency: 0.05,
                                opacity: 1
                            }
                        }
                    },
                    background: { color: "transparent" }
                };

            default:
                return null;
        }
    }, [elementType]);

    if (!init || !particlesConfig) {
        return null;
    }

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 0
        }}>
            <Particles options={particlesConfig} />
        </div>
    );
};

export default ElementalBackground;
