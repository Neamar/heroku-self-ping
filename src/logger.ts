namespace Logger {
  let logger = console.log
  let isVerbose = false


  export const setLogger = (newLogger: (arg: string) => any) => {
    if (typeof logger !== 'function') {
      throw 'Error: Provided logger is not a function!'
    }
    logger = newLogger
  }

  export const setIsVerbose = (value: boolean) => {
    isVerbose = value
  }

  export const log = (arg: string) => {
    logger(arg)
  }

  export const verbose = (arg: string) => {
    isVerbose && logger(arg)
  }
}

export default Logger