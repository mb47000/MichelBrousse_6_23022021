class PhotographerPage {
  constructor(data) {
    this.photographers = data;
  }
  
  getHtml = () =>{
  return  `<div>Page d'un photographe ${this.photographers[+this.props.id].name}</div><a href="/">home page</a>`;}

  addProps = (props) => {
    this.props = props;
    return this;
    
  };
}

export default PhotographerPage;
