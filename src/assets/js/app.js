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
//      si click sur le btn edite capturer le text
//      mettre le text dans le champ
//      si
//          valider (partie une)
//      sinon ne rien faire
//
// ---------------- Partie trois -------------------
//      -- suppretion --



class ToDoList {

    /**
     * constructor - Description
     *
     * @param {HTMLElemnt} selector Description
     *
     * @returns {type} Description
     */
    constructor (selector) {
      this.container = selector
      this.input = this.container.querySelector('.js-input')
      this.listToDos = this.container.querySelector('.js-todos')

      this.addTodo()
    }

    /**
     * addTodo - Description
     *
     * @returns {type} Description
     */
    addTodo () {
      let btnAction = this.container.querySelector('[data-action = "addToDo"]')
      btnAction.addEventListener('click', () => {
        let contentToDo = this.input.value
         this.creatElementList(contentToDo)
        console.log(newToDoElement);
        this.input.value = ''
      })
    }


    /**
     * creatElementList - Description
     *
     * @param {type} innerText Description
     *
     * @returns {type} Description
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
      newText.innerHTML = innerText
      newToDoIcon.appendChild(newToDoIconFa)
      newToDo.appendChild(newToDoIcon)
      newToDo.appendChild(newText)
      this.listToDos.appendChild(newToDo)
    }
}

new ToDoList(document.querySelector('.panel'))
