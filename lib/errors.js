class EloquaError extends Error {
  constructor (err) {
    const { response = {} } = err
    const { status, statusText, data } = response
    const message = statusText || err.message
    super(message)
    this.status = status
    this.data = data
  }
}

module.exports = {
  EloquaError
}
