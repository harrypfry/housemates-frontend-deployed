import React, { Component } from "react";

import TourHeader from "./TourHeader";
import TourCard from "./TourCard";

import { Loader, Button } from "semantic-ui-react";

import axios from "axios";

class Tours extends Component {
  state = {
    tourData: [
      {
        name: "1001 Desert Dunes Adventure from Dubai",
        price: {
          currency: "AED",
          amount: "448.00"
        },
        intro:
          "Book your 1001 Desert Dunes Adventure from Dubai to off-rode on a dune buggy, dune bash in a 4x4 and take a camel for a ride.",
        images: [
          {
            attribution: {
              license_link: null,
              attribution_link:
                "https://www.triposo.com/api/20190906/redirect/AZUHBLJH/tour/MM__5142839f-cb6a-429d-9767-9e659521b838",
              attribution_text: "Musement",
              license_text: null,
              format: "{attribution}"
            },
            license: null,
            sizes: {
              medium: {
                url:
                  "http://api-images-www.triposo.com/20190906/gAAAAABeOD7P1iz6MxhLmbEEhxqjU9bw7aBopkoeub7ybVw59EWd9E2r6rrS6zAMMxmYB9iAUMChOFtbtBsylIHe006aWFN3YnhZRcuSl7CuGTeQzeDXPJXUp_xjMVWLDi0nnwVJMSiR1F848ZdL8HkjPERra5z-XOTsSTujZpjkz4i8bQU6neDxDUqIkk1kMQkTodIoVWXWDkOv1g3ZwXA4tcVcq10APc2xRzFQxvppFKK2xbmEeDZpgOHdtG6gIHrz_qESIxU7Qg8HbaumSxFN2ENErhx4JuIjOSVwc4xGXa_QxIxcjZw=",
                width: 640,
                format: "jpg",
                bytes: 32551,
                height: 428
              },
              original: {
                url:
                  "https://images.musement.com/cover/0002/91/thumb_190027_cover_header.jpeg",
                width: 1024,
                format: "jpg",
                bytes: 69882,
                height: 685
              },
              thumbnail: {
                url:
                  "http://api-images-www.triposo.com/20190906/gAAAAABeOD7PUn3RtG_8aTbBU58GM3dkrVB2pCplM2Cly0S5Lrs4BgmiUx3rT4wfcmHczBNiPoNoe62f-HZ60yWv3T3-yy4WBOrnvcynIxPbMZ4U9hzcir76t-f-M4fsuQ3Sr0W9ZejC4HqYyLAoH0VzXXg18ymCrxSYbFn8Zj2x9smhhMvvMryB4zt--VOfFA7kEeQBU-cl7sAhACWEVumYhsYL_z3ee9f22SEOdqQl1lbvaJ8MHEOZcnnVMLHXB-xM3hZFPxVEPEacDJ-2Z-P9PklY8IeqAw==",
                width: 192,
                format: "jpg",
                bytes: 5585,
                height: 128
              }
            },
            owner: "Musement",
            source_url:
              "https://images.musement.com/cover/0002/91/thumb_190027_cover_header.jpeg",
            caption: null,
            source_id: "musement",
            owner_url:
              "https://www.triposo.com/api/20190906/redirect/AZUHBLJH/tour/MM__5142839f-cb6a-429d-9767-9e659521b838"
          }
        ],

        structured_content: {
          images: [],
          attribution: [
            {
              source_id: "musement",
              url:
                "https://www.triposo.com/api/20190906/redirect/AZUHBLJH/tour/MM__5142839f-cb6a-429d-9767-9e659521b838"
            }
          ],
          sections: [
            {
              body:
                "<p>Explore the magnificent desert near Dubai with three exciting activities: buggy riding, dune bashing, and camel riding. Experience an off-road adventure like no other, exploring the deserts of Arabia has never been more exciting. Get your heart racing with excitement by riding a 2-seated, 800 CC buggy on the desert dunes guided by an experienced leader. During the break you can get a taste of the traditions of the Arab world by enjoying an exciting camel ride.\nThe tour will start with a pickup from your hotel in Dubai. You will then be transferred to the desert to start your tour including 3 activities: buggy riding, dune bashing, and camel riding. For your comfort and safety each dune buggy comes equipped with a full roll cage, bucket seats, and a full safety harness. After the tour, you will be transferred back to your hotel in Dubai.</p>",
              labels: [],
              body_images: [],
              title: "",
              topics: [],
              object_type: null,
              coordinates: null,
              summary:
                "<p>Explore the magnificent desert near Dubai with three exciting activities: buggy riding, dune bashing, and camel riding. Experience an off-road adventure like no other, exploring the deserts of Arabia has never been more exciting. Get your heart racing with excitement by riding a 2-seated, 800 CC buggy on the desert dunes guided by an experienced leader. During the break you can get a taste of the traditions of the Arab world by enjoying an exciting camel ride. The tour will start with a pickup from your hotel in Dubai. You will then be transferred to the desert to start your tour including 3 activities: buggy riding, dune bashing, and camel riding.</p>",
              object_id: null,
              sections: []
            }
          ]
        },
        booking_info: {
          vendor_object_id: "5142839f-cb6a-429d-9767-9e659521b838",
          price: {
            currency: "AED",
            amount: "448.00"
          },
          vendor_object_url:
            "https://www.triposo.com/api/20190906/redirect/AZUHBLJH/tour/MM__5142839f-cb6a-429d-9767-9e659521b838",
          vendor: "musement"
        },
        id: "MM__5142839f-cb6a-429d-9767-9e659521b838"
      }
    ],
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
    let url = `http://triposo.com/api/20190906/tour.json?location_ids=Melbourne&order_by=${this.state.sortOrder}&offset=${this.state.currentOffset}&count=${this.state.resultsPerPage}&annotate=converted_price:AED&fields=intro,name,price,id,images,structured_content,booking_info,score&account=AZUHBLJH&token=luhn0k0fhlou5m4h52poe8c0fjpejzwt`;

    if (this.state.searchTerm !== "") {
      url += `&annotate=trigram:${this.state.searchTerm}&trigram=>=0.15`;
    }

    axios.get(url).then(({ data }) => {
      this.setState({
        tourData: data.results,
        tourDataLoaded: true,
        moreData: data.more
      });
    });
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
