import { Link } from 'react-router-dom'
import { Buffer } from 'buffer'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchSubscribers, fetchPosts, fetchComments } from '../actions'

const HomeComponent = (props) => {

    const [selectedId, setSelectedId] = useState('')
    const [selectedName, setSelectedName] = useState('')
    const [selectedArticle, setSelectedArticle] = useState('')
    const [posts, setPosts] = useState([])
    const [postId, setPostId] = useState('')
    const [comments, setComments] = useState([])

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
            <h1>Hello user , this is a reddit Redux-Saga Clone Application!</h1>
            {/* <button onClick={props.getSubscribers}>get subscribers</button> */}
            {/* <button onClick={props.getPosts}>get Posts</button> */}
            {/* <button onClick={() => props.getComments(selectedName, postId, selectedArticle)}>get comment</button> */}
            <Link to='/'>Logout</Link>
            <br />
            <hr />
            selected id - {selectedId} /
            selected name - {selectedName} /
            selected Article - {selectedArticle}
            <hr />
            full string - {`https://oauth.reddit.com/${selectedName}/comments/${postId}/${selectedArticle}`}
            <hr />
            You have subscribed to these reddits :-
            {props.subscribers.map(subscriber => <div key={subscriber.data.id}>
                <button onClick={() => {
                    setSelectedId(subscriber.data.name)
                    setSelectedName(subscriber.data.display_name_prefixed)
                    props.getPosts()
                }}>
                    {subscriber.data.title}
                </button>
            </div>)
            }


            Posts - {props.posts.length}
            {props.posts.filter(post => post.data.subreddit_id === selectedId).map(post => {
                return <div key={post.data.id}><button onClick={() => {
                    setPostId(post.data.id)
                    setSelectedArticle(post.data.title.replaceAll(' ', '_'))
                    console.log('DEEEEBUG', selectedName, post.data.id, post.data.title.replaceAll(' ', '_'))
                    props.getComments(selectedName, post.data.id, post.data.title.replaceAll(' ', '_'))
                }}>
                    {post.data.title}
                </button><br /></div>
            })}

            <hr />
            Comments
            {props.comments.map(comment => <div key={comment.id}>
                {/* {comment.data.id}--? 
                {comment.data.subreddit_id} */}
                {comment.data.body}
                <hr />
            </div>)
            }

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