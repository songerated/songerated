import React, { Component } from "react";
import TeamMember from "./TeamMember";
class Teamcard extends Component {
  state = {
    data: [],
    per: 9,
    page: 1,
    total_pages: null
  };

  uppercase = word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  loadData = () => {
    const { per, page, data } = this.state;
    const endpoint = `https://randomuser.me/api/?nat=us&results=${per}&page=${page}`;
    fetch(endpoint)
      .then(response => response.json())
      .then(json => {
        this.setState({
          data: [...data, ...json.results],
          scrolling: false,
          total_pages: json.info.results
        });
      });
  };

  loadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
        scrolling: true
      }),
      this.loadData
    );
  };

  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <div className="clearfix">
        <div className="row">
          <TeamMember name="Aditya Gupta" bio="Hi, I'm Aditya, an Android Developer, who loves exploring different stuff. Currently I'm a 3rd year ISE student @NIE. I am a potterhead and greek mythology enthusiast who mainly programs in Kotlin. I am also trying out ML to see what all the fuss is about and might actually ❤ it." github="aadityaguptaa"/>
          <TeamMember name="Aprameya L" bio="To pursue my career in a growing organization where i can get the opportunity to prove my abilities by accepting challenges, fulfilling the organization goal and climb the career ladder through continuous learning and commitment. Looking for an opportunity to enhance my skills as well as personal growth with better career prospects" github="aprameya-l"/>
          <TeamMember name="Deepthi Nanjunda" bio="something something" github="deepthi-nanjunda"/>
          <TeamMember name="Achaiah CD" bio="Spends his free time playing football, reading novels and acquiring queer pieces of knowledge. Has an affinity for fantasy and epic novels. Loves watching football, good cinema and tinkering around with computers. Also tries his hand in cardistry and sleight of hand. Interested in cyber security and investing." github="Achaiah-CD"/>
        </div>
      </div>
    );
  }
}

export default Teamcard;