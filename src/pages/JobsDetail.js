import React, {useEffect, useState} from "react";
import "./JobsStyle.css"
import parse from 'html-react-parser';

export default function JobsDetail() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getDataJobsDetail()
    }, [])

    const getDataJobsDetail = async () => {
        setLoading(true)
        let id = window.location.pathname.replace("/jobs/", "")
        let url = `${process.env.REACT_APP_BASE_URL}/positions/${id}`
        try {
            let response = await fetch(url)
            response = await response.json()
            if (response) {
                setData(response)
            }
            setLoading(false)
        } catch (e) {
            alert(e)
            setLoading(false)
        }
    }

    return (
        <>
            <div className={"content"}>
                <div className={"text-12 text-bold text-blue padding-10px"} style={{cursor: "pointer"}} onClick={() => window.location.assign("/jobs")}>
                    <i className="fas fa-long-arrow-alt-left" style={{marginRight: 5}}></i> Back
                </div>
                <div className={"job-list-detail"}>
                    {loading ? (
                            <div style={{padding: 20, textAlign: "center", fontSize: 20}}>
                                <i className="fas fa-spinner fa-pulse"></i>
                            </div>
                        ) :
                    data ? (
                        <>
                            <div className={"text-12 text-gray"}>{data?.type} / {data?.location}</div>
                            <h3 className={"margin-5px-0px text-dark-blue"}>{data?.title}</h3>
                            <hr style={{border: "0.5px solid lightgray"}} />
                            <div className={"display-flex"}>
                                <div className={"width-65"}>
                                    <div>{parse(data?.description)}</div>
                                </div>
                                <div className={"width-5"}></div>
                                <div className={"width-30"}>
                                    <div className={"card-company"}>
                                        <div className={"display-flex padding-10px-10px-0px"} style={{alignItems: "center"}}>
                                            <div className={"width-65"}>
                                                <div className={"text-12 text-bold"}>{data?.company}</div>
                                            </div>
                                            <div className={"width-35 other"}>
                                                <div className={"text-11 text-blue text-bold"}><i className="fas fa-long-arrow-alt-up text-11" style={{marginRight: 5}}/> Other Job</div>
                                            </div>
                                        </div>
                                        <hr style={{border: "0.5px solid lightgray"}} />
                                        <object data="https://images.unsplash.com/photo-1462206092226-f46025ffe607?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=210&q=80" type="image/png" style={{padding: "5px 10px"}}>
                                            <img src={data?.company_logo} alt={"Company Logo"} />
                                        </object>
                                        <div className={"text-12 text-gray padding-0px-10px-10px"}><a href={data?.company_url}> {data?.company_url}</a></div>
                                    </div>
                                    <div className={"card-apply"}>
                                        <div className={"text-12 text-bold padding-10px-10px-0px"}>How to apply</div>
                                        <hr style={{border: "0.5px solid lightgray"}} />
                                        <div className={"text-12 text-gray padding-0px-10px-10px"}>{parse(data?.how_to_apply)}</div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                            <div style={{padding: 20, textAlign: "center"}}>
                                <div className={"text-12 text-gray"}>No data found</div>
                            </div>
                        )}
                </div>
            </div>
        </>
    )
}
