
import { Component } from "react";
class FeedbackBox extends Component {

 
  render() {
    return (
      <div>
        <h1 className="title">Please leave your feedback below</h1>
        <form onSubmit={this.props.addComment}>
              <textarea
                className="textarea"
                name="comment"
                placeholder="Add a comment"
              ></textarea>
            <div className="control">
              <button className="button is-primary">Submit</button>
            </div>
          
        </form>
      </div>
    )
  }
}

export default FeedbackBox;