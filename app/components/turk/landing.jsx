import React from 'react'
import beginArrow from '../../img/begin_arrow.svg'
export default React.createClass({

  render: function () {
    return (
      <div className="landing-page">
        <h1>You're testing new Quill Activities </h1>
        <p>
          You're about to answer questions about writing sentences.
          Please answer to the best of your ability.
        </p>
        <button className="button student-begin" onClick={this.props.begin}>
          Begin <img className="begin-arrow" src={beginArrow}/>
        </button>
      </div>
    )
  },

})