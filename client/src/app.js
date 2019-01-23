class App {
  constructor() {
    this.adapter = new Adapter(); //adapter class is the same as calling it API class

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleNewFormSubmit = this.handleNewFormSubmit.bind(this);
    this.createNotes = this.createNotes.bind(this);
    this.addNotes = this.addNotes.bind(this);
    this.reloadList = this.reloadList.bind(this);
    this.addGoBackListener = this.addGoBackListener.bind(this);
    this.clearNotesList = this.clearNotesList.bind(this);
    this.clearNewNoteForm = this.clearNewNoteForm.bind(this);
    this.clearUpdateForm = this.clearUpdateForm.bind(this);
  }

  attachEventListeners() {
    document.querySelector('#notes-list').addEventListener('click', this.handleButtonClick);
    document.querySelector('#update').addEventListener('submit', this.handleFormSubmit);
    document.querySelector('#new-note').addEventListener('submit', this.handleNewFormSubmit);
  }

  createNotes(notes) {
    let array = Array.from(notes)
    array.map(note => {
      new Note(note);
    });
    this.addNotes(array);
  }

  addNotes(array) {
    this.clearAll()
    document.querySelector('#notes-list').innerHTML += this.showAddButton();
    Note.all.forEach(
      note => (document.querySelector('#notes-list').innerHTML += note.renderListItem())
    )
  }

  showAddButton() {
    return `
    <div>
      <button class=add-button >Add a new note</button>
    </div>
    `;
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const id = parseInt(e.target.dataset.id);
    const note = Note.findById(id);
    const title = e.target.querySelector('input').value;
    const content = e.target.querySelector('textarea').value;
    const bodyJSON = { title, content };
    this.adapter.updateNote(note.id, bodyJSON).then(updatedNote => {
      const note = Note.findById(updatedNote.id);
      note.update(updatedNote);
      this.addNotes(Note.all)
    })
  }

  handleNewFormSubmit(e) {
    e.preventDefault();
    this.clearNewNoteForm()
    const title = e.target.querySelector('input').value;
    const content = e.target.querySelector('textarea').value;
    const bodyJSON = { title, content };
    this.adapter.newNote(bodyJSON)
    .then(this.reloadList)
  }

  reloadList(){
    Note.all = []
    this.clearNewNoteForm()
    this.clearUpdateForm()
    return this.adapter.fetchNotes()
    .then(this.createNotes)
  }

  addGoBackListener(){
    document.querySelector('#go-back').addEventListener('click', () => this.addNotes(Note.all))
  }

  handleButtonClick(e) {
    const id = parseInt(e.target.dataset.id);
    const note = Note.findById(id);
    if (e.target.className === "edit-button") {
        document.querySelector('#update').innerHTML = note.renderUpdateForm();
        this.addGoBackListener()
        this.clearNotesList()
    }
    if (e.target.className === "delete-button") {
      //add alert to confirm deletion
      this.adapter.deleteNote(id)
      .then(this.reloadList);
    }
    if (e.target.className === "note-title") {
      document.querySelector('#notes-list').innerHTML = note.showContent(note);
      this.addGoBackListener()
    }
    if (e.target.className === "add-button") {
      if (document.querySelector('#new-note').innerHTML === ``) {
        document.querySelector('#new-note').innerHTML = Note.renderNewForm();
        this.addGoBackListener()
        this.clearNotesList()
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
