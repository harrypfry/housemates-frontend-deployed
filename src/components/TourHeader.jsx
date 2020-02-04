import React from "react";

import { Menu, Header, Dropdown } from "semantic-ui-react";

import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const TourHeader = props => {
  const { activeSortOrder, changeSortOrder, changeResultsPerPage } = props;

  return (
    <div>
      <Header as="h2" className="tour-page-header">
        Tours in Melbourne
      </Header>
      <Menu className="tour-page-menu" text>
        <Menu.Menu className="tour-page-menu-container" position="right">
          <Dropdown item text="Results Per Page">
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => changeResultsPerPage(5)}>
                5
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeResultsPerPage(10)}>
                10
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item header className="tour-page-menu-item">
            Sort By
          </Menu.Item>
          <Menu.Item
            className="tour-page-menu-item"
            name="name"
            active={activeSortOrder === "name"}
            onClick={() => changeSortOrder("name")}
          >
            A-Z
          </Menu.Item>
          <Menu.Item
            className="tour-page-menu-item"
            name="price-up"
            active={activeSortOrder === "price-up"}
            onClick={() => changeSortOrder("converted_price")}
          >
            Price&nbsp;
            <FaArrowUp />
          </Menu.Item>
          <Menu.Item
            className="tour-page-menu-item"
            name="price-down"
            active={activeSortOrder === "price-down"}
            onClick={() => changeSortOrder("-converted_price")}
          >
            Price&nbsp;
            <FaArrowDown />
          </Menu.Item>
          <Menu.Item
            className="tour-page-menu-item"
            name="-score"
            active={activeSortOrder === "-score"}
            onClick={() => changeSortOrder("-score")}
          >
            Rating
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default TourHeader;
