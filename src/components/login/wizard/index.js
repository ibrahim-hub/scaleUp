import React, { Component } from 'react'
import Login from '../login'
import Login2 from '../login2'
import StepWizard from 'react-step-wizard';

export default class index extends Component {
    
    render() {
        return (
            <div>
                <StepWizard>
                    <Login />
                    <Login2 />
                </StepWizard>
            </div>
        )
    }
}
