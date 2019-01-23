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
    <h2 class=note-header > ${this.title} </h2>
    <h3 class=note-content > ${this.content} </h3>
    <a id=go-back > Go back to all notes</a>
    `
  }

  renderListItem() {
    return `
    <div>
      <ul>
        <li>
          <h3 class=note-title data-id=${this.id}>${this.title}
            <button class=edit-button data-id=${this.id}>Edit</button>
            <button class=delete-button data-id=${this.id}>Delete</button>
          </h3>
        </li>
      </ul>
    </div>
    `
  }

  static findById(id) { // static methods are called on the class itself (rather than an instance of the class)
    return this.all.find(note => note.id === id);
  }
  renderUpdateForm() {
    return `
    <form data-id=${this.id}>
      <label>Title</label>
      <p>
        <input type="text" value="${this.title}" />
      </p>
      <label>Content</label>
      <p>
        <textarea>${this.content}</textarea>
      </p>
      <button class=save type='submit'>Save Changes</button>

      <a id=go-back data-id=${this.id}> Go back to all notes</a>
    </form>
  `;
  }

  static renderNewForm() {
    return `
    <form >
      <label>Title</label>
      <p>
        <input type="text" value="" />
      </p>
      <label>Content</label>
      <p>
        <textarea></textarea>
      </p>
      <button class=save type='submit'>Save Note</button>
      <a id=go-back > Go back to all notes</a>
    </form>
  `;
  }
}

Note.all = [];
