'use client';

import { useLayoutEffect, useRef, useCallback } from 'react';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div
    className={`scroll-stack-card relative w-full h-80 my-8 p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
  >
    {children}
  </div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);
  // Cached layout offsets - computed once, reused every frame
  const cardOffsetsRef = useRef([]);
  const endOffsetRef = useRef(0);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return { scrollTop: window.scrollY, containerHeight: window.innerHeight, scrollContainer: document.documentElement };
    } else {
      const scroller = scrollerRef.current;
      return { scrollTop: scroller.scrollTop, containerHeight: scroller.clientHeight, scrollContainer: scroller };
    }
  }, [useWindowScroll]);

  // Walk offsetParent chain - layout position, unaffected by CSS transforms
  const getDocumentOffset = useCallback((element) => {
    if (!useWindowScroll) return element.offsetTop;
    let top = 0;
    let el = element;
    while (el) { top += el.offsetTop; el = el.offsetParent; }
    return top;
  }, [useWindowScroll]);

  // Called once on mount + on resize - batch all layout reads up front
  const cacheOffsets = useCallback(() => {
    // Compute exact bottom padding needed so the last card's pin animation
    // completes at a positive translateY on any screen size — no hardcoded
    // breakpoints, adapts to every device at runtime.
    if (useWindowScroll) {
      const inner = scrollerRef.current?.querySelector('.scroll-stack-inner');
      if (inner && cardsRef.current.length) {
        const { containerHeight } = getScrollData();
        const stackPositionPx = parsePercentage(stackPosition, containerHeight);
        const lastCard = cardsRef.current[cardsRef.current.length - 1];
        const lastCardHeight = lastCard ? lastCard.offsetHeight : 0;
        const lastIdx = cardsRef.current.length - 1;
        const minPb = Math.max(
          0,
          stackPositionPx + itemStackDistance * lastIdx + lastCardHeight - containerHeight / 2 + 24
        );
        inner.style.paddingBottom = `${Math.ceil(minPb)}px`;
      }
    }
    cardOffsetsRef.current = cardsRef.current.map(card => card ? getDocumentOffset(card) : 0);
    const endEl = useWindowScroll
      ? document.querySelector('.scroll-stack-end')
      : scrollerRef.current?.querySelector('.scroll-stack-end');
    endOffsetRef.current = endEl ? getDocumentOffset(endEl) : 0;
  }, [getDocumentOffset, useWindowScroll, getScrollData, parsePercentage, stackPosition, itemStackDistance]);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;
    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElementTop = endOffsetRef.current;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const cardTop = cardOffsetsRef.current[i] ?? 0;
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = cardOffsetsRef.current[j] ?? 0;
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) topCardIndex = j;
        }
        if (i < topCardIndex) blur = Math.max(0, (topCardIndex - i) * blurAmount);
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;
      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged = !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        card.style.transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        card.style.filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';
        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) { stackCompletedRef.current = true; onStackComplete?.(); }
        else if (!isInView && stackCompletedRef.current) { stackCompletedRef.current = false; }
      }
    });

    isUpdatingRef.current = false;
  }, [itemScale, itemStackDistance, stackPosition, scaleEndPosition, baseScale, rotationAmount, blurAmount, useWindowScroll, onStackComplete, calculateProgress, parsePercentage, getScrollData]);

  const handleScroll = useCallback(() => { updateCardTransforms(); }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    // Use a passive scroll listener only — the global Lenis from
    // SmoothScrollProvider owns smooth scrolling on desktop. Creating a
    // second Lenis instance here caused two instances to compete via
    // window.scrollTo(), producing inconsistent scroll positions between
    // windowed and fullscreen modes.
    const onScroll = () => {
      if (animationFrameRef.current) return;
      animationFrameRef.current = requestAnimationFrame(() => {
        animationFrameRef.current = null;
        handleScroll();
      });
    };
    const target = useWindowScroll ? window : scrollerRef.current;
    if (!target) return;
    target.addEventListener('scroll', onScroll, { passive: true });
    lenisRef.current = { destroy: () => target.removeEventListener('scroll', onScroll) };
    return lenisRef.current;
  }, [handleScroll, useWindowScroll]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : scroller.querySelectorAll('.scroll-stack-card')
    );

    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
      card.style.willChange = blurAmount ? 'transform, filter' : 'transform';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.webkitTransform = 'translateZ(0)';
    });

    // Cache offsets AFTER layout is settled, BEFORE any transforms are applied
    // Use requestAnimationFrame to ensure DOM is fully painted first
    requestAnimationFrame(() => {
      cacheOffsets();
      setupLenis();
      updateCardTransforms();
    });

    const onResize = () => { cacheOffsets(); };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      window.removeEventListener('resize', onResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (lenisRef.current) lenisRef.current.destroy();
      stackCompletedRef.current = false;
      cardsRef.current = [];
      cardOffsetsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [itemDistance, itemScale, itemStackDistance, stackPosition, scaleEndPosition, baseScale, scaleDuration, rotationAmount, blurAmount, useWindowScroll, onStackComplete, cacheOffsets, setupLenis, updateCardTransforms]);

  const containerStyles = useWindowScroll
    ? { overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch', WebkitTransform: 'translateZ(0)', transform: 'translateZ(0)' }
    : { overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth', WebkitTransform: 'translateZ(0)', transform: 'translateZ(0)', willChange: 'scroll-position' };

  const containerClassName = useWindowScroll
    ? `relative w-full ${className}`.trim()
    : `relative w-full h-full overflow-y-auto overflow-x-visible ${className}`.trim();

  return (
    <div className={containerClassName} ref={scrollerRef} style={containerStyles}>
      <div className="scroll-stack-inner mx-auto max-w-[1216px] pt-8 px-6 min-h-screen sm:px-8">
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
