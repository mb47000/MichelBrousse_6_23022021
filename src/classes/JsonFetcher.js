class JsonFetcher {
  constructor(jsonData) {
    this.jsonData = jsonData;
  }

  async fetchData() {
    try {
      const response = await fetch(this.jsonData);

      if (!response.ok) {
        throw new Error("la requete à échoué");
      } else {
        return response.json();
      }
    } catch (err) {
      console.error(`Erreur: ${err}`);
    }
  }
}

export default JsonFetcher;
