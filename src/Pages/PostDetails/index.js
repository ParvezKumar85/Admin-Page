import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { db, auth } from '../../config/firebase';
import swal from 'sweetalert';
import { onAuthStateChanged } from 'firebase/auth'
import { collection, query, where, getDocs, arrayUnion, deleteDoc, doc, onSnapshot, updateDoc, deleteField, getFirestore, collectionGroup, } from "firebase/firestore";
import { Footer, Navbar, PostCard } from '../../Components';
import "./PostDetails.css"

const PostDetails = () => {
  const params = useParams();
  const location = useLocation();
  const [Post, setPost] = useState([])
  const [Loader, setLoader] = useState(true)
  useEffect(() => {
    const q = query(collection(db, "Posts"), where("id", "==", params.id));
    const querySnapshot = getDocs(q);
    const a = onSnapshot(q, (querySnapshot) => {
      const Blogs = [];
      querySnapshot.forEach((doc) => {
        Blogs.push(doc.data());
        setPost(Blogs)
        setLoader(false)
      });
    })
  }, [])

  const Approved = () => {
    swal({
      title: "Approve",
      text: "Are you sure you want to approve this post.",
      icon: "success",
      buttons: true,
      dangerMode: false,
    })
      .then((Approved) => {
        if (Approved) {
          const data = {
            Status: "Approved"
          }
          const washingtonRef = doc(db, "Posts", Post[0].id);
          updateDoc(washingtonRef, data)

          swal("Poof! Your imaginary file has been Approved!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
  }
  const Reject = () => {
    swal({
      title: "Reject",
      text: "Are you sure you want to reject this post.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((Rejected) => {
        if (Rejected) {
          const data = {
            Status: "Rejected"
          }
          const washingtonRef = doc(db, "Posts", Post[0].id);
          updateDoc(washingtonRef, data)
          swal("Poof! Your imaginary file has been Rejecte!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
  }
  return (
    <>
      <Navbar Status={"Users Status"} Pstatus={"Post Status"} />
      {Loader ? "Loading" : Post.map((v, i) => {
        return (
          <div className="d-flex align-items-center justify-content-around">
            <div className="div-post mt-2">
              <img src={v.ImageUrl} className="img-post rounded-1 mb-3" />

              <div className='mt-2 d-flex row justify-content-between px-3'>
                <h5>Status</h5>
                {v.Status === "Approved" && <h5 className='Approved'>Approved</h5>}
                {v.Status === "Pending" && <h5 className='Pending'>Pending</h5>}
                {v.Status === "Rejected" && <h5 className='Rejected'>Rejected</h5>}
              </div>

              {v.Status === "Pending" &&
                <div className="divbutton mt-3">
                  <button onClick={Approved} className="approvebtn">Approved</button>
                  <button onClick={Reject} className="rejectbtn">Rejected</button>
                </div>
              }

              <div className='mt-3 d-flex row justify-content-between px-3'>
                <h5>Selected Category </h5>
                <h5>{v.Category}</h5>
              </div>

              <div className='mt-3 px-3 titlediv mb-3'>
                <h4 className="titlecolor mb-2">{v.Title} </h4>

                <h5>{v.Description}</h5>
              </div>


            </div>
          </div>
        )
      })}
      <Footer />

    </>
  )
}

export default PostDetails