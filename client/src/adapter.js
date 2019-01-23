class Adapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/v1';
    this.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  fetchNotes() {
    return this.get(`${this.baseUrl}/notes`);
  }

  updateNote(id, body) {
    return this.patch(`${this.baseUrl}/notes/${id}`, body);
  }

  get(url) {
    return fetch(url).then(res => res.json());
  }

  deleteNote(id) {
    return this.delete(`${this.baseUrl}/notes/${id}`);
  }

  newNote(body) {
    return this.post(`${this.baseUrl}/notes/`, body);
  }

  patch(url, body) {
    return fetch(url, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(body),
    }).then(res => res.json());
  }

  post(url, body) {
    return fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body),
    }).then(res => res.json());
  }

  delete(url) {
    return fetch(url, {
      method: 'DELETE',
    }).then(res => res.json());
  }
}
