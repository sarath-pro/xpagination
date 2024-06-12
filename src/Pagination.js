import React, {useState, useEffect} from 'react'
import './Pagination.css'

export default function Pagination() {
    const [page, setPage] = useState(0);
    const [data, setData] = useState([]);

    const previous = () => {
        if(page>0) {
            setPage((prev)=>(prev-1))
        }
    }

    const next = () => {
        if(page<4) {
            setPage((prev)=>(prev+1))
        }
    }

    useEffect(()=>{
        const url = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
        async function fetchData() {
            try {
                let response = await fetch(url)
                let data = await response.json()
                console.log(data)
                setData(data)
                alert('fetched data')
            } catch(error) {
                console.log(error)
                alert('Failed to fetch data')
            }
        }
        fetchData()
    }, [])
    const start = page*10+1
    const end = page*10+10

    const pagedData = data.filter((item) => (Number(item.id)>=start && Number(item.id)<=end))

    return (
        <div className='container'>
            <h2>Employee Data Table</h2>
            <table>
                <thead>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </thead>
                <tbody>
                    {
                        pagedData.map((item)=>(
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className='paginate'>
                <button onClick={previous}>Previous</button>
                <div>{page+1}</div>
                <button onClick={next}>Next</button>
            </div>

        </div>
    )
}