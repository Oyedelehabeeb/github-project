import { useState, useEffect } from "react"
import { Octokit } from "octokit";
import { ToastContainer, toast } from "react-toastify";


const CreateRepo = ({setPostModal}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const getError = (error) => {
        return error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      };
const octokit = new Octokit({
    // auth: process.env.PERSONAL_ACCESS_TOKEN
    auth: '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'
  })
  

  const createRepoFunc = async (e) => {
    e.preventDefault()
    try{
        await octokit.request('POST /user/repos', {
            name: name,
            description: description,
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          })
          toast.success("Empty Repo created Successfully"); 
    }
    catch (err){
        toast.error(getError(err))
    }
    
  }
    return (
        <div className="modal-main w-3/5 bg-gray-200 py-6 px-4 rounded-3xl">
            <div className="cancel-button">
                <p onClick={() => setPostModal(false)} className="cancel-btn text-red-600 cancel-btn"> Cancel </p>
            </div>
            <form className="mt-10">
                <div className="repo-title repo-input">
                    <label>Title</label>
                    <input type="text" 
                    placeholder="input repo title" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="repo-description mt-3">
                    <label>A brief description of your repoitory</label>
                    <input type="text" 
                    placeholder="input repo description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <button className="create-repository-btn h-10 w-20 bg-green-400 mt-8" type="submit" onClick={createRepoFunc}>
                    <p className="text-xs">Create repository</p>
                </button>
            </form>
            <div className="h-10 w-10">
                <ToastContainer />
            </div>
        </div>
    )
}

export default CreateRepo