import React, { useRef, useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";

function MintForm({ onMint }) {
  const textInput = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const _onMint = async (event) => {
    event.preventDefault();
    setIsError(false);
    if (textInput.current.value === "") {
      setIsError(true);
    } else {
      const kryptoBird = textInput.current.value;
      setIsLoading(true);
      await onMint(kryptoBird);
      textInput.current.value = "";
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form onSubmit={_onMint}>
        <div className="d-flex w-50 ms-auto me-auto">
          <Form.Control
            className="mb-1 me-3"
            type="text"
            placeholder="Enter the file location"
            ref={textInput}
            onFocus={()=>{setIsError(false)}}
          />
          {isLoading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <Button variant="primary" type="submit" className="w-25">
              Mint
            </Button>
          )}
        </div>
        {isError && (
          <div>
            <p className="text-sm-start small fst-italic text-danger w-50 ms-auto me-auto">
              Location can not be empty
            </p>
          </div>
        )}
      </Form>
    </>
  );
}

export default MintForm;
