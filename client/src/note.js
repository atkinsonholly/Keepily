class Note {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.content = data.content;
    Note.all.push(this);
  }

  update({ title, content }) {
    this.title = title;
    this.content = content;
  }

  showContent(note){
    return `
    <div class="buttons-nav">
      <div class="go-back" >
        <img src="./images/left-arrow.svg" alt="back to all notes"/>
      </div>
      <div class="buttons-wrapper">
        <button class="edit-button" data-id=${this.id}>
        <img src="./images/edit.svg" alt="edit note"/>
        </button>
        <button class="delete-button" data-id=${this.id}>
        <img src="./images/garbage.svg" alt="delete note"/>
        </button>
      </div>
    </div>
    <h2 class="note-header" > ${this.title} </h2>
    <p class="note-content" > ${this.content} </p>
    `
  }

  renderListItem() {
    return `
    <li>
      <h3 class="note-title" "active" data-id=${this.id}>${this.title}
      </h3>
      <div class="buttons-wrapper">
        <button class="edit-button" data-id=${this.id}>
        <img src="./images/edit.svg" alt="edit note"/>
        </button>
        <button class="delete-button" data-id=${this.id}>
        <img src="./images/garbage.svg" alt="delete note"/>
        </button>
      </div>
    </li>
    `
  }

  static findById(id) { // static methods are called on the class itself (rather than an instance of the class)
    return this.all.find(note => note.id === id);
  }
  renderUpdateForm() {
    return `
    <div class="form-wrapper">
      <form data-id=${this.id}>
        <label>Title</label>
        <input type="text" value="${this.title}" />
        <label>Content</label>
        <textarea rows="7" cols="40">${this.content}</textarea>
        <div class="form-nav-buttons">
          <button class="save" type='submit'>Save</button>
          <div class="go-back" >
            <img src="./images/left-arrow.svg" alt="back to all notes"/>
          </div>
        </div>
      </form>
    </div>
  `;
  }

  static renderNewForm() {
    return `
    <div class="form-wrapper">
      <form >
        <label>Title</label>
        <input type="text" value="" />
        <label>Content</label>
        <textarea rows="7" cols="40"></textarea>
        <div class="form-nav-buttons">
          <button class="save" type='submit'>Save</button>
          <div class="go-back" >
            <img src="./images/left-arrow.svg" alt="back to all notes"/>
          </div>
        </div>
      </form>
    </div>
  `;
  }
}

Note.all = [];
