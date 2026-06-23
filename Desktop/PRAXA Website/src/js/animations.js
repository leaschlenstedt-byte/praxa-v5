import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initAnimations() {
  heroEntrance()
  heroShapesParallax()
  scrollReveals()
  statCounters()
}

function heroEntrance() {
  const tl = gsap.timeline({ delay: 0.15 })
  tl.from('.hero-eyebrow', { y: 24, opacity: 0, duration: 0.65, ease: 'power3.out' })
  tl.from('.hero-title',   { y: 40, opacity: 0, duration: 0.75, ease: 'power3.out' }, '-=0.4')
  tl.from('.hero-lead',    { y: 24, opacity: 0, duration: 0.65, ease: 'power3.out' }, '-=0.45')
  tl.from('.hero-ctas',    { y: 20, opacity: 0, duration: 0.55, ease: 'power3.out' }, '-=0.4')
  tl.from('.hero-trust',   { y: 16, opacity: 0, duration: 0.5,  ease: 'power3.out' }, '-=0.35')
  tl.from('.scenario-card',{ x: 36, opacity: 0, duration: 0.8,  ease: 'power3.out' }, '-=0.65')
}

function heroShapesParallax() {
  // Top-right ring cluster moves up slower than content (depth illusion)
  gsap.to('.hero-ring--tr', {
    y: -90,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.8 }
  })
  // Bottom-left ring moves up even slower
  gsap.to('.hero-ring--bl', {
    y: -45,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.2 }
  })
  // CTA rings subtle parallax
  gsap.to('.cta-ring--right', {
    y: -50,
    ease: 'none',
    scrollTrigger: { trigger: '.cta-section', start: 'top bottom', end: 'bottom top', scrub: 0.8 }
  })
}

function scrollReveals() {
  gsap.utils.toArray('[data-reveal]:not([data-reveal="stagger"])').forEach(el => {
    gsap.from(el, {
      y: 28, opacity: 0, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    })
  })

  gsap.utils.toArray('[data-reveal="stagger"]').forEach(container => {
    gsap.from(Array.from(container.children), {
      y: 28, opacity: 0, duration: 0.65, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: container, start: 'top 85%', once: true }
    })
  })

  // Steps slide in from left
  gsap.utils.toArray('.step').forEach((step, i) => {
    gsap.from(step, {
      x: -24, opacity: 0, duration: 0.6, ease: 'power3.out', delay: i * 0.08,
      scrollTrigger: { trigger: step, start: 'top 88%', once: true }
    })
  })
}

function statCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10)
    const suffix = el.dataset.suffix || ''
    const original = el.textContent

    ScrollTrigger.create({
      trigger: el, start: 'top 82%', once: true,
      onEnter() {
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target, duration: 1.6, ease: 'power2.out',
          onUpdate() { el.textContent = Math.round(obj.val) + suffix },
          onComplete() { el.textContent = original }
        })
      }
    })
  })
}
