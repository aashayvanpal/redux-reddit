import { Buffer } from 'buffer'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchSubscribers, fetchPosts, fetchComments } from '../actions'
import Header from './Header.js'
import { Button } from 'react-bootstrap'
import '../css/HomeComponent.css'

import PostModal from './PostModal.js'

const HomeComponent = (props) => {

    const [selectedId, setSelectedId] = useState('')
    const [selectedName, setSelectedName] = useState('')
    const [selectedArticle, setSelectedArticle] = useState('')
    const [postId, setPostId] = useState('')

    useEffect(() => {
        console.log('useEffect props', props)
        async function fetchData() {
            await getToken()
            // get subscribers
            await props.getSubscribers()
        }
        fetchData();
    }, [])


    const getToken = async () => {
        var code = ''
        var urlParams;
        (window.onpopstate = function () {
            var match,
                pl = /\+/g,  // Regex for replacing addition symbol with a space
                search = /([^&=]+)=?([^&]*)/g,
                decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
                query = window.location.search.substring(1);

            urlParams = {};
            while (match = search.exec(query))
                urlParams[decode(match[1])] = decode(match[2]);
        })();
        code = urlParams.code
        console.log(code)

        try {
            var clientID = "UljU99t3hulMhdrVGKjN1w"
            var clientSecret = "o7vuAK_Ph6pOB06N2rM3gJRt3Qplpw"
            var returnCode = "statecheck"

            const credentials = Buffer.from(`${clientID}:${clientSecret}`).toString("base64")
            console.log(credentials)

            let response = await fetch('https://www.reddit.com/api/v1/access_token', {
                method: 'POST',
                body: `grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000/home`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${credentials}`
                }
            })

            let body = await response.json()
            // console.log(body)
            console.log('token', body.access_token)

            localStorage.setItem('token', body.access_token)

        }
        catch (e) { console.log('wrong', e) }
    }


    return (
        <div>
            <Header />
            <h1>Hello user , this is a reddit Redux-Saga Clone Application!</h1>
            <hr />
            selected id - {selectedId} |
            selected name - {selectedName} |
            selected Article - {selectedArticle} |
            <hr />
            full string - {`https://oauth.reddit.com/${selectedName}/comments/${postId}/${selectedArticle}`}

            <hr />

            You have subscribed to these reddits :-
            <div className='subscribers-list'>
                {props.subscribers.map(subscriber => <div key={subscriber.data.id}>
                    <Button variant="success" className='subscriber-button'
                        onClick={() => {
                            setSelectedId(subscriber.data.name)
                            setSelectedName(subscriber.data.display_name_prefixed)
                            props.getPosts()
                        }}>
                        {subscriber.data.title}
                    </Button>
                </div>)
                }
            </div>

            <hr />

            <div className='posts-list'>
                Posts
                {props.posts.filter(post => post.data.subreddit_id === selectedId).map(post => {
                    return <div key={post.data.id} onClick={() => {
                        setPostId(post.data.id)
                        setSelectedArticle(post.data.title.replaceAll(' ', '_'))
                        // console.log('DEBUG', selectedName, post.data.id, post.data.title.replaceAll(' ', '_'))
                        props.getComments(selectedName, post.data.id, post.data.title.replaceAll(' ', '_'))
                    }}>
                        <PostModal post={selectedName} postTitle={post.data.title} comments={props.comments} />
                        <hr />
                    </div>
                })}
            </div>
        </div >
    )
}

const mapStateToProps = (state) => {
    console.log('MSTP home component', state)
    return {
        subscribers: state.subscribers,
        posts: state.posts,
        comments: state.comments
    }
}

const mapDispatchToProps = {
    getSubscribers: fetchSubscribers,
    getPosts: fetchPosts,
    getComments: fetchComments
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)