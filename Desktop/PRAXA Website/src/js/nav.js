export function initNav() {
  initScrollBehavior()
  initActiveLinks()
  initHamburger()
  initScrollProgress()
}

function initScrollBehavior() {
  const header = document.getElementById('site-header')
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40)
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
}

function initActiveLinks() {
  const links    = document.querySelectorAll('.nav-link')
  const sections = document.querySelectorAll('section[id]')

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      links.forEach(link => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`)
      })
    })
  }, { rootMargin: '-40% 0px -55% 0px' })

  sections.forEach(s => observer.observe(s))
}

function initHamburger() {
  const btn     = document.getElementById('hamburger')
  const drawer  = document.getElementById('mobile-drawer')
  const overlay = document.getElementById('mobile-overlay')

  const open = () => {
    btn.classList.add('is-open')
    btn.setAttribute('aria-expanded', 'true')
    drawer.classList.add('is-open')
    drawer.setAttribute('aria-hidden', 'false')
    overlay.classList.add('is-visible')
    document.body.style.overflow = 'hidden'
  }
  const close = () => {
    btn.classList.remove('is-open')
    btn.setAttribute('aria-expanded', 'false')
    drawer.classList.remove('is-open')
    drawer.setAttribute('aria-hidden', 'true')
    overlay.classList.remove('is-visible')
    document.body.style.overflow = ''
  }

  btn.addEventListener('click', () => drawer.classList.contains('is-open') ? close() : open())
  overlay.addEventListener('click', close)
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', close))
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close() })
}

function initScrollProgress() {
  const bar = document.getElementById('scroll-progress')
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight
    bar.style.width = total > 0 ? `${(window.scrollY / total) * 100}%` : '0%'
  }, { passive: true })
}
