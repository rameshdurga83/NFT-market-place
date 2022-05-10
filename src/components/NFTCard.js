import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./NFTCard.scss";

function NFTCard({ kbird , kbirdIndex, onTransfer}) {

  const navigate = useNavigate();

  const viewDetails = () =>{
    navigate(`./kryptoBird/${kbirdIndex}`);
  }

  return (
    <div className="NFTCard">
      <Card className="m-2" border="info">
        <Card.Header className="text-center">KryptoBird</Card.Header>
        <Card.Img variant="top" src={kbird} className="NFTCard_image" />
        <Card.Body>
          <Card.Title className="text-center">Details</Card.Title>
          <Card.Text>
            This is an algorithmically generated KryptoBird. This is an NFT and
            each NFT can be owned by single user
          </Card.Text>
        </Card.Body>
        <div className="d-flex flex-row justify-content-around">
          <Button variant="outline-primary" onClick={viewDetails} className="mb-2 btn-block">
            View Details
          </Button>
          <Button variant="outline-warning" onClick={()=>{onTransfer(kbirdIndex)}} className="mb-2 btn-block">
            Transfer NFT
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default NFTCard;
