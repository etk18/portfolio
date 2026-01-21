import { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

/**
 * Custom hook for 3D glass tilt effect on mouse hover
 * @param {Object} options - Configuration options
 * @param {number} options.maxTilt - Maximum tilt angle in degrees (default: 10)
 * @param {number} options.scale - Scale on hover (default: 1.02)
 * @param {number} options.glareOpacity - Max glare opacity (default: 0.15)
 * @returns {Object} - { ref, style, onMouseMove, onMouseEnter, onMouseLeave }
 */
export const useGlassTilt = (options = {}) => {
    const {
        maxTilt = 10,
        scale = 1.02,
        glareOpacity = 0.15,
    } = options;

    const ref = useRef(null);
    const [style, setStyle] = useState({
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: 'transform 0.1s ease-out',
    });
    const [glareStyle, setGlareStyle] = useState({
        background: 'transparent',
        opacity: 0,
    });

    const onMouseMove = useCallback((e) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        const rotateY = (mouseX / (rect.width / 2)) * maxTilt;
        const rotateX = -(mouseY / (rect.height / 2)) * maxTilt;

        setStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
            transition: 'transform 0.1s ease-out',
        });

        // Calculate glare position
        const glareX = ((e.clientX - rect.left) / rect.width) * 100;
        const glareY = ((e.clientY - rect.top) / rect.height) * 100;

        setGlareStyle({
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,${glareOpacity}), transparent 50%)`,
            opacity: 1,
        });
    }, [maxTilt, scale, glareOpacity]);

    const onMouseEnter = useCallback(() => {
        setStyle((prev) => ({
            ...prev,
            transition: 'transform 0.1s ease-out',
        }));
    }, []);

    const onMouseLeave = useCallback(() => {
        setStyle({
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
            transition: 'transform 0.3s ease-out',
        });
        setGlareStyle({
            background: 'transparent',
            opacity: 0,
        });
    }, []);

    return {
        ref,
        style,
        glareStyle,
        handlers: {
            onMouseMove,
            onMouseEnter,
            onMouseLeave,
        },
    };
};

/**
 * GlassCard component with built-in 3D tilt effect
 */
export const GlassCard = ({ children, className = '', maxTilt = 8, ...props }) => {
    const { ref, style, glareStyle, handlers } = useGlassTilt({ maxTilt, scale: 1.02 });

    return (
        <div
            ref={ref}
            className={`glass-card relative overflow-hidden ${className}`}
            style={style}
            {...handlers}
            {...props}
        >
            {/* Glare overlay */}
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-200"
                style={glareStyle}
            />
            {children}
        </div>
    );
};

/**
 * GlassButton component with built-in 3D tilt effect
 * Supports React Router Link via 'to' prop, or regular anchor via 'href' prop
 */
export const GlassButton = ({ children, className = '', as = 'button', href, to, ...props }) => {
    const { ref, style, glareStyle, handlers } = useGlassTilt({ maxTilt: 12, scale: 1.05 });

    // Determine which component to render
    let Component;
    let linkProps = {};

    if (to) {
        // React Router Link
        Component = Link;
        linkProps = { to };
    } else if (href) {
        // Regular anchor
        Component = 'a';
        linkProps = { href };
    } else {
        // Button or custom element
        Component = as;
    }

    return (
        <Component
            ref={ref}
            className={`relative overflow-hidden inline-flex items-center justify-center ${className}`}
            style={style}
            {...handlers}
            {...linkProps}
            {...props}
        >
            {/* Glare overlay */}
            <div
                className="absolute inset-0 pointer-events-none rounded-xl transition-opacity duration-200"
                style={glareStyle}
            />
            {children}
        </Component>
    );
};

export default useGlassTilt;

