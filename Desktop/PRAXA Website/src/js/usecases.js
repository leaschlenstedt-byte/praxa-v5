import Swiper from 'swiper'
import { Pagination } from 'swiper/modules'
import gsap from 'gsap'

export function initUseCases() {
  new Swiper('.uc-swiper', {
    modules: [Pagination],
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: { el: '.swiper-pagination', clickable: true },
    breakpoints: { 961: { slidesPerView: 3, spaceBetween: 24, allowTouchMove: false } }
  })

  let openId = null

  document.querySelectorAll('.uc-card').forEach(card => {
    card.addEventListener('click', () => {
      const targetId = card.dataset.target
      if (openId === targetId) {
        closeDetail(targetId)
        card.setAttribute('aria-expanded', 'false')
        openId = null
      } else {
        if (openId) {
          closeDetail(openId)
          document.querySelector(`[data-target="${openId}"]`)?.setAttribute('aria-expanded', 'false')
        }
        openId = targetId
        card.setAttribute('aria-expanded', 'true')
        openDetail(targetId)
      }
    })
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click() }
    })
  })

  document.querySelectorAll('.uc-close-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation()
      const id = btn.dataset.close
      closeDetail(id)
      document.querySelector(`[data-target="${id}"]`)?.setAttribute('aria-expanded', 'false')
      if (openId === id) openId = null
    })
  })
}

function openDetail(id) {
  const panel = document.getElementById(id)
  if (!panel) return
  panel.classList.add('is-open')
  gsap.fromTo(panel,
    { opacity: 0, y: -16 },
    { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
  )
  setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80)
}

function closeDetail(id) {
  const panel = document.getElementById(id)
  if (!panel) return
  gsap.to(panel, {
    opacity: 0, y: -10, duration: 0.3, ease: 'power2.in',
    onComplete: () => { panel.classList.remove('is-open'); gsap.set(panel, { clearProps: 'opacity,y' }) }
  })
}
