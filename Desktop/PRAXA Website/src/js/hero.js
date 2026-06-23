import gsap from 'gsap'

const REVEAL_INTERVAL = 2400
const HOLD_AFTER_LAST = 2000
const RESET_DURATION  = 0.35

export function initHero() {
  const items       = [...document.querySelectorAll('.sc-item')]
  const progressBar = document.getElementById('scenario-progress-bar')
  if (!items.length || !progressBar) return

  let idx   = 0
  let timer = null

  gsap.set(items, { opacity: 0, y: 10 })

  function startProgress(duration) {
    progressBar.style.transition = 'none'
    progressBar.style.width = '0%'
    void progressBar.offsetWidth
    progressBar.style.transition = `width ${duration}ms linear`
    progressBar.style.width = '100%'
  }

  function stopProgress() {
    progressBar.style.transition = 'none'
    progressBar.style.width = '0%'
  }

  function revealNext() {
    items.forEach(it => it.classList.remove('active'))
    items[idx].classList.add('active')
    gsap.to(items[idx], { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
    idx++

    if (idx < items.length) {
      startProgress(REVEAL_INTERVAL)
      timer = setTimeout(revealNext, REVEAL_INTERVAL)
    } else {
      startProgress(HOLD_AFTER_LAST)
      timer = setTimeout(resetCycle, HOLD_AFTER_LAST)
    }
  }

  function resetCycle() {
    stopProgress()
    gsap.to(items, {
      opacity: 0, y: -8,
      stagger: { each: 0.05, from: 'end' },
      duration: RESET_DURATION,
      ease: 'power2.in',
      onComplete() {
        gsap.set(items, { y: 10 })
        items.forEach(it => it.classList.remove('active'))
        idx = 0
        timer = setTimeout(revealNext, 500)
      }
    })
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearTimeout(timer)
      stopProgress()
    } else if (idx < items.length) {
      startProgress(REVEAL_INTERVAL)
      timer = setTimeout(revealNext, REVEAL_INTERVAL)
    }
  })

  timer = setTimeout(revealNext, 900)
}
