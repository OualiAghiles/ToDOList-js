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
    this.todos = JSON.parse(localStorage.getItem('list')) || [];
    console.log(this.todos);
    if (this.todos.length > 0 ) {
      this.todos.forEach( item => {
        this.listToDos.insertAdjacentHTML('beforeend',
        `<a href="#" class="panel-block">
        <span class="panel-icon"><i class="fas fa-check"></i></span>
        <span class="js-txt-todo">${item}</span>
        <span class="js_action_button">
          <span class=" icon has-text-grey-light" data-action="completedToDo">
            <i class="fas fa-check"></i>
          </span>
          <span class=" is-small is-info is-outlined" data-action="editToDo">
            <i class="fas fa-edit"></i>
          </span>
          <span class=" is-small is-outlined is-danger" data-action="removeToDo">
            <i class="fas fa-trash-alt"></i>
          </span>
        </span> </div>`)
        this.actionBtns(item)
      })
    }
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
      e.stopPropagation()
    })
  }

  addingContent () {
    let contentToDo = this.input.value
      if (contentToDo === "") {
        this.showFeedback('veillez remplir le champ ! ', 'is-danger')
      } else if (contentToDo !== "") {
        if (!this.listToDos.querySelector('.js-is-edited')) {
          this.creatElementList(contentToDo)

          this.actionBtns(contentToDo)
        } else {
          let editedToDo = this.listToDos.querySelector('.js-is-edited ')
          let correcteToDo = editedToDo.querySelector('.js-txt-todo')
          correcteToDo.innerText = contentToDo
          editedToDo.classList.remove('js-is-edited')
          editedToDo.classList.remove('is-active')
        }
        this.todos.push(contentToDo)
        localStorage.setItem('list', JSON.stringify(this.todos))
        this.input.value = ''
      }
      this.input.focus()

  }
  showFeedback (text, cls) {
    let notification = document.querySelector('.notification')
    notification.classList.add(cls)
    notification.classList.remove('is-hidden')
    notification.innerText = text
    setTimeout(() => {
      notification.classList.add('is-hidden')
      notification.classList.remove(cls)
      notification.innerText = ""

    }, 3000);
  }

  /**
   *
   */
  actionBtns (contentToDo) {
    let items = this.listToDos.querySelectorAll('.panel-block')
      items.forEach(item => {
          if (item.querySelector('.js-txt-todo').textContent === contentToDo) {
            this.completedToDo(item.querySelector('[data-action="completedToDo"]'))
            this.editToDo(item.querySelector('[data-action="editToDo"]'))
            this.removeToDo(item.querySelector('[data-action = "removeToDo"]'))

          }
        })
    }
  /**
   *
   * @param btnEdit
   */
  editToDo (elem) {
        elem.addEventListener('click', (e) => {
        let task = elem.parentNode.parentNode
        let contentText = elem.parentNode.parentNode.querySelector('.js-txt-todo')
        this.input.value = contentText.innerHTML
        let text = contentText.innerHTML.toString()
        this.todos = this.todos.filter(function(item) {
          return item !== text;
        })
        task.remove()
        localStorage.setItem('list', JSON.stringify(this.todos))
        this.input.focus()
        e.stopPropagation()
      })
  }

  completedToDo (item) {
    item.addEventListener('click', () => {
      let todo = item.parentNode.parentNode
      todo.classList.toggle('js-is-completed')
    })
  }
  /**
   *
   * @param
   * Description - removeTodo
   */
  removeToDo (removeToDo) {
      removeToDo.addEventListener('click', (e) => {
        e.stopPropagation()
        let toRemove = removeToDo.parentNode.parentNode
        let text = toRemove.querySelector('.js-txt-todo').innerText
        this.todos = this.todos.filter(function(item) {
          return item !== text;
        })
        toRemove.remove()
        localStorage.setItem('list', JSON.stringify(this.todos))
        this.showFeedback ('La tache a bien etais supprimé', 'is-success')
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
    newToDo.innerHTML = `
    <span class="panel-icon"><i class="fas fa-check"></i></span>
    <span class="js-txt-todo">${innerText}</span>
    <span class="js_action_button">
      <span class=" icon has-text-grey-light" data-action="completedToDo">
        <i class="fas fa-check"></i>
      </span>
      <span class=" is-small is-info is-outlined" data-action="editToDo">
        <i class="fas fa-edit"></i>
      </span>
      <span class=" is-small is-outlined is-danger" data-action="removeToDo">
        <i class="fas fa-trash-alt"></i>
      </span>
    </span>`
    this.listToDos.appendChild(newToDo)
  }
}


class Modal {
  constructor (cls) {
    this.modal = cls
    this.target = this.modal.dataset.target
    this.targetModal = document.querySelector('[data-modal = "'+this.target+'"]')
    this.linksTab = document.querySelector('.panel-tabs')

    /*********************** */
    this.tabs = JSON.parse(localStorage.getItem('tabs')) || [];
    console.log(this.tabs);
    if (this.tabs.length > 0 ) {
      this.tabs.forEach( item => {
        this.linksTab.insertAdjacentHTML('beforeend',
        `<a href="${item}">${item}</a>`)
        //this.actionBtns(item)
      })
    }
    /****************************** */
    this.activeModal(this.modal)
    this.closeModal()
    this.addTab()
  }
  activeModal(modal) {
    modal.addEventListener('click' , (e) => {
      e.preventDefault()
      this.targetModal.classList.add('is-active')
      console.log(this.targetModal);
    })
  }
  closeModal () {
    
    let closeModal = this.targetModal.querySelector('.modal-close')
    console.log(closeModal);
      
    closeModal.addEventListener('click', () => {
      console.log(this.targetModal);
      this.targetModal.classList.remove('is-active')  
    })
  }
  addTab () {
    let btnAddTab = this.targetModal.querySelector('[data-tab = "panel-tab"]')
    let newTab = this.targetModal.querySelector('.input')
    btnAddTab.addEventListener('click', () => {
      let titleList = newTab.value
      let linkTab = document.createElement('a')
      linkTab.setAttribute('href', titleList)
      linkTab.innerText = titleList
      this.linksTab.appendChild(linkTab)
      this.targetModal.classList.remove('is-active')
      this.tabs.push(titleList)
      localStorage.setItem('tabs', JSON.stringify(this.tabs))
    })
  }
}

new ToDoList(document.querySelector('.panel'))
new Modal(document.querySelector('[data-target = "addList"]'))