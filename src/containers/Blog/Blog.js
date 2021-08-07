import React, { Component } from 'react';
import axios from 'axios'
import Post from '../../Post'

import './Blog.css';

class Blog extends Component {

    state={
        posts:[],
        pageNumberId: 1,
        error:false
    }    
    componentDidMount(){
        axios.get('https://reqres.in/api/users?page='+this.state.pageNumberId)
        .then(response => {
            const posts = response.data.data
            const updatedPosts = posts.map(post => ({...post}))
            this.setState({
                posts : updatedPosts 
            })
        })
        .catch(error => (
            this.setState({
                error: true
            })
        ))
    }

    componentDidUpdate(){
        axios.get('https://reqres.in/api/users?page='+this.state.pageNumberId)
        .then(response=>{
            const posts = response.data.data
            const updatedPosts = posts.map(post => ({...post}))
            this.setState({
                posts : updatedPosts 
            })
        })
        .catch(error=>(
            this.setState({
                error:true
            })
        )
            )
    }

    addHandler = () =>{
        let currValue = this.state.pageNumberId
        let nextvalue = currValue + 1
        this.setState(
            {
                pageNumberId : nextvalue
            }
        )
    }
    
    delHandler = () => {
        let currValue = this.state.pageNumberId
        let nextvalue = currValue - 1
        this.setState(
            {
                pageNumberId : nextvalue
            }
        )
    }

    render () {
        let posts = <p>Something Went Wrong!!</p>
        if(!this.state.error){
            posts = this.state.posts.map(post => (
                <Post key={post.id}
                email={post.email}
                firstName={post.first_name}
                lastName={post.last_name}
                avatar={post.avatar}/>
            ) )
        }
        return (
            <div className="App">
                <h1 >List of Users</h1>
                <section className="Posts">
                  {posts}
                  
                </section>
                
                    <div className="center">
                        <button className="posts-button" style={{backgroundColor:"red"}}
                        onClick={this.delHandler}>Prev</button>
                        <button className="posts-button" style={{backgroundColor:"#00FF40"}}
                        onClick={this.addHandler}>Next</button>
                    </div>
            </div>
        );
    }
}

export default Blog;