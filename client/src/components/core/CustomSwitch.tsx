import React, { FC } from "react";
import { Switch } from "react-router-dom";


interface Props {
  // any props that come into the component
}


const CustomSwitch: FC<Props> = ({children, ...props}) => {
  return (
    <Switch>
      {children}
    </Switch>
  )
}

export default CustomSwitch;