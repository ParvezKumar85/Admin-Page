import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { db, auth } from '../../config/firebase';
import swal from 'sweetalert';
import { onAuthStateChanged } from 'firebase/auth'
import { collection, query, where, getDocs, arrayUnion, deleteDoc, doc, onSnapshot, updateDoc, deleteField, getFirestore, collectionGroup, } from "firebase/firestore";
import { Footer, Navbar, PostCard } from '../../Components';
import "./userdetails.css"

const UserDetails = () => {
  const params = useParams();
  const location = useLocation();
  const [user, setuser] = useState([])
  const [Loader, setLoader] = useState(true)

  useEffect(() => {
    const q = query(collection(db, "users"), where("uid", "==", params.id));
    const querySnapshot = getDocs(q);
    const a = onSnapshot(q, (querySnapshot) => {
      const user = [];
      querySnapshot.forEach((doc) => {
        user.push(doc.data());
        setuser(user)
        setLoader(false)
      });
    })
  }, [])

  const Approved = () => {
    swal({
      title: "Approve",
      text: "Are you sure you want to approve this user.",
      icon: "success",
      buttons: true,
      dangerMode: false,
    })
      .then((Approved) => {
        if (Approved) {
          const data = {
            stats: "Approved"
          }
          const washingtonRef = doc(db, "users", user[0].uid);
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
      text: "Are you sure you want to reject this user.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((Rejected) => {
        if (Rejected) {
          const data = {
            stats: "Rejected"
          }
          const washingtonRef = doc(db, "users", user[0].uid);
          updateDoc(washingtonRef, data)
          swal("Poof! Your imaginary file has been Rejecte!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
  }
  console.log(user)
  return (
    <>
      <Navbar Status={"Users Status"} Pstatus={"Post Status"} />
      {Loader ? "Loading" : user.map((v, i) => {
        return (

          <>
            <div className="mainuserdiv justify-content-center">
              <div className="divprofile">
                <div>
                  <img src={v.Profile} />
                </div>
                <div>
                  <div class="bordercolor">
                    <div class="mb-4">
                      <h5 class="gray">Full Name :</h5>
                      <h5 class="colormain">{v.FullName}</h5>
                    </div>

                    <div class="mb-4">
                      <h5 class="gray">Email Address :</h5>
                      <h5 class="colormain">{v.Email}</h5>
                    </div>

                    <div class="mb-2">
                      <h5 class="gray">Contact Number :</h5>
                      <h5 class="colormain">{v.Mobilenumber}</h5>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="posteditbtndiv mb-3">
              <div className="w-75 p-3 bordergray">
                <div className="d-flex align-items-center justify-content-between">
                  <h4>Status</h4>
                  {v.stats === "Approved" && <h5 className='Approved'>Approved</h5>}
                  {v.stats === "Pending" && <h5 className='Pending'>Pending</h5>}
                  {v.stats === "Rejected" && <h5 className='Rejected'>Rejected</h5>}
                </div>
                {v.stats === "Pending" &&
                  <div className="divbutton mt-3">
                    <button onClick={Approved} className="approvebtn">Approved</button>
                    <button onClick={Reject} className="rejectbtn">Rejected</button>
                  </div>
                }
              </div>

            </div>


          </>
        )
      })}
      <Footer />
    </>
  )
}

export default UserDetails