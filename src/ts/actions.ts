export function hoverScrollText(node: HTMLElement) {
    const timePerPixel = 0.01;
    const text = node.firstChild as HTMLElement;
    const textWidth = text.getBoundingClientRect().width;
    const containerWidth = parseFloat(getComputedStyle(node).width);
    const translateAmount = Math.min(containerWidth - textWidth, 0);
    const translateTime = `${Math.abs(translateAmount * timePerPixel)}s`;

	node.addEventListener('mouseenter', () => {
        text.style.transitionDuration = translateTime;
        text.style.transform = `translateX(${translateAmount}px)`;
    });

    node.addEventListener('mouseleave', () => {
        text.style.transitionDuration = '0.5s';
        text.style.transform = 'translateX(0)';
    });
}