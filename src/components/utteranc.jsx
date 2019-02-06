
import * as React from 'react'

export default class Utteranc extends React.PureComponent {

    componentDidMount() {
        const utteranc = document.createElement('script');
        utteranc.src = 'https://utteranc.es/client.js';
        utteranc.async = true;

        utteranc.setAttribute('repo', 'cannalee90/gatsby-blog');
        utteranc.setAttribute('branch', 'master')
        utteranc.setAttribute('issue-term', 'title');
        utteranc.setAttribute('crossorigin', 'anonymous');

        this.instance.appendChild(utteranc);
    }

    render() {
        return <div ref={el => (this.instance = el)} />
    }
}