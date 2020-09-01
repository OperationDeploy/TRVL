import React from 'react';
import { slide as Menu } from 'react-burger-menu';

const Props => {
  return (
    <Menu {...props}>
      <a className="menu-item" href="/">HOME</a>
      <a className="menu-item" href="/tripinvites">Trip Invites</a>
    </Menu>
  )
}