class EloquaError extends Error {
  constructor (err) {
    const { response = {} } = err
    const { status, statusText } = response
    super(statusText)
    this.status = status
    this.stack = err.stack
  }
}

module.exports = {
  EloquaError
}
