
export class TaskServices {
  #token = ''

  constructor () {
    this.#token = localStorage.getItem('token')
  }

  registerUser(user) {
    return new Promise((resolve, rej) => {
      try {
        let url = 'https://api-nodejs-todolist.herokuapp.com/user/register'
        const userBody = JSON.stringify(user)

        fetch(url, {
          method: 'POST',
          body: userBody,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        }).then((res) => {
          return res.json()
        }).then((response) => {
          localStorage.setItem('token', response.token)
          resolve(response)
        })
      } catch (e) {
        rej(e)
      }
    })
  }

  logInUser(user) {
    return new Promise((resolve, rej) => {
      try {
        let url = 'https://api-nodejs-todolist.herokuapp.com/user/login'
        const userBody = JSON.stringify(user)

        fetch(url, {
          method: 'POST',
          body: userBody,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        }).then((res) => {
          return res.json()
        }).then((response) => {
          localStorage.setItem('token', response.token)
          resolve(response)
        })

      } catch (e) {
        rej(e)
      }
    })
  }

  fetchTasks() {
    return new Promise((resolve, rej) => {
      try {
        let url = 'https://api-nodejs-todolist.herokuapp.com/task'

        fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.#token}`
          }
        }).then((res) => {
          return res.json()
        }).then((response) => resolve(response))
      } catch (e) {
        rej(e)
      }
    })
  }

 addTask(task) {
  return new Promise((resolve, rej) => {
    try {
      let url = 'https://api-nodejs-todolist.herokuapp.com/task'
      const taskBody = JSON.stringify(task)

      fetch(url, {
        method: 'POST',
        body: taskBody,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.#token}`
        }
      }).then((res) => {
        return res.json()
      }).then((response) => {
        resolve(response)
      })
    } catch (e) {
      rej(e)
    }
  })
  }

  deleteTask(id) {
    return new Promise((resolve, rej) => {
      try {
        let url = `https://api-nodejs-todolist.herokuapp.com/task/${id}`

        fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.#token}`
          }
        }).then((res) => {
          return res.json()
        }).then((response) => {
          resolve(response)
        })
      } catch (e) {
        rej(e)
      }
    })
  }

  updateTask(id, isDone) {
    return new Promise((resolve, rej) => {
      try {
        let url = `https://api-nodejs-todolist.herokuapp.com/task/${id}`
        const taskBody = JSON.stringify({completed: isDone})

        fetch(url, {
          body: taskBody,
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.#token}`
          }
        }).then((res) => {
          return res.json()
        }).then((response) => {
          resolve(response)
        })
      } catch (e) {
        rej(e)
      }
    })
  }
}