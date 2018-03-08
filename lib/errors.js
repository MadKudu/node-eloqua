class EloquaError extends Error {
  constructor (err) {
    const { response = {} } = err
    const { status, statusText } = response
    super(statusText)
    this.status = status
  }
}

module.exports = {
  EloquaError
}
