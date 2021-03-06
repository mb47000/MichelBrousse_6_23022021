class PhotographerPage {

  getPage = () =>{
  return  `<div>Page d'un photographe ${this.props.name}</div><a href="/" class="a-navigation">home page</a>`;}

  addProps = (props) => {
    this.props = props;
    return this;   
  };
}

export default PhotographerPage;
