/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React from 'react';

//First Party Imports
import './Loader.scss';

interface ILoader extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
}

export const Loader = (props: ILoader) => {
  const {...loaderProps} = props;

  return(
    <div className="loader loaderRing" {...loaderProps}></div>
  );
}