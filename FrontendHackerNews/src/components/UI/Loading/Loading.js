import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const Loading = () => {
  return (
    <Dimmer active>
      <Loader active inline />
    </Dimmer>
  );
};

export default Loading;
