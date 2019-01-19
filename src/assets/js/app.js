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
   
    this.addTodo()
  }

  /**
   * addTodo - main function to add todo
   *
   * @returns {HTMLElement} The new todo
   */
  addTodo () {
    this.input.addEventListener('keypress', (e) => {
      if (e.keyCode == 13) {
        this.addingContent()
      }
      if (e.keyCode == 27) {
        this.input.value = ''
        this.input.blur()
        this.container.querySelector('.is-active').classList.remove('is-active')
      }
    })

    let btnAdd = this.container.querySelector('[data-action = "addToDo"]')
    btnAdd.addEventListener('click', (e) => {
      this.addingContent()
    })
  }
  addingContent () {
    let contentToDo = this.input.value
      if (contentToDo !== "") {
        if (!this.container.querySelector('.js-is-edited')) {
          this.creatElementList(contentToDo)
        } else {
          let editedToDo = this.container.querySelector('.js-is-edited ')
          let correcteToDo = editedToDo.querySelector('.js-txt-todo')
          correcteToDo.innerText = contentToDo
          editedToDo.classList.remove('js-is-edited')
          editedToDo.classList.remove('is-active')
        }
        this.input.value = ''
      } else {
        return false
      }
      this.editToDo()
      this.removeTodo()
      this.completeToDo()

      this.input.focus()
  }
  /**
   *
   * @param btnEdit
   */
  editToDo () {
    let btnEdit = this.container.querySelectorAll('[data-action = "editToDo"]')
    btnEdit.forEach(elem => {
      elem.addEventListener('click', (e) => {

        elem.parentNode.parentNode.classList.add('js-is-edited')
        elem.parentNode.parentNode.classList.add('is-active')

        let contentText = elem.parentNode.parentNode.querySelector('.js-txt-todo')
        this.input.value = contentText.innerHTML
        this.input.focus()
        e.stopPropagation()
      })
    })

  }

  /**
   *
   */
  completeToDo () {
    let todos = this.listToDos.querySelectorAll('.panel-block')
    console.log(todos);
    todos.forEach(todo => {
      todo.addEventListener('click', function(e)  {
        console.log(e);
        console.log(this);

        if (this.classList.contains('js-is-completed')) {
          this.classList.remove('js-is-completed')

        } else {
          this.classList.add('js-is-completed')

        }
      })
    })
    
  }

  /**
   *
   * @param 
   * Description - removeTodo
   */
  removeTodo () {
    let btnremove = this.container.querySelectorAll('[data-action = "removeToDo"]')
    btnremove.forEach(removetodo => {
      removetodo.addEventListener('click', (e) => {
        e.stopPropagation()
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
    btnEdit.classList.add('is-small')
    btnEdit.classList.add('is-info')
    btnEdit.classList.add('is-outlined')

    btnEdit.dataset.action = 'editToDo'
    let editIcone = document.createElement("i")
    editIcone.classList.add('fas')
    editIcone.classList.add('fa-edit')
    btnEdit.appendChild(editIcone)
    // btn remove
    let btnRemoveToDo = document.createElement("span")
    btnRemoveToDo.classList.add('button')
    btnRemoveToDo.classList.add('is-small')
    btnRemoveToDo.classList.add('is-outlined')
    btnRemoveToDo.classList.add('is-danger')
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
