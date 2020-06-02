import React from 'react';

class Answer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.handleDelete = this.handleDelete.bind(this);
		this.changeVote = this.changeVote.bind(this);
	}

	componentDidUpdate() {
		if (this.state.votes === undefined && this.props.votes !== undefined) {
			const currentUserVote = this.props.currentUserVote
				? this.props.currentUserVote
				: 0;
			this.setState({
				votes: this.props.votes - currentUserVote,
				currentUserVote,
			});
		}
	}

	changeVote(vote) {
		let newUserVote;
		if (vote === this.state.currentUserVote) {
			newUserVote = 0;
		}
		if (vote === 1) {
			this.props.upvote(this.props.question.id);
			if (newUserVote === undefined) {
				newUserVote = 1;
			}
		} else if (vote === -1) {
			this.props.downvote(this.props.question.id);
			if (newUserVote === undefined) {
				newUserVote = -1;
			}
		}
		this.setState({
			currentUserVote: newUserVote,
		});
	}

	handleDelete(e) {
		e.preventDefault();
		this.props.deleteAnswer(this.props.answer.id);
	}

	render() {
		const { answer } = this.props;
		let currentUserVote = 0;

		if (this.state.currentUserVote) {
			currentUserVote = this.state.currentUserVote;
			console.log(currentUserVote);
		}
		return (
			<div id="question-show-question">
				<div className="question-show-grid question-show-vote-container">
					<div className="question-show-vote">
						<button
							className="question-show-vote-grid question-show-vote-grid-vote"
							onClick={() => this.changeVote(1)}
						>
							<svg
								className={
									currentUserVote === 1 ? "active-vote" : ""
								}
								width="36"
								height="36"
								viewBox="0 0 36 36"
							>
								<path d="M2 26h32L18 10 2 26z" />
							</svg>
						</button>
						<div className="question-show-vote-grid question-show-vote-score">
							{this.state.votes + currentUserVote}
						</div>
						<button
							className="question-show-vote-grid question-show-vote-grid-vote"
							onClick={() => this.changeVote(-1)}
						>
							<svg
								className={
									currentUserVote === -1 ? "active-vote" : ""
								}
								width="36"
								height="36"
								viewBox="0 0 36 36"
							>
								<path d="M2 10h32L18 26 2 10z" />
							</svg>
						</button>

					</div>
				</div>
				<div className="question-show-grid question-show-post">
					<div className="question-show-post-body">
						{answer.body}
					</div>
				</div>
			</div>
			// <div className="answer-container">
			//     <div className="answer-voting">
			//         <button className={`up-arrow ${answer.currentUserVote === 'up_vote' ? 'current-user-vote' : ''}`} onClick={this.handleVote('up_vote')}>
			//             {/* upvote_image */}
			//         </button>
			//         <div className="answer-score">{answer.score}</div>
			//         <button className={`down-arrow ${answer.currentUserVote === 'down_vote' ? 'current-user-vote' : ''}`} onClick={this.handleVote('down_vote')}>
			//             {/* downvote_image */}
			//         </button>
			//     </div>
			//     <div className="answer-main">
			//         value={answer.body}
			//         <div className="answer-footer">
			//             <div className="answer-buttons">
			//                 {/* {this.props.isAuthor && <button className="answer-delete-btn" onClick={this.handleDelete}>delete</button>} */}
			//             </div>
			//             <div className="answer-user">
			//                 {/* author component */}
			//             </div>
			//         </div>
			//     </div>
			// </div>
		);
	}

}

export default Answer;