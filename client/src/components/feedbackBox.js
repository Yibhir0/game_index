
import { Component } from "react";
class FeedbackBox extends Component {
  constructor(props) {
    super(props)
    this.addComment = this.addComment.bind(this);
  }

  addComment(e) {
    // Prevent the default behaviour of form submit
    e.preventDefault()

    console.log(e.target.value);
    // Get the value of the comment box
    // and make sure it not some empty strings
    const comment = e.target.elements.comment.value;
   
    // Get the current time.
    const timestamp = Date.now();

    e.target.elements.comment.value = ""
    console.log(comment+" "+ timestamp)
    
  }
  render() {
    return (
      <div>
        <h1 className="title">Please leave your feedback below</h1>
        <form onSubmit={this.addComment}>
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