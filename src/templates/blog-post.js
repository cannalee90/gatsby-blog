import React from "react"
import { Link, graphql } from "gatsby"
import styled from 'styled-components';

import Layout from "../components/layout"
import SEO from "../components/seo"
import Utteranc from '../components/utteranc';

const BlogPost = styled.div`
  padding: 30px 60px;
  margin: 0;
  
  p {
    padding-top: 10px;
    padding-bottom: 10px;
  }

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
      margin: 10px 0;

    }
  }

  & > .post-body {
    font-weight: 400;
    border-bottom: 1px solid #e6e6e6;
    padding-bottom: 50px;

    h2, h3, h4, h5, h6 {
      margin-top: 1.5em;
      margin-bottom: 1em;
    }
    
    blockquote {
      border-left: 3px solid #e1e4e6;
      margin-left: 0;
      padding-left: 2em;
    }

    hr {
      background-color: #e1e4e6;
      color: #e1e4e6;
      border-width: #e1e4e6;
    }
  }

  & > .post-footer {
    margin-top: 30px;

    .other-post-link {
      &:hover {
        text-decoration: none;
      }
    }
  }
`

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const { previous, next } = this.props.pageContext

    return (
      <Layout>
        <BlogPost>
          <SEO
            title={post.frontmatter.title}
            description={post.excerpt}
            keywords={post.frontmatter.tag.split(' ')}
          />
          <div className="post-title-wrapper">
            <h1 className="post-title">
              {post.frontmatter.title}
            </h1>
            <p className="post-time">
              {post.frontmatter.date}
            </p>
          </div>
          <div className="post-body" dangerouslySetInnerHTML={{ __html: post.html }}>
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
                  <Link className="other-post-link" to={previous.fields.slug} rel="prev">
                    &#xE000; {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link className="other-post-link" to={next.fields.slug} rel="next">
                    {next.frontmatter.title} &#xE001;
                  </Link>
                )}
              </li>
            </ul>

          </div>
          <Utteranc title={post.frontmatter.title}></Utteranc>

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
        date(formatString: "YYYY년 MM월 DD일")
        tag
      }
    }
  }
`
