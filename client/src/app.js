class App {
  constructor() {
    this.adapter = new Adapter(); //adapter class is the same as calling it API class

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleNewFormSubmit = this.handleNewFormSubmit.bind(this);
    this.createNotes = this.createNotes.bind(this);
    this.addNotes = this.addNotes.bind(this);
    this.reloadList = this.reloadList.bind(this);
    //this.addGoBackListener = this.addGoBackListener.bind(this);
    this.clearNotesList = this.clearNotesList.bind(this);
    this.clearNewNoteForm = this.clearNewNoteForm.bind(this);
    this.clearUpdateForm = this.clearUpdateForm.bind(this);
    this.showErrors = this.showErrors.bind(this);
  }

  attachEventListeners() {
    document.querySelector('body').addEventListener('click', this.handleButtonClick);
    document.querySelector('#update').addEventListener('submit', this.handleFormSubmit);
    document.querySelector('#new-note').addEventListener('submit', this.handleNewFormSubmit);
  }

  createNotes(notes) {
    let array = Array.from(notes)
    array.map(note => {
      new Note(note);
    });
    console.log(Note.all)
    this.addNotes(array);
  }

  addNotes(array) {
    this.clearAll()
    document.querySelector('.add-button-wrapper').innerHTML = this.showAddButton();
    Note.all.forEach(
      note => (document.querySelector('#notes-list').innerHTML += note.renderListItem())
    )
  }

  showAddButton() {
    return `
      <button class="add-button" ><span>+</span></button>
    `;
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const id = parseInt(e.target.dataset.id);
    const note = Note.findById(id);
    const title = e.target.querySelector('input').value;
    const content = e.target.querySelector('textarea').value;
    const bodyJSON = { title, content };
    if (title === "Title can't be blank") {
      return this.showErrors(title)
    }
    this.adapter.updateNote(note.id, bodyJSON).then(updatedNote => {
      if  (Object.keys(updatedNote)[0] === "errors") {
        const errors = updatedNote.errors;
        return this.showErrors(errors[0])
      }
      const note = Note.findById(updatedNote.id);
      console.log(updatedNote)
      note.update(updatedNote);
      this.addNotes(Note.all)
    })
  }

  handleNewFormSubmit(e) {
    e.preventDefault();
    const title = e.target.querySelector('input').value;
    const content = e.target.querySelector('textarea').value;
    const bodyJSON = { title, content };
    if (title === "Title can't be blank") {
      return this.showErrors(title)
    }
    this.adapter.newNote(bodyJSON)
    .then(data => {
      if (data === undefined) {
        this.reloadList()
      }
      else {
        this.showErrors(data)
      }
    })
  }

  showErrors(data) {
    document.querySelector("input").value = data
  }

  reloadList(){
    Note.all = []
    this.clearNewNoteForm()
    this.clearUpdateForm()
    return this.adapter.fetchNotes()
    .then(this.createNotes)
  }

  handleButtonClick(e) {
    const id = parseInt(e.target.dataset.id);
    const note = Note.findById(id);
    if (e.target.className === "edit-button") {
        document.querySelector('#update').innerHTML = note.renderUpdateForm();
    }

    if (e.target.classList.contains("go-back")) {
        this.addNotes(Note.all)
    }
    if (e.target.className === "delete-button") {
      //add alert to confirm deletion
      this.adapter.deleteNote(id)
      .then(this.reloadList);
    }
    if (e.target.className === "note-title") {
      document.querySelector('#notes-list').innerHTML = note.showContent(note);
    }
    if (e.target.className === "add-button") {
      if (document.querySelector('#new-note').innerHTML === ``) {
        document.querySelector('#new-note').innerHTML = Note.renderNewForm();
        this.clearUpdateForm()
      }
    }
  }

  clearNotesList(){
    document.querySelector('#notes-list').innerHTML = ``
  }

  clearNewNoteForm(){
    document.querySelector('#new-note').innerHTML = ``
  }

  clearUpdateForm(){
    document.querySelector('#update').innerHTML = ''
  }

  clearAll(){
    this.clearNotesList()
    this.clearUpdateForm()
    this.clearNewNoteForm()
  }
}
