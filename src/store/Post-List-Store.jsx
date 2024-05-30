import { createContext, useReducer} from "react";
import Post from "../components/Post";



export const PostList =createContext({
    postList:[],
    addPost:()=>{},
    deletePost:()=>{},
});

const postListReducer=(currPostList,action)=>{
    let newPostList=currPostList;
    if(action.type==="DELETE_POST"){
        newPostList=currPostList.filter((post)=>post.id !==action.payload.postId);

    }
    else if (action.type==="ADD_POST"){
        newPostList=[action.payload,...currPostList];
    }
    return newPostList;
}

const PostListProvider=({children})=>{
    const [postList,dispatchPostList]=useReducer(postListReducer,DEFAULT_POST_LIST);

    const addPost=(userId,postTitle,postBody,reactions,tags)=>{
        dispatchPostList({
            type:"ADD_POST",
            payload:{
                id: Date.now(),
                title: postTitle,
                body: postBody,
                reactions: reactions,
                userId: userId,
                tags: tags,
            }
        })
        
    };

    const deletePost=(postId)=>{
        dispatchPostList({
            type:"DELETE_POST",
            payload:{
                postId,
            }
        });
    };


    return <PostList.Provider value={{postList ,addPost,deletePost}}>{children}</PostList.Provider>
}

const DEFAULT_POST_LIST =[
{
    id:"1",
    title:"Holiday Plan",
    body:"In this summer vacation we are going to to srilanka with my family to enjoy their. ",
    reactions:"2",
    userId:"user-1",
    tags:["#vacations","#life","#enjoytheMoment"],
},
{
    id:"2",
    title:"Holiday Plan-2",
    body:"In this summer vacation we are going to to srilanka with my family to enjoy their. ",
    reactions:"4",
    userId:"user-2",
    tags:["#vacations","#life","#enjoytheMoment","#family"],
},

];



export default PostListProvider;
 