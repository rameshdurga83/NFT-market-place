import React, { Component } from "react";

import * as kryptoBirdActions from "../redux/actions/kryptoBirdActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import NFTCardsContainer from "./NFTCardsContainer";
import MintForm from "./MintForm";

class HomePage extends Component {
  componentDidMount = async () => {
    try {
      await this.props.actions.getAddress();
      await this.props.actions.getContract();
      await this.props.actions.getNfts();
      await this.props.actions.getTotalSupply();
    } catch (err) {
      console.error(err);
    }
    if(window.ethereum) {
      window.ethereum.on('chainChanged', async() => {
        await this.props.actions.getAddress();
      })
      window.ethereum.on('accountsChanged', async() => {
        await this.props.actions.getAddress();
      })
  }
  };

  onMint = async (kryptoBird) => {
    try {
      await this.props.actions.mintNFT(kryptoBird);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { kryptoBirdz } = this.props;
    return (
      <div>
        <div className="content ms-auto me-auto opacity-75 text-center">
          <h1 className="text-dark">NFT MARKETPLACE</h1>
          <MintForm onMint={this.onMint} />
        </div>

        <NFTCardsContainer kbirds={kryptoBirdz} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.kryptoBirdzData.address,
    contract: state.kryptoBirdzData.contract,
    kryptoBirdz: state.kryptoBirdzData.kryptoBirdz,
    totalSupply: state.kryptoBirdzData.totalSupply,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(kryptoBirdActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
