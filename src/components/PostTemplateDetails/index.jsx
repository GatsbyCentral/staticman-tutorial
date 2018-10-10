import React from 'react'
import Link from 'gatsby-link'
import moment from 'moment'
import './style.scss'

class PostTemplateDetails extends React.Component {
  render() {
    const { subtitle, author } = this.props.data.site.siteMetadata
    const comments =
      this.props.data.allCommentsYaml && this.props.data.allCommentsYaml.edges
    const post = this.props.data.markdownRemark
    const tags = post.fields.tagSlugs

    const homeBlock = (
      <div>
        <Link className="post-single__home-button" to="/">
          All Articles
        </Link>
      </div>
    )

    const tagsBlock = (
      <div className="post-single__tags">
        <ul className="post-single__tags-list">
          {tags &&
            tags.map((tag, i) => (
              <li className="post-single__tags-list-item" key={tag}>
                <Link to={tag} className="post-single__tags-list-item-link">
                  {post.frontmatter.tags[i]}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    )
    const commentsList =
      comments && comments.length ? (
        comments.map(comment => (
          <div key={comment.node.id}>
            <p>
              Name: {comment.node.name}
              <br />
              Comment: {comment.node.message}
              <br />
              Date: {comment.node.date}
            </p>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )

    const commentsBlock = (
      <div>
        <hr />
        <h2>Comments</h2>
        {commentsList}

        <h3>Add a comment</h3>
        <form method="POST" action="YOUR_FORM_URL">
          <input
            name="options[slug]"
            type="hidden"
            value={this.props.pathContext.slug}
          />
          <input name="fields[name]" type="text" placeholder="Name" required />
          <input
            name="fields[email]"
            type="email"
            placeholder="Email"
            required
          />
          <textarea name="fields[message]" placeholder="Comment" required />
          <button type="submit">Submit Comment</button>
        </form>
      </div>
    )

    return (
      <div>
        {homeBlock}
        <div className="post-single">
          <div className="post-single__inner">
            <h1 className="post-single__title">{post.frontmatter.title}</h1>
            <div
              className="post-single__body"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
            <div className="post-single__date">
              <em>
                Published {moment(post.frontmatter.date).format('D MMM YYYY')}
              </em>
            </div>
          </div>
          <div className="post-single__footer">
            {tagsBlock}
            {commentsBlock}
            <hr />
            <p className="post-single__footer-text">
              {subtitle}
              <a
                href={`https://twitter.com/${author.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <br /> <strong>{author.name}</strong> on Twitter
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default PostTemplateDetails
