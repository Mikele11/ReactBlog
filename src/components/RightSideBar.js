import React from 'react';
import { NavLink } from 'react-router-dom';
import openSocket from 'socket.io-client';

export default class RightSideBar extends React.Component {
  state={
    usersOnline: []
  }
  componentDidMount() {
    //http://localhost:3000
    //https://blogmernredux.herokuapp.com/
    try {
      const socket = openSocket('https://blogmernredux.herokuapp.com/',{transports: ['websocket']});
      socket.on('fetch online', (usersOnline) => {
        console.log('usersOnline',usersOnline)
        this.setState({usersOnline: usersOnline})
      });
    } catch (error) {
      console.log('error',error)

    }
  }
  render() {
    const { usersOnline } = this.state;
    console.log('usersOnline render',usersOnline)
    return (
      <div className='RightSideBar'>
        <div className="container">
          <ul>
            {usersOnline.map((user,index)  =>
              <li>
                {user}
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}