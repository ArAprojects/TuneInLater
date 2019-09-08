
const api = {
  
  async fetchAudio(text) {
   const url = `https://itunes.apple.com/search?term=${text}&media=audiobook&lang`
   try {
     const response = await fetch(url);
     if (!response.ok) {
       throw new Error('There was an error getting your data');
     }
     const audiobooks = await response.json();
     console.log(audiobooks.results)
     return audiobooks.results.map(book => ({
       author_name: book.artistName,
       artwork_url: book.artworkUrl100,
       book_name: book.collectionName,
       description: book.description,
       favorite: false,
       book_id: book.collectionId,
       release_date: book.releaseDate,
       primary_genre_name: book.primaryGenreName
     }))
   } catch(error) {
     throw new Error(error.message);
   }
 },

  async createNewUser(userInfo) {
    const url = 'http://localhost:3001/api/v1/users'
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(userInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error('There was an error getting your data');
      }
      const user = await response.json()
      console.log(user)
    } catch(error) {
      throw new Error(error.message);
    }
  },

  async logIn(userInfo) {
    const url = 'http://localhost:3001/api/v1/login'
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(userInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error('There was an error getting your data');
      }
      const user = await response.json()
      console.log(user)
      return user
    } catch(error) {
      throw new Error(error.message);
    }
  },

  async newFavorite(favorite, currentUserID) {
    const url = `http://localhost:3001/api/v1/users/${currentUserID}/bookfavorites`
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(favorite),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error('There was an error getting your data');
      }
      const favoriteData = await response.json()
      console.log(favoriteData)
    } catch(error) {
      throw new Error(error.message);
    }
  }
}

export default api;