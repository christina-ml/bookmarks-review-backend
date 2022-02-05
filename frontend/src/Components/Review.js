import ReviewForm from "./ReviewForm";
import { useState } from "react";

/* Passing down some new props - handleDelete and handleSubmit */
function Review({ review, handleDelete, handleSubmit }) {
    /* Set state (boolean) */
    const [viewEditForm, setViewEditForm] = useState(false);
    const [editButtonText, setEditButtonText] = useState("edit this review"); /* BONUS - for toggle */

    /* button that toggles the edit form */
    const toggleView = () => {
        /* BONUS (START) - Added state for `editButtonText` and an if/else to toggle "edit this review" with "see review" */
        if (viewEditForm === false) {
            setEditButtonText("see review")
        } else {
            setEditButtonText("edit this review")
        }
        /* BONUS (END) */

        setViewEditForm(!viewEditForm);
      };

    return (
        <div className="Review">
          <button onClick={toggleView}>{editButtonText}</button>
            {/* Adding Ternary - if viewEditForm button has been clicked (boolen is true), rendering pre-filled ReviewForm, OR, all our normal information from before will be displayed. */}
            {
              viewEditForm ? (
                <ReviewForm
                reviewDetails={review}
                toggleView={toggleView}
                handleSubmit={handleSubmit}
                />
                ) : (
                <div>
                <h4>
                    {review.title} <span>{review.rating}</span>
                </h4>
                <h5>{review.reviewer}</h5>
                <p>{review.content}</p>
                    {/* Adding functionality to delete a review */}
                <button onClick={() => handleDelete(review.id)}>delete</button>
    
                </div>
                )
            }
        </div>
      );
    }
  
  export default Review;