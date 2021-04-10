import React from 'react';

const Racer = ({
  name, status, clickhandler, userid, tabNum,
}) => {
  const colors = {
    normal: 'white',
    highlight: 'white',
    unused: '#333',
  };
  const bgcolors = {
    normal: '#394c8f',
    highlight: '#d79022',
    unused: '#bbb',
  };

  return (
    <>
      <style jsx>
        {`
          .lozenge {
            display: inline-block;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            background-color: ${bgcolors[status]};
            color: ${colors[status]};
            margin-bottom: 0.5rem;
            margin-right: 1.0rem;
            min-width: 220px;
          }
          .clickable {
            cursor: pointer;
          }
          div:hover {
            box-shadow: 0 8px 30px rgba(0,0,0,0.12);
          }
        `}
      </style>
      {
        userid ? (
          <div
            className="lozenge clickable"
            role="menuitem"
            tabIndex={tabNum}
            onClick={() => clickhandler(userid, name)}
          >
            {name}
          </div>
        ) : (
          <div className="lozenge">
            {name}
          </div>
        )
      }
    </>
  );
};

export default Racer;
