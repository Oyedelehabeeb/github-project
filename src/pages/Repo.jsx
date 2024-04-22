import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Octokit } from 'octokit';
import { ToastContainer, toast } from "react-toastify";


function Repo() {

  const { id } = useParams()
  const [repodetails, setrepoDetails] = useState({});
  const [postmodal, setPostModal] = useState (false);
  const [name, setName] = useState("");
    const [description, setDescription] = useState("");

 
  useEffect(() => {
    const getRepos = async () => {
     await fetch(`https://api.github.com/repos/oyedelehabeeb/${id}`)
    .then((response) => (response.json()))
    .then((data) => {
        setrepoDetails(data)
    })
    }
    getRepos()
  }, []) 
  const getError = (error) => {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  };
  const octokit = new Octokit({
    auth: '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'
  })
  const navigate = useNavigate()
  const deleterepoFunc = async () => {
    try{
      await octokit.request('DELETE /repos/{owner}/{repo}', {
        owner: 'oyedelehabeeb',
        repo: repodetails.name,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
    })
    }
    catch(err){
      toast.error(getError(err))
    }
    // use modal to confirm delete if time still dey
    alert("Repository deleted successfully!")
  navigate('/');
}

useEffect (() => {
  const populateForm = () => {
  setName(repodetails.name);
  setDescription(repodetails.description);
  }
  populateForm()
}, [repodetails])
const editfunc = async (e) => {
  e.preventDefault();
  

  await octokit.request('PATCH /repos/{owner}/{repo}', {
    owner: 'oyedelehabeeb',
    repo: repodetails.name,
    name: name,
    description: description,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  alert("repo updated successfully!");
  navigate('/')

}

  return (
    <div className="repo-details">
        <div className='w-4/5 pb-3 border-b repo-details-heading'>
            <div className='flex gap-2'>
                <div className='user-avatar h-6 w-6'>
                    {/* <img className='user-image' src = {userAvatar} alt='user-repo-avatar' /> */}
                </div>
                <div className='repo-title'>
                    <h3 className="text-lg font-semibold text-blue-600">{repodetails.name}</h3>
                </div>
                <div className='repo-visibility border rounded-full px-2  text-xs'>
                    <p className='leading-none mt-1'>{repodetails.visibility}</p>
                </div>
            </div>
        </div>
        <div className='repo-desc w-4/5 border'>
          <div className='flex gap-4'>Repo description: {repodetails.description === null ? (<div><h3>None</h3></div>) : (
            <div><h3>{repodetails.description}</h3></div>
          )}</div>
          <div className='mt-3'>
            <h3>Date created: {repodetails.created_at}</h3>
          </div>
          <div className='mt-3'>
            <h3>Last updated: {repodetails.updated_at}</h3>
          </div>
          <div className='mt-3'>
            <h3>Visibility: {repodetails.visibility}</h3>
          </div>
          <div className='flex gap-4 mt-3'>Language: {repodetails.language === null ? (<div><h3>None</h3></div>) : (
            <div><h3>{repodetails.language}</h3></div>
          )}</div>
        </div>
        <div className='delete-repo flex justify-center mt-6'>
          <button className='w-40 h-10 bg-red-600' onClick={deleterepoFunc}>
            <p className='text-white'>Delete Repository</p>
          </button>
        </div>
        <ToastContainer />
        <div className='delete-repo flex justify-center mt-6' onClick={() => setPostModal(!postmodal)}>
          <button className='w-40 h-10 bg-green-600'>
            <p className='text-white'>Edit Repository</p>
          </button>
        </div>
        {postmodal && 
        <div className='modal-edit-main w-3/5 mt-10 bg-gray-200 py-6 px-4 rounded-3xl'>
          <div className="cancel-button">
              <p onClick={() => setPostModal(false)} className="text-red-600 cancel-btn"> X </p>
          </div>
          <div className='edit-modal'>
            <form className="mt-10">
              <div className="repo-title repo-input flex gap-3">
                  <label>Edtit Title</label>
                  <input className='border mr-3' type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}/>
              </div>
              <div className="repo-description mt-3 flex gap-3">
                  <label>Edit description</label>
                  <input className='border' type="text" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)}/>
              </div>
              <button className="h-10 w-20 bg-green-400 mt-8 " type="submit" onClick={editfunc}>
                  <p className="text-xs">Edit repository</p>
              </button>
            </form>
          </div>
        </div>}
        
    </div>
  )
}

export default Repo