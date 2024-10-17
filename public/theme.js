;(({ localStorage, matchMedia }, { documentElement }) => {
  class ThemeController {
    media = matchMedia('(prefers-color-scheme: dark)')

    constructor() {
      this.initialize()
    }

    get theme() {
      let dark = null
      try {
        dark = JSON.parse(localStorage.getItem('dark') || 'null')
      } catch {}
      return dark === true ? 'dark' : dark === false ? 'light' : 'system'
    }

    set theme(value) {
      if (value === 'system') {
        localStorage.removeItem('dark')
      } else {
        localStorage.setItem('dark', JSON.stringify(value === 'dark'))
      }
    }

    get isDark() {
      return this.theme === 'dark' || (this.theme === 'system' && this.media.matches)
    }

    update(theme = this.theme) {
      this.theme = ['dark', 'light', 'system'].includes(theme) ? theme : 'system'
      documentElement.classList.toggle('dark', this.isDark)
      documentElement.setAttribute('data-theme', this.theme)
      documentElement.classList.add('[&_*]:!transition-none')
      setTimeout(() => documentElement.classList.remove('[&_*]:!transition-none'), 0)
    }

    initialize() {
      this.update()

      const observer = new MutationObserver(([m]) => {
        const newValue = m.target.getAttribute('data-theme')
        if (newValue !== m.oldValue) {
          this.update(newValue)
        }
      })

      observer.observe(documentElement, {
        attributeOldValue: true,
        attributeFilter: ['data-theme']
      })

      this.media.addEventListener('change', (_) => this.update())
    }
  }

  new ThemeController()
})(window, document)
