import React, { useState } from "react";
import NFTCard from "./NFTCard";

import * as kryptoBirdActions from "../redux/actions/kryptoBirdActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Modal } from "react-bootstrap";
import TransferForm from "./TransferForm";

function NFTCardsContainer(props) {
  const { kbirds, account, kbird } = props;
  const [showModal, setshowModal] = useState(false);

  const openModal = async (index) => {
    setshowModal(true);
    await fetchKbirdDetails(index);
  };

  const transferNFT = async (to) => {
    console.log(to);
    const { kbird } = props;
    try{
      await props.actions.transferNFT(kbird, to);
    }
    catch(err){
      console.log(err)
    }    
  };

  const fetchKbirdDetails = async (id) => {
    const { kryptoBirdz } = props;
    await props.actions.setNFTDetails(id, kryptoBirdz[id]);
  };

  const kBirdCards =
    kbirds &&
    kbirds[0] &&
    kbirds.map((kbird, index) => {
      return (
        <NFTCard
          key={index}
          kbird={kbird}
          kbirdIndex={index}
          onTransfer={openModal}
        />
      );
    });
  return (
    <>
      <div className="d-flex flex-sm-row flex-md-row flex-lg-row flex-wrap justify-content-around">
        {kBirdCards}
      </div>
      {props.kbird && (
        <Modal
          show={showModal}
          fullscreen="sm-down"
          centered
          onHide={() => setshowModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Transfer NFT</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="small fw-bold text-center">
              Make sure you are either owner or got approved to transfer the NFT
            </p>
            <TransferForm transferNFT={transferNFT} kbird={kbird} account={account} close={()=>setshowModal(false)}/>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    contract: state.kryptoBirdzData.contract,
    kryptoBirdz: state.kryptoBirdzData.kryptoBirdz,
    kbird: state.kryptoBirdzData.currentKbird,
    account: state.kryptoBirdzData.address,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(kryptoBirdActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NFTCardsContainer);
