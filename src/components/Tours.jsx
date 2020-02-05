import React, { Component } from "react";

import TourHeader from "./TourHeader";
import TourCard from "./TourCard";

import { Loader, Button } from "semantic-ui-react";

import axios from "axios";

class Tours extends Component {
  state = {
    tourDataLoaded: false,
    sortOrder: "name",
    currentOffset: 0,
    moreData: false,
    resultsPerPage: 5,
    searchTerm: ""
  };

  changeSortOrder = order => {
    this.setState({ sortOrder: order, tourDataLoaded: false });
  };

  changeResultsPerPage = num => {
    this.setState({ resultsPerPage: num, tourDataLoaded: false });
  };

  handlePaginate = offset => {
    this.setState(currentState => {
      return {
        currentOffset: currentState.currentOffset + offset,
        tourDataLoaded: false
      };
    });
  };

  componentDidMount = () => {
    this.fetchData();
  };

  searchFunction = term => {
    this.setState({ searchTerm: term, tourDataLoaded: false });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.tourDataLoaded !== this.state.tourDataLoaded) {
      this.fetchData();
    }
  };

  fetchData = () => {
    let url = `https://cors-anywhere.herokuapp.com/http://triposo.com/api/20190906/tour.json?location_ids=Melbourne&order_by=${this.state.sortOrder}&offset=${this.state.currentOffset}&count=${this.state.resultsPerPage}&annotate=converted_price:AED&fields=intro,name,price,id,images,structured_content,booking_info,score&account=AZUHBLJH&token=luhn0k0fhlou5m4h52poe8c0fjpejzwt`;

    if (this.state.searchTerm !== "") {
      url += `&annotate=trigram:${this.state.searchTerm}&trigram=>=0.15`;
    }

    axios({
      method: "get",
      url,
      headers: { "X-Requested-With": "XMLHttpRequest" }
    }).then(({ data }) => {
      this.setState({
        tourData: data.results,
        tourDataLoaded: true,
        moreData: data.more
      });
    });

    // axios.get(url).then(({ data }) => {
    //   this.setState({
    //     tourData: data.results,
    //     tourDataLoaded: true,
    //     moreData: data.more
    //   });
    // });
  };

  render() {
    return (
      <div>
        <TourHeader
          searchFunction={this.searchFunction}
          changeSortOrder={this.changeSortOrder}
          activeSortOrder={this.state.sortOrder}
          changeResultsPerPage={this.changeResultsPerPage}
        />
        {this.state.tourDataLoaded ? (
          this.state.tourData.map(tour => {
            return <TourCard data={tour} key={tour.id} />;
          })
        ) : (
          <Loader active inline="centered" />
        )}

        <div className="offset-buttons">
          {this.state.tourDataLoaded && this.state.currentOffset !== 0 && (
            <Button
              content="Previous"
              color="blue"
              icon="left arrow"
              labelPosition="left"
              onClick={() => this.handlePaginate(-this.state.resultsPerPage)}
            />
          )}
          {this.state.tourDataLoaded && this.state.moreData && (
            <Button
              content="Next"
              color="blue"
              icon="right arrow"
              labelPosition="right"
              onClick={() => this.handlePaginate(this.state.resultsPerPage)}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Tours;
