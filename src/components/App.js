import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";

import './App.css';

import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import KryptoBird from "../abis/KryptoBird.json";

class App extends Component {
  async componentDidMount() {
    await this.loadWeb3();
    // await this.loadBlockchainData();
  }

  loadWeb3 = async () => {
    const provider = await detectEthereumProvider();

    if (provider) {
      window.web3 = provider;
      // console.log(provider);
      await this.loadBlockchainData(provider);
    } else {
      console.log("no provider detetcted");
    }
  };

  loadBlockchainData = async (provider) => {
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    //get n/w ID
    const networkId = await web3.eth.net.getId();
    console.log(networkId);

    const networkData = KryptoBird.networks[networkId];
    if (networkData) {
      const abi = KryptoBird.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      this.setState({ contract });

      const totalSupply = await contract.methods.totalSupply().call();
      this.setState({ totalSupply });

      const kryptoBirdz = await contract.methods.getKryptoBirdz().call();
      this.setState({ kryptoBirdz });
      console.log(kryptoBirdz);
    } else {
      window.alert("Smart contract not deployed");
    }
  };

  mint = async (kryptoBird) => {
    const { contract, account } = this.state;
    await contract.methods
      .mint(kryptoBird)
      .send({
        from: account,
      })
      .once("receipt", (receipt) => {
        this.setState({ kryptoBirdz: [...this.state.kryptoBirdz, kryptoBird] });
      });
  };

  onMint = async (event) => {
    event.preventDefault();
    const kryptoBird = this.textInput.current.value;

    await this.mint(kryptoBird);
	
  };

  constructor(props) {
    super(props);

    this.state = {
      account: "",
      contract: {},
      totalSupply: 0,
      kryptoBirdz: [],
    };

    this.textInput = React.createRef();
  }

  render() {
    const { account } = this.state;
    return (
      <div className="container-filled">
        <nav className="navbar navabar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <div className="navbar-brand col-sm-3 col-md-3 mr-0 text-white">
            Krypto Birdz NFTs (Non Fungible Tokens)
          </div>
          <ul className="nav px-3">
            <li className="nav-item text-nowrap">
              <small className="text-white"> {account} </small>
            </li>
          </ul>
        </nav>

        <div className="container-fluid mt-1">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto opacity-75">
                <h1 className="text-dark">kryptoBirdz NFT Marketplace</h1>
                <Form onSubmit={this.onMint}>
                  <Form.Control
                    className="mb-1"
                    type="text"
                    placeholder="Enter the file location"
                    ref={this.textInput}
                  />
                  <Button variant="primary" type="submit">
                    Mint
                  </Button>
                </Form>
              </div>
            </main>
          </div>

          <hr></hr>
          <div className="row text-center">
            {this.state.kryptoBirdz.map((kryptoBird, key) => {
              return (
                <div key={key}>
                  <div>
                    <MDBCard
                      className="token img"
                      style={{ maxWidth: "22rem" }}
                    >
                      <MDBCardImage
                        src={kryptoBird}
						height='200rem'
                        position="top"
                        alt="Krypto Bird"
                        style={{ marginRight: "4px" }}
                      />
                      <MDBCardBody>
                        <MDBCardTitle>Krypto Bird</MDBCardTitle>
                        <MDBCardText>
                        	krypto Birds are NFTs which can be owned by a single person
                        </MDBCardText>
                        <MDBBtn href="#">Download</MDBBtn>
                      </MDBCardBody>
                    </MDBCard>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
