import axios from 'axios'
import React, { useState } from 'react'

function Comment({ comment, userId }) {
	const [editComment, setEditComment] = useState(comment.content)
	const [editing, setEditing] = useState(false)
	// console.log(comment)

	const handleEditClick = () => {
		setEditing(!editing)
	}

	const handleUpdateComment = async () => {
		console.log(editComment);
		console.log(comment.id);
		const { data: updatedComment } = await axios.patch(`/api/comments/${comment.id}`,
		{
			content: editComment
		},
		{
			headers: {
				Authorization: "Bearer " + localStorage.getItem('token')
			}
		})
		comment.content = editComment
		setEditing(!editing)
		console.log(updatedComment);
	}

	return (
		<>
			<div style={{ border: "solid black .1em", margin: ".5em" }}>
				{
					!editing ? (
						<p>{comment.content}</p>
					) : (
						<>
							<textarea
								value={editComment}
								onChange={(e) => setEditComment(e.target.value)}
								style={{ height: "100px", width: "300px" }}
							/>
							<br></br>
							<button onClick={handleUpdateComment}>Post Changes</button>
							<button onClick={handleEditClick}>Discard Changes</button>
						</>
					)
				}
				<p> Posted by {comment.user.username} on {comment.date.slice(0, 10)}</p>
				{comment.userId == localStorage.getItem('userId') && !editing ?
					(
						<button onClick={handleEditClick}>Edit Comment</button>
					) : (
						<></>
					)}
			</div>
		</>
	)
}

export default Comment