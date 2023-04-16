import React, { useEffect, useState } from 'react'
import { db, auth } from '../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth'
import { collection, query, where, onSnapshot, getFirestore, collectionGroup, } from "firebase/firestore";
import { Footer, Navbar, PostCard, UserCard } from '../../Components';


const Home = () => {
    const [Post, setPost] = useState("")
    const [Loader, setLoader] = useState(true)
    const [User, setUser] = useState("")
    const [UserLoader, setUserLoader] = useState(true)
    onAuthStateChanged(auth, (user) => {
        const u = query(collection(db, "users"));
        onSnapshot(u, (querySnapshot) => {
            const users = [];
            querySnapshot.forEach((doc) => {
                users.push(doc.data());
                setUser(users)
                setUserLoader(false)
            });
        });
    }
    )

    onAuthStateChanged(auth, (user) => {
        const q = query(collection(db, "Posts"));
        onSnapshot(q, (querySnapshot) => {
            const post = [];
            querySnapshot.forEach((doc) => {
                post.push(doc.data());
                setPost(post)
                setLoader(false)
            });
        });
    }
    )

    return (
        <>
            <Navbar Home={"active"} Status={"Users Status"} Pstatus={"Post Status"} />

            <div class="row p-3">
                <div className="crad-body p-3 pb-0">
                    <h3>Pending Users</h3>
                </div>
                {UserLoader ? "Loading ..." : User.map((v, i) => {
                    if (v.stats === "Pending") {
                        return (
                            <UserCard uid={v.uid} name={v.FullName} Email={v.Email} num={v.Mobilenumber} key={i} img={v.Profile} status={v.stats} />
                        )
                    }
                })}
            </div>

            <div class="row p-3">
                <div className="crad-body p-3 pb-0">
                    <h3>Pending Posts</h3>
                </div>
                {Loader ? "Loading" : Post.map((v, i) => {
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

export default Home