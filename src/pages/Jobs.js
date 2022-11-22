import React, {useState} from "react";
import "./JobsStyle.css"
import InfiniteScroll  from 'react-infinite-scroller'
import moment from "moment";

export default function Jobs() {
    let [listJob, setListJob] = useState([]);
    let [filterLocation, setFilterLocation] = useState("");
    let [filterDescription, setFilterDescription] = useState("");
    let [filterFullTime, setFilterFullTime] = useState(false);
    let [onSearch, setOnSearch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMoreItems, setHasMoreItems] = useState(true);

    const getDataJobs = async (page) => {
        setLoading(true)
        setTimeout(async () => {
            let url = `${process.env.REACT_APP_BASE_URL}/positions.json?page=${page}`;
            try {
                let response = await fetch(url)
                response = await response.json()
                if (response) {
                    setPage(page + 1);
                    listJob.push(...response);
                    setListJob(listJob);
                }

                if (response.length === 0) setHasMoreItems(false);
                else setHasMoreItems(true);
                setLoading(false);
            } catch (e) {
                alert(e);
                setLoading(false);
                setHasMoreItems(false);
            }
        }, 2000);
    }

    const getFilterDataJobs = async () => {
        setOnSearch(true);
        setLoading(true);
        let url = `${process.env.REACT_APP_BASE_URL}/positions.json?description=${filterDescription}&location=${filterLocation}&full_time=${filterFullTime}`;
        try {
            let response = await fetch(url)
            response = await response.json()
            if (response) setListJob(response);
            setLoading(false);
        } catch (e) {
            alert(e);
            setLoading(false);
            setOnSearch(false);
        }
    }

    return (
        <>
            <div className={"content"}>
                <div className={"display-flex"} style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                    <div className={"width-35 padding-5px"}>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <label className={"text-12 text-bold"}>Job Description</label>
                            <input placeholder={"Filter by title"} onChange={(event) => setFilterDescription(event.target.value)} />
                        </div>
                    </div>
                    <div className={"width-35 padding-5px"}>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <label className={"text-12 text-bold"}>Location</label>
                            <input placeholder={"Filter by city"} onChange={(event) => setFilterLocation(event.target.value)} />
                        </div>
                    </div>
                    <div className={"width-15 padding-5px"} style={{marginTop: 10}}>
                        <input type={"checkbox"} onChange={() => setFilterFullTime(!filterFullTime)} /> <span className={"text-12 text-bold"}>Full Time Only</span>
                    </div>
                    <div className={"width-10 padding-5px"} style={{marginTop: 10}}>
                        <div className={"btn-search text-white text-center text-12"} onClick={() => getFilterDataJobs()}>Search</div>
                    </div>
                </div>
            </div>
            <div className={"content"}>
                <div className={"job-list"}>
                    <h3 className={"text-dark-blue"}>Job List</h3>
                    <hr style={{border: "0.5px solid lightgray"}} />
                    {loading && listJob?.length === 0 ? <div style={{padding: 20, textAlign: "center", fontSize: 20}}>
                        <i className="fas fa-spinner fa-pulse"></i>
                    </div> :
                        <InfiniteScroll
                            threshold={0}
                            pageStart={0}
                            loadMore={() => !onSearch && getDataJobs(page)}
                            hasMore={!onSearch && hasMoreItems}
                            loader={!onSearch && <div style={{padding: 20, textAlign: "center", fontSize: 20}}>
                                <i className="fas fa-spinner fa-pulse"></i>
                            </div>}>
                            {listJob?.length > 0 ?
                                listJob?.map((item, index) => {
                                    var current = moment();
                                    var created = moment(item?.created_at);
                                    let diff = current.diff(created, 'days');
                                return (
                                    <div className={"text-13 text-gray padding-5px"} key={index} style={{cursor: "pointer"}} onClick={() => window.location.assign(`/jobs/${item?.id}`)}>
                                        <div className={"display-flex"}>
                                            <div style={{width: "50%"}}>
                                                <div className={"text-blue text-bold"}>{item?.title}</div>
                                                <div className={"padding-5px-0px"}>{item?.company} - <span className={"text-bold text-green"}>{item?.type}</span></div>
                                            </div>
                                            <div style={{width: "50%", textAlign: "right"}}>
                                                <div className={"text-bold"}>{item?.location}</div>
                                                <div className={"padding-5px-0px"}>about {diff > 365 ? `${(diff / 365).toFixed(1)} years` : `${diff} months`} ago</div>
                                            </div>
                                        </div>
                                        <hr style={{border: "0.5px solid lightgray"}} />
                                    </div>
                                    )
                                }) : <div style={{padding: 20, textAlign: "center"}}>
                                    <div className={"text-12 text-gray"}>No data found</div>
                                </div>
                            }
                    </InfiniteScroll>
                    }
                </div>
            </div>
        </>
    )
}
