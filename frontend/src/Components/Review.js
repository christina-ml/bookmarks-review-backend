import ReviewForm from "./ReviewForm";
import { useState } from "react";

/* Passing down some new props - handleDelete and handleSubmit */
function Review({ review, handleDelete, handleSubmit }) {
    /* Set state (boolean) */
    const [toggleEditForm, setToggleEditForm] = useState(false);

    /* button that toggles the edit form */
    const toggleView = () => {
        setToggleEditForm(!toggleEditForm);
      };

    return (
        <div className="Review">
        <button onClick={toggleView}>edit this review</button>

        {/* Adding Ternary - if toggleEditForm button has been clicked (boolen is true), rendering pre-filled ReviewForm, OR, all our normal information from before will be displayed. */}
        {   
            toggleEditForm ? (
                <ReviewForm reviewDetails={review} />
            ) : (
                <div>
                <h4>
                    {review.title} <span>{review.rating}</span>
                </h4>
                <h5>{review.reviewer}</h5>
                <p>{review.content}</p>
                </div>
            )
        }

        <div>
          <h4>
            {review.title} <span>{review.rating}</span>
          </h4>
          <h5>{review.reviewer}</h5>
          <p>{review.content}</p>
          {/* Adding functionality to delete a review */}
        </div><button onClick={() => handleDelete(review.id)}>delete</button>
      </div>
    );
  }
  
  export default Review;