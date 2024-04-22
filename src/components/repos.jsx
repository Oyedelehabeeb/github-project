import { useEffect, useState } from "react"
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import Repo from "../pages/Repo";



const Repos = () => {
    const [repos, setRepos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMoreButton, setViewMoreButton] = useState ("")

  const fetchAllRepos = async () => {

    
    
    // await axios.get(`https://api.github.com/users/oyedelehabeeb/repos?per_page=6&page=${currentPage}`).then(
    //         (data) => {
    //             const viewMoreFunc = () => {
    //                 setRepos ([...repos, ...data]);
    //                 setViewMoreButton("Move to next page");
    //             }
    //             data.length === 0 ? setViewMoreButton ("Move to next Page") : viewMoreFunc()
    //         }
    //     )
    fetch(`https://api.github.com/users/oyedelehabeeb/repos?per_page=6&page=${currentPage}`)
    .then((response) => (response.json()))
    .then((data) => {
      if (data.length === 0) {
        setViewMoreButton("End of Repos")
      }else {
        setRepos([...repos, ...data])
        setViewMoreButton("View More")
      }
    })
  }

  useEffect(() => {
    fetchAllRepos()
  }, [currentPage]);
  const nextPageFunc = () => {
    setCurrentPage(currentPage + 1)
  }


  return (
      <div>
        {repos.length === 0 ? (
            <div>No repositories for this user</div>
        ) : (
            <div className="border flex main-repo w-4/5 ">
                <div>
                    {repos.map((e) => 
                        (
                            <div className="border-b  py-6"
                            key={e.id}> 
                                <div className="flex">
                                    <div className="flex gap-4">
                                        <Link to={`/repo/${e.name}`} target="_blank">
                                            <h3 className="text-lg font-semibold text-blue-600">{e.name}</h3>
                                        </Link>
                                        <div className="border rounded-full px-2 py-1 text-xs">
                                            <p>{e.visibility}</p>
                                        </div>
                                    </div>
                                    <div className="repo-star">

                                    </div>
                                </div>
                                <div className="repo-details gap-4 flex mt-4">
                                    <div className="repo-language flex gap-1">
                                        <div className="language-circle h-3 w-3 rounded-full border"></div>
                                        <div className="lang-title">
                                            <p className="text-xs text-gray-500">{e.language}</p>
                                        </div>
                                    </div>
                                    <div className="repo-update">
                                    <p className="text-xs text-gray-500">updated on {moment(e.updated_at).format("LL")}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
                
            </div>
        )}
        <p className="view-more" onClick={nextPageFunc}>{viewMoreButton}</p>
      </div>
  )
}

export default Repos