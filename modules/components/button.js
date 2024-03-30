const Button = {
  createBtn: (cl, title) => {
    let btn = document.createElement('button')
    btn.classList.add(`btn-${cl}`)
    btn.textContent = title
    btn.setAttribute('type', 'submit')

    return btn
  },
}

export const createBtn = Button.createBtn
