declare module '*.jpg' {
  const fileName: string
  export = fileName
}

// We are using jest-dom/extend-expect for our test suit
// When using this library in every tests,
// typescript will extend the types correctly
// When using it with setupFilesAfterEnv (like we do)
// you need to add the used methods to the jest namespace
declare namespace jest {
  interface Matchers<R> {
    toBeInTheDocument(): HTMLElement
  }
}
