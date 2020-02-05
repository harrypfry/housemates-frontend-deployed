import React, { Component } from "react";

import { Item, Modal, Header, Button } from "semantic-ui-react";

import { FaStar } from "react-icons/fa";

class TourCard extends Component {
  state = { modalOpen: false };

  toggelModal = () => {
    this.setState(currentState => {
      return { modalOpen: !currentState.modalOpen };
    });
  };

  render() {
    const { data } = this.props;

    return (
      <div>
        <Item className="tour-card-item">
          <div className="tour-card-col1">
            <div className="tour-card-row1">
              <Item.Header
                className="tour-card-header"
                onClick={this.toggelModal}
              >
                {data.name}
              </Item.Header>
              <Item.Extra className="tour-card-rating">
                {data.score.toFixed(2)}&nbsp;
                <FaStar className="rating-star" />
              </Item.Extra>
            </div>
            <Item.Description className="tour-card-vendor">
              by&nbsp;{data.booking_info.vendor}
            </Item.Description>
            <Item.Description className="tour-card-intro">
              {data.intro}
            </Item.Description>
            <Item.Description className="tour-card-price">
              ${data.booking_info.price.amount}
            </Item.Description>
          </div>
          <div className="tour-card-row2">
            <img
              className="tour-card-image"
              src={data.images[0].sizes.thumbnail.url}
              alt="tour-card"
            />
          </div>
        </Item>
        <Modal
          dimmer={"blurring"}
          open={this.state.modalOpen}
          onClose={() => this.setState({ modalOpen: false })}
        >
          <Modal.Header className="modal-image-container">
            <img
              className="modal-image"
              src={data.images[0].sizes.medium.url}
              alt={data.name}
            />
          </Modal.Header>
          <Modal.Content>
            <Header className="modal-title">{data.name}</Header>
            {data.structured_content.sections[0].body.replace(
              /<\/?[^>]+>/gi,
              ""
            )}
          </Modal.Content>
          <div className="modal-button-container">
            <Button
              className="modal-button"
              color="blue"
              onClick={() =>
                window.open(
                  data.structured_content.attribution[0].url,
                  "_blank"
                )
              }
            >
              Go to Website...
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default TourCard;
