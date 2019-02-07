import React from "react"
import { Link, graphql } from "gatsby"
import styled from 'styled-components';

import Layout from "../components/layout"
import SEO from "../components/seo"
import Utteranc from '../components/utteranc';

const BlogPost = styled.div`
  padding: 30px 60px;
  margin: 0;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }

  & > .post-title-wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;

    .post-title {
      margin: 0;

    }

    .post-time {
      margin: 0;
      font-weight: 100;
      font-size: 14px;
      margin-top: 10px;
    }
  }

  & > .post-body {
    font-weight: 100;
    border-bottom: 1px solid #e6e6e6;
  }
`

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const { previous, next } = this.props.pageContext
    const { author, title } = this.props.data.site.siteMetadata;

    return (
      <Layout>
        <BlogPost>
          <SEO title={post.frontmatter.title} description={post.excerpt} />
          <div className="post-title-wrapper">
            <h1 className="post-title">
              {post.frontmatter.title}
            </h1>
            <p className="post-time">
              {post.frontmatter.date}
            </p>
          </div>
          <div className="post-body">
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
          <div className="post-footer">
            <ul
              style={{
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `space-between`,
                listStyle: `none`,
                padding: 0,
              }}
            >
              <li>
                {previous && (
                  <Link to={previous.fields.slug} rel="prev">
                    ← {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link to={next.fields.slug} rel="next">
                    {next.frontmatter.title} →
                  </Link>
                )}
              </li>
            </ul>

          </div>
          <Utteranc></Utteranc>

        </BlogPost>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
