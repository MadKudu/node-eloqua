class EloquaError extends Error {
  constructor (err) {
    const { response = {} } = err
    const { status, statusText, data } = response
    super(statusText)
    this.status = status
    this.data = data
  }
}

module.exports = {
  EloquaError
}
