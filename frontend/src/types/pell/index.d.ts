interface PellElement extends HTMLDivElement {
  content: {
    innerHTML: string
  }
}

declare module 'pell' {
  interface PellInit {
    element: HTMLDivElement
    onChange: (value: string) => void
    actions: string[]
  }
  export function init(settings: PellInit): PellElement
}
