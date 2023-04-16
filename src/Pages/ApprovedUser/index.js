import React, { useEffect, useState } from 'react'
import { db, auth } from '../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth'
import { collection, query, where, onSnapshot, getFirestore, collectionGroup, } from "firebase/firestore";
import { Footer, Navbar, PostCard, UserCard } from '../../Components';

const ApprovedUser = () => {
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
  return (
    <>
      <Navbar ApprovedUser={"active"} Status={"Approved User"} Pstatus={"Post Status"} />
      <div class="row p-3">
        <div className="crad-body p-3 pb-0">
          <h3>Approved Users</h3>
        </div>
        {UserLoader ? "Loading ..." : User.map((v, i) => {
          if (v.stats === "Approved") {
            return (
              <UserCard uid={v.uid} name={v.FullName} Email={v.Email} num={v.Mobilenumber} key={i} img={v.Profile} status={v.stats} />
            )
          }
        })}
      </div>
      <Footer />
    </>
  )
}

export default ApprovedUser