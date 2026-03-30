function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getPointerX(event) {
  return event.touches ? event.touches[0].clientX : event.pageX;
}

export function initCardSlider(options = {}) {
  const {
    abortKey,
    slider,
    dots = [],
    slides = [],
    lockButton = null,
    getInitialIndex = () => 0,
    getLockState = () => ({ locked: false, index: 0 }),
    setLockState = () => {},
    onIndexChange = () => {},
    isModalActive = () => true,
    maxIndex = Math.min(slides.length - 1, 3),
    gap = 20,
    enableWheel = false,
  } = options;

  if (!slider || slides.length < 2) return null;

  if (abortKey && window[abortKey]) {
    window[abortKey].abort();
  }

  const controller = new AbortController();
  const signal = { signal: controller.signal };

  if (abortKey) {
    window[abortKey] = controller;
  }

  let currentIndex = clamp(getInitialIndex(), 0, maxIndex);
  let isDragging = false;
  let startX = 0;
  let startScrollLeft = 0;
  let wheelTimeout = null;

  function getSlideWidth() {
    return slider.clientWidth + gap;
  }

  function syncLockButton() {
    if (!lockButton) return;
    const { locked } = getLockState();
    lockButton.style.display = "flex";
    lockButton.classList.toggle("locked", locked);
  }

  function updateDots(activeIndex = currentIndex) {
    const { locked, index } = getLockState();
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === activeIndex);
      dot.classList.toggle("locked", locked && dotIndex === index);
    });
    syncLockButton();
  }

  function update3DEffect() {
    if (slider.clientWidth === 0) return;

    const scrollLeft = slider.scrollLeft;
    const slideWidth = getSlideWidth();

    slides.forEach((slide, index) => {
      const offset = (index * slideWidth - scrollLeft) / slider.clientWidth;
      if (Math.abs(offset) < 2) {
        const rotY = -25 * offset;
        const scale = 1 - 0.12 * Math.abs(offset);
        const opacity = 1 - 0.4 * Math.abs(offset);
        slide.style.transform = `perspective(800px) rotateY(${rotY}deg) scale(${scale})`;
        slide.style.opacity = Math.max(0.3, opacity);
        slide.style.zIndex = String(10 - Math.abs(Math.round(offset)));
      } else {
        slide.style.opacity = "0";
      }
    });
  }

  function animateTo(target) {
    const start = slider.scrollLeft;
    const distance = target - start;
    const duration = 200;
    let startTime = null;

    function tick(now) {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      slider.scrollLeft = start + distance * eased;
      update3DEffect();
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  function snapToSlide(index, animated = true) {
    currentIndex = clamp(index, 0, maxIndex);
    const target = currentIndex * getSlideWidth();

    if (animated) {
      animateTo(target);
    } else {
      slider.scrollLeft = target;
    }

    updateDots();
    onIndexChange(currentIndex);
  }

  function startDrag(event) {
    isDragging = true;
    startX = getPointerX(event);
    startScrollLeft = slider.scrollLeft;
    slider.style.cursor = "grabbing";
  }

  function moveDrag(event) {
    if (!isDragging) return;
    slider.scrollLeft = startScrollLeft + (startX - getPointerX(event));
    update3DEffect();
  }

  function endDrag() {
    if (!isDragging) return;

    isDragging = false;
    slider.style.cursor = "grab";

    const slideWidth = getSlideWidth();
    const moved = slider.scrollLeft - currentIndex * slideWidth;
    const threshold = slideWidth * 0.15;
    let targetIndex = currentIndex;

    if (moved > threshold) targetIndex = currentIndex + 1;
    else if (moved < -threshold) targetIndex = currentIndex - 1;

    snapToSlide(targetIndex);
  }

  if (lockButton) {
    syncLockButton();
    lockButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const { locked } = getLockState();
      setLockState(!locked, currentIndex);
      updateDots();
    }, signal);
  }

  slider.addEventListener("mousedown", startDrag, signal);
  slider.addEventListener("touchstart", startDrag, { passive: true, ...signal });
  document.addEventListener("mousemove", moveDrag, signal);
  document.addEventListener("touchmove", moveDrag, { passive: true, ...signal });
  document.addEventListener("mouseup", endDrag, signal);
  document.addEventListener("touchend", endDrag, signal);

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      snapToSlide(Math.min(index, maxIndex));
    }, signal);
  });

  slider.addEventListener("scroll", () => {
    if (isDragging) return;

    update3DEffect();
    const realIndex = clamp(Math.round(slider.scrollLeft / getSlideWidth()), 0, maxIndex);
    updateDots(realIndex);
  }, signal);

  document.addEventListener("keydown", (event) => {
    if (!isModalActive()) return;

    if (event.key === "ArrowRight" || event.key === " ") {
      event.preventDefault();
      if (currentIndex < maxIndex) snapToSlide(currentIndex + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (currentIndex > 0) snapToSlide(currentIndex - 1);
    }
  }, signal);

  if (enableWheel) {
    slider.addEventListener("wheel", (event) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) || Math.abs(event.deltaX) <= 30) {
        return;
      }

      event.preventDefault();
      if (wheelTimeout) return;

      wheelTimeout = window.setTimeout(() => {
        wheelTimeout = null;
      }, 300);

      if (event.deltaX > 0 && currentIndex < maxIndex) snapToSlide(currentIndex + 1);
      else if (event.deltaX < 0 && currentIndex > 0) snapToSlide(currentIndex - 1);
    }, { passive: false, ...signal });
  }

  snapToSlide(currentIndex, false);
  update3DEffect();

  return {
    abort: () => controller.abort(),
    getCurrentIndex: () => currentIndex,
    snapToSlide,
  };
}
