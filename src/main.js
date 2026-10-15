import './styles/main.css'

const header = document.querySelector('[data-header]')
const top = document.querySelector('[data-top]')
if (header && top) {
  new IntersectionObserver(([entry]) => {
    header.classList.toggle('is-scrolled', !entry.isIntersecting)
  }).observe(top)
}

if (!CSS.supports('animation-timeline: view()')) {
  const reveal = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-in')
        reveal.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -12% 0px' },
  )
  document.querySelectorAll('.dealt, .face').forEach((el) => reveal.observe(el))
}

const steps = [...document.querySelectorAll('[data-step]')]
const screens = [...document.querySelectorAll('[data-screen]')]

function show(index) {
  steps.forEach((step, i) => step.classList.toggle('is-active', i === index))
  screens.forEach((screen, i) => {
    screen.classList.toggle('is-shown', i === index)
    screen.setAttribute('aria-hidden', String(i !== index))
  })
}

if (steps.length) {
  show(0)
  const story = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) show(steps.indexOf(entry.target))
      }
    },
    { rootMargin: '-48% 0px -48% 0px' },
  )
  steps.forEach((step) => story.observe(step))
}
