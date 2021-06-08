import jsCookie from 'js-cookie'

class Cookie {
  constructor ({name}) {
    this.name = name
  }
  get() {
    let cookieValue = jsCookie.get(this.name)
    if (cookieValue) {
      return JSON.parse(cookieValue).token
    } else {
      return null
    }
  }
  set(value) {
    jsCookie.set(this.name, value)
  }
  remove () {
    jsCookie.remove(this.name)
  }
}

const Cookies = {
  AuthToken: new Cookie({name: 'auth' })
}

export default Cookies
