//Third Party Imports
import React from 'react';

//First Party Imports
import '../../App.scss'
import './StickySidebar.scss';

interface IStickySidebar extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
  items: string[]
}

export const StickySidebar = (props: IStickySidebar) => {
  const {items} = props;

  return(
    <div className="categoryNavbar">
      <div className="categoryNavbarSticky">
        {items.map((item, index) => (
          <>
            <a href={`#${item}`} style={{width: "100%"}}>
              {item}
            </a>
            {index+1 !== items.length &&
            <div className="dotParent noTextSelect"><p>&middot;</p></div>}
          </>
        ))}
      </div>
    </div>
  );
}