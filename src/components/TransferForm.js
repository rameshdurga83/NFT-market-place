import React, { useRef, useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";

function TransferForm(props) {
  const { transferNFT, kbird, account, close} = props;
  const textInput = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState("");

  const _onTransfer = async (event) => {
    event.preventDefault();
    const to = textInput.current.value;
    if(to === ""){
        setError("To address can not be empty");
    }else if(to === kbird.owner){
        setError(`${to} already owns this NFT`)
    }else if(account === kbird.owner || account === kbird.approved){
        setIsLoading(true)
        await transferNFT(textInput.current.value);
    }else{
        setError("Sender is neither owner nor approver")
    }
    setIsLoading(false);
    close()
    
  };

  return (
    <>
      <Form onSubmit={_onTransfer}>
        <div className="d-flex ms-auto me-auto">
          <Form.Control
            className="mb-1 me-3"
            type="text"
            placeholder="Enter to address to transfer"
            ref={textInput}
            onFocus={()=> setError("")}
          />
          {isLoading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <Button variant="primary" type="submit" className="w-25">
              Transfer
            </Button>
          )}
        </div>
        {Error && (
          <div>
            <p className="text-sm-start small fst-italic text-danger w-50 ms-auto me-auto">
              {Error}
            </p>
          </div>
        )}
      </Form>
    </>
  );
}

export default TransferForm;
