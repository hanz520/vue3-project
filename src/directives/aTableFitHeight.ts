import { App } from 'vue'

const install = (app: App) => {
  function setHeight(this: HTMLDivElement) {
    this.style.maxHeight = document.body.clientHeight - this.getBoundingClientRect().top - 80 + 'px'
  }

  app.directive('fit-height', {
    mounted(el: HTMLDivElement) {
      const tableBodyEl = el.querySelectorAll('.ant-table-body')[0] as HTMLDivElement
      setHeight.call(tableBodyEl)
      window.addEventListener('resize', setHeight.bind(tableBodyEl))
    },
    unmounted() {
      window.removeEventListener('resize', setHeight)
    }
  })
}

export const fitHeight = {
  version: '0.0.1',
  install
}
