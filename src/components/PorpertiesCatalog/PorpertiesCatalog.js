import React from "react";
import "./PorpertiesCatalog.scss";
import { Col, Card } from "antd";
import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from "../../utils/constants";
import { EyeFilled } from "@ant-design/icons";
import { ReactComponent as Logo } from "../../assets/logo/millionAndUpLogo.svg";

export default function PorpertiesCatalog({ properties }) {
  console.log(properties.Properties);
  return properties.Properties.map((property) => (
    <Col key={property.PropertyId} className="properties-catalog">
      <PropertieCard property={property}></PropertieCard>
    </Col>
  ));
}

function PropertieCard(props) {
  const {
    property: { PropertyId, Name, Address, PropertyImageList },
  } = props;
  const { Meta } = Card;
  let posterPath;
  if (PropertyImageList[0])
    posterPath = `${IMAGE_BASE_URL}${PropertyImageList[0]?.Photo}`;
  else posterPath = `${IMAGE_BASE_URL}noImage.jpg`;
  return (
    <Link to={`/property/${PropertyId}`}>
      <Card
        hoverable
        style={{ width: "240px" }}
        cover={<img alt={Name} src={posterPath}></img>}
        actions={<EyeFilled />}
      >
        <Meta title={Name}></Meta>
      </Card>
    </Link>
  );
}
