import React, { Component } from 'react'
import Feedback from './feedback'
import { Title } from '@mantine/core'

class Allfeedback extends Component {
  render() {
    return (
      <section className="v_flex">
        {
          this.props.allFeedback.map((comment, index) => {
            return <Feedback key={index} comment={comment} />
          })
        }
      </section>
    )
  }
}

export default Allfeedback;