import React, { Component } from "react";
import Newsitem from "./Newsitem";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";


export default class News extends Component {
    pageSize = 3;
    capatialize = (string) => {
    let b = string;
    let a = string.toUpperCase();
    return a.charAt() + b.substring(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capatialize(this.props.category)}-Newsmonkeys`;
  }
  async Update(){
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.pageSize}`;
     this.setState({
      loading:true
     })
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
     this.setState({
     articles: parsedData.articles,
     totalResults: parsedData.totalResults,
     loading:false
    });
    this.props.setProgress(100);
  };
  async componentDidMount() {
    this.Update();
  }
  fetchMoreData = async () => {
    
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.pageSize}`;
     this.setState({
      loading:true
     })
     this.setState({
      page: this.state.page + 1,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
};
render() {
    return (
      <>
        <h2 className={`container text-center `} style={{marginTop:'70px' }}>
          NewsMonkey's: Top {this.capatialize(this.props.category)} HeadLines
        </h2>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loader />}
        >
          <div className="container">
            <div className="row ">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <Newsitem
                      title={element.title ? element.title.slice(0, 40) : ""}
                      desc={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      publishedAt={element.publishedAt}
                      author={element.author ? element.author : "Unknown"}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}
