import { useState, useEffect } from "react";
import Repos from "../components/repos";
import CreateRepo from "../components/createRepo";

const Home = () => {
    const [postmodal, setPostModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetchGitHubRepositories();
    }, []);

    const fetchGitHubRepositories = async () => {
        // Fetch repositories from GitHub API
        const response = await fetch(`https://api.github.com/oyedelehabeeb/repos`);
        const repositories = await response.json();
        setData(repositories);
    };

    useEffect(() => {
        if (!Array.isArray(data)) {
            setFilteredData([]);
            return;
        }

        const filtered = data.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchTerm, data]);

    return (
        <div>
            <div className="search-div">
                <input
                className="search-input"
                    type="text"
                    placeholder="Search repositories"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <button className="search-btn" onClick={() => setSearchTerm('')}>Search</button>
                <div>
                    <ul>
                        {filteredData.map(item => (
                            <li key={item.id}>{item.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex justify-center mt-10">
                <div onClick={() => setPostModal(!postmodal)}>
                    <button className='w-40 h-10 bg-green-600'>
                        <p className='text-white'>Create new Repository</p>
                    </button>
                </div>
                {postmodal && <CreateRepo setPostModal={setPostModal} />}
            </div>
            <div className="mt-6">
                <Repos />
            </div>
        </div>
    );
};

export default Home;
