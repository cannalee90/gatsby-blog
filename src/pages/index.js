import React from "react"
import { Link, graphql } from "gatsby"
import styled from 'styled-components';
import Layout from "../components/layout"
import SEO from "../components/seo"

const PostList = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: column;
  padding: 0 40px;
  margin: 0;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`

const PostListItem = styled.li`
  padding: 30px 20px;
  &:not(:last-child) {
    border-bottom: 1px solid #e6e6e6;
  }

  & > .summary {
    font-weight: 100;
    margin: 0;
    font-size: 14px;
  }

  & > .post-title {
    font-size: 23px;
    margin-top: 0;
    margin-bottom: 23px;
  }
  @media (max-width: 768px) {
    padding: 30px 10px;
  }
`

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const posts = data.allMarkdownRemark.edges;
    return (
      <Layout
      >
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <PostList>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <PostListItem key={node.fields.slug}>
                <h2 class="post-title">
                  <Link to={node.fields.slug}>
                    {title}
                  </Link>
                </h2>
                <p className="summary" dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              </PostListItem>
            )
          })}
        </PostList>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 140, truncate: true)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
