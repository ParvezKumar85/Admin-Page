import React, { useEffect, useState } from 'react'
import { db, auth } from '../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth'
import { collection, query, where, onSnapshot, getFirestore, collectionGroup, } from "firebase/firestore";
import { Footer, Navbar, PostCard } from '../../Components';
const PendingPost = () => {
    const [Post, setPost] = useState("")
    const [Loader, setLoader] = useState(true)
    onAuthStateChanged(auth, (user) => {
        const q = query(collection(db, "Posts"));
        onSnapshot(q, (querySnapshot) => {
            const users = [];
            querySnapshot.forEach((doc) => {
                users.push(doc.data());
                setPost(users)
                setLoader(false)
            });
        });
    }
    )
    return (
        <>
            <Navbar PendingPost={"active"} Status={"Users Status"} Pstatus={"Pending Post"} />
            <div class="row p-3">
                {Loader ? "Loading ..." : Post.map((v, i) => {
                    if (v.Status === "Pending") {
                        return (
                            <PostCard id={v.id} date={v.Date} key={i} img={v.ImageUrl} status={v.Status} title={v.Title} des={v.Description} />
                        )
                    }
                })}
            </div>
            <Footer />
        </>
    )
}

export default PendingPost