import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

class NotFoundPage extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <SEO title="404: Not Found" />
        <h1>Not Found</h1>
      </Layout>
    )
  }
}

export default NotFoundPage;