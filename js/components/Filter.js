import React, { Component } from 'react';
import {news}  from '../news-list';

const titleStyle = {textDecoration: 'underline'};

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleChangeLables = this.handleChangeLables.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.state = { newsList: news };
  }

  handleChangeLables(event) {
    if (event.target.value == 'all') {
      this.setState({newsList: news});
    } else {
      const newsList = news.filter(i => i.labels.indexOf(event.target.value) != -1);
      this.setState({newsList});
    }
  }

  handleChangeDate(event) {
    if (event.target.value == 'all') {
      this.setState({newsList: news});
    } else {
      const newsList = news.filter(i => i.date.indexOf(event.target.value) != -1);
      this.setState({newsList});
    }
  }

  render() {
    const selectLableField = (newsList, field, handleChange) => {
      let itemList = [];
      for (let i of newsList) {
        if (field === 'labels')itemList = itemList.concat(i[field]);
        if (field === 'date') itemList.push(i[field]);
      }
      const uniqItemList = Array.from(new Set(itemList));
      return (
        <select key={field} name="lables" onChange={handleChange}>
          <option value="all">all</option>
          {uniqItemList.map(l => <option value={l}>{l}</option>)}
        </select>
      );
    }

    return (
      <div className="row">
        <div className="col-md-1">
          <p>Filter by lable</p>
          {selectLableField(news, "labels", this.handleChangeLables)}
        </div>
        <div className="col-md-2">
          <p>Filter by lable</p>
          {selectLableField(news, "date", this.handleChangeDate)}
        </div>
        <div className="col-md-4">
          <h>news</h>
          {this.state.newsList.map(item => 
            <div>
              <br/>
              <h style={titleStyle}>{item.title}</h>
              <p>{item.text}</p>
              <p>labels: {item.labels.join(', ')}</p> 
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Header;
