/* model retour des erreurs
try {
    if (tab[5]) {
        console.log(" element existant");

    } else {
        throw new Error('cet element n\'existe pas ')
    }

} catch (error) {
    console.error(error)
}


*/
//
// -------------- partie une --------------------
//      -- Creation --
//  * selectionner le chanmp text dans le block todo
//  * capturer le text dans le champ text
//  * effacer le contenu du chanmp
//  * ajouter un element a la liste contenant le text capturer
//
// -------------- partie deux --------------------
//      -- Edition --
// au click sur une todo barrer
//      * si click sur le btn edite capturer le text
//      * mettre le text dans le champ
//      * si
//          * valider (partie une)
//      * sinon ne rien faire
//
// ---------------- Partie trois -------------------
//      -- suppretion --



class ToDoList {

  /**
   * constructor - Description
   *
   * @param {string} selector Description
   *
   * @returns {HTMLElement} Description
   */
  constructor (selector) {
    this.container = selector
    this.input = this.container.querySelector('.js-input')
    this.listToDos = this.container.querySelector('.js-todos')
    this.btnEdit = this.container.querySelectorAll('[data-action = "editToDo"]')
    this.btnremove = this.container.querySelectorAll('[data-action = "removeToDo"]')
    this.addTodo()
    this.editToDo(this.btnEdit)
    this.completeToDo()
    this.removeTodo()
  }

  /**
   * addTodo - main function to add todo
   *
   * @returns {HTMLElement} The new todo
   */
  addTodo () {
    let btnAdd = this.container.querySelector('[data-action = "addToDo"]')
    btnAdd.addEventListener('click', () => {
      let contentToDo = this.input.value
      if (contentToDo !== "") {
        if (!this.container.querySelector('.js-is-edited')) {
          this.creatElementList(contentToDo)
        } else {
          let editedToDo = this.container.querySelector('.js-is-edited ')
          let correcteToDo = editedToDo.querySelector('.js-txt-todo')
          correcteToDo.innerText = contentToDo
          editedToDo.classList.remove('js-is-edited')
        }
        this.input.value = ''
      } else {
        return false
      }
      this.btnEdit = this.container.querySelectorAll('[data-action = "editToDo"]')
      this.btnremove = this.container.querySelectorAll('[data-action = "removeToDo"]')
      this.editToDo(this.btnEdit)
      this.removeTodo(this.btnremove)
    })
  }
  editToDo (btnEdit) {

    btnEdit.forEach(elem => {
      elem.addEventListener('click', () => {

        elem.parentNode.parentNode.classList.add('js-is-edited')

        let contentText = elem.parentNode.parentNode.querySelector('.js-txt-todo')
        this.input.value = contentText.innerHTML
        console.log( contentText.innerHTML)
      })
    })

  }

  completeToDo () {
    let todos = this.listToDos.querySelectorAll('.panel-block')
    todos.forEach(todo => {
      todo.addEventListener('click', () => {
        todo.classList.toggle('js-is-completed')
      })
    })
  }
  removeTodo (btnremove) {
    btnremove.forEach(removetodo => {
      removetodo.addEventListener('click', () => {
        let toRemove = removetodo.parentNode.parentNode
        toRemove.remove()
      })
    })
  }

  /**
   * creatElementList - create To-do container html
   *
   * @param {string} innerText Description
   *
   * @returns {HTMLElemnt} Description
   */
  creatElementList(innerText) {
    let newToDo = document.createElement("a")
    newToDo.classList.add('panel-block')

    let newToDoIcon = document.createElement("span")
    newToDoIcon.classList.add('panel-icon')

    let newToDoIconFa = document.createElement("i")
    newToDoIconFa.classList.add('fas')
    newToDoIconFa.classList.add('fa-check')

    let newText = document.createElement("span")
    newText.classList.add('js-txt-todo')
    newText.innerHTML = innerText

    let btnAction = document.createElement("span")
    btnAction.classList.add('buttons')
    btnAction.classList.add('has-addons')
    // btn Edit
    let btnEdit = document.createElement("span")
    btnEdit.classList.add('button')
    btnEdit.dataset.action = 'editToDo'
    let editIcone = document.createElement("i")
    editIcone.classList.add('fas')
    editIcone.classList.add('fa-edit')
    btnEdit.appendChild(editIcone)
    // btn remove
    let btnRemoveToDo = document.createElement("span")
    btnRemoveToDo.classList.add('button')
    btnRemoveToDo.dataset.action = 'removeToDo'
    let btnRemoveToDoIcone = document.createElement("i")
    btnRemoveToDoIcone.classList.add('fas')
    btnRemoveToDoIcone.classList.add('fa-trash-alt')
    btnRemoveToDo.appendChild(btnRemoveToDoIcone)
    /// btns
    btnAction.appendChild(btnEdit)
    btnAction.appendChild(btnRemoveToDo)

    newToDoIcon.appendChild(newToDoIconFa)
    newToDo.appendChild(newToDoIcon)
    newToDo.appendChild(newText)
    newToDo.appendChild(btnAction)

    this.listToDos.prepend(newToDo)
  }
}

new ToDoList(document.querySelector('.panel'))
