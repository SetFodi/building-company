import React from 'react';
import { useTransitionNavigate } from '../context/TransitionContext';

export default function TransitionLink({ to, children, className, ...props }) {
    const transitionNavigate = useTransitionNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        // Skip transition if right-clicking or opening in new tab
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
        transitionNavigate(to);
    };

    return (
        <a href={to} onClick={handleClick} className={className} {...props}>
            {children}
        </a>
    );
}
