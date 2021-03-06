import React, {Component} from 'react';
import apiCall from '../../services/apiCall';
import LoadingIndicator from '../../CommonComponents/LoadingIndicator';
import PostSummary from '../../CommonComponents/PostSummary';
import ErrorMessage from '../../CommonComponents/ErrorMessage';

class Home extends Component {

    constructor() {
        super();

        this.state = {
            posts: [],
            loading: false,
            hasError: false,
        };
    }

    componentDidMount() {
        this.setState({
            loading: true,
        })
        apiCall('posts')
        .then(posts => {
            this.setState({
                posts,
                loading: false,
                hasError: false,
            }, () => {
                console.log(this.state.posts);
            })
        })
        .catch(err => {
            this.setState({
                loading: false,
                hasError: true,
            })
        })
    }

    render() {
        return (
            <div className={`posts-container container`}>
                {
                    this.state.loading
                    ?
                    <LoadingIndicator/>
                    :
                    null
                }
                {
                    this.state.hasError
                    ?
                        <ErrorMessage 
                            title={'Error!'} 
                            message={'Unable to retrieve posts!'} 
                        />
                    :
                        null
                }
                {
                    this.state.posts.map(post => 
                        <PostSummary 
                            key={post.id} 
                            post={post}
                        />
                    )
                }
            </div>
        )
    }
}

export default Home;