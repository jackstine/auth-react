import jsCookie from 'js-cookie'

class Cookie {
  constructor ({name}) {
    this.name = name
  }
  get() {
    jsCookie.get(this.name)
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
