class Orm {
    constructor(data) {
      if (Orm.exists) {
        return Orm.instance;
      }
      this._data = data;
      Orm.instance = this;
      Orm.exists = true;
      return this;
    }
  
    getData() {
      return this._data;
    }
  
    setData(data) {
      this._data = data;
    }
  }
  
  export default Orm;
