import React, {Component} from 'react';
import './Users.css';

class Users extends Component{

    render(){
        return(
            <div className='Users container text-center'>
                <div className={'row'}>
                    <div className={'col-md-12'}>
                        <p className={'lead'}>Add new user</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Users;