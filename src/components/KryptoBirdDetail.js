import React, { useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";

import * as kryptoBirdActions from "../redux/actions/kryptoBirdActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { ListGroup, Image, Button } from "react-bootstrap";

function KryptoBirdDetail(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(props);
  useEffect(() => {
    const fetchKbirdDetails = async () => {
      const { contract, kryptoBirdz } = props;
      await props.actions.setNFTDetails(contract, id, kryptoBirdz[id]);
    };
    fetchKbirdDetails();
  }, []);

  return props.kbird ? (
    <div className="mt-3 ms-3 d-flex flex-column flex-sm-row flex-md-row flex-lg-row justify-content-between align-items-center">
      <div className="border border-dark p-2 w-50 flex-shrink-0">
        <Image
          className="d-block ms-auto me-auto"
          src={props.kbird.name}
          fluid
        />
      </div>
      <div className="flex-grow-1 ms-3 p-5">
        <div>
          <h1 className="font-weight-light text-primary text-center">
            Krypto Bird
          </h1>
          <ListGroup variant="flush" className="mt-5 border rounded">
            <ListGroup.Item
              action
              variant="dark"
              className="text-left font-weight-bold"
            >
              Token : {props.kbird.tokenId}
            </ListGroup.Item>
            <ListGroup.Item
              action
              variant="dark"
              className="text-left font-weight-bold"
            >
              Owner : {props.kbird.owner}
            </ListGroup.Item>
          </ListGroup>
          <div className="mt-3 d-flex flex-row justify-content-around">
            <Button
              variant="secondary"
              className="btn-block m-2 w-25"
              onClick={()=>navigate('/')}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

const mapStateToProps = (state) => {
  return {
    contract: state.kryptoBirdzData.contract,
    kryptoBirdz: state.kryptoBirdzData.kryptoBirdz,
    kbird: state.kryptoBirdzData.currentKbird,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(kryptoBirdActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KryptoBirdDetail);
