import './styles/main.css'

import { initNav }        from './js/nav'
import { initHero }       from './js/hero'
import { initUseCases }   from './js/usecases'
import { initAnimations } from './js/animations'

document.addEventListener('DOMContentLoaded', () => {
  initNav()
  initHero()
  initUseCases()
  initAnimations()

  requestAnimationFrame(() => {
    document.body.classList.remove('is-loading')
  })
})
