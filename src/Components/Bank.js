import React, { useState, useEffect } from 'react';
import { Container, Table, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

const baseApiUrl = 'https://api.concreap.com/api/resource/v1'
const config = {
    headers: {
        lg: 'en',
        ch: 'web',
        ContentType: 'application/json'
    }
}

const Bank = () => {

    const [loading, setLoading] = useState(false);
    const [allBanks, setAllBanks] = useState([])
    const [banks, setBanks] = useState([])
    const [newBanks, setNewBanks] = useState([])



    const getBanks = async () => {
        setLoading(true)
        await axios.get(`${baseApiUrl}/banks?limit=9999`, config)
            .then((resp) => {
                console.log(resp.data)

                if (resp.data.error === false && resp.data.status === 200) {
                    setAllBanks(resp.data.data);

                    const sort = allBanks.sort((a, b) => (a.name > b.name) * 2 - 1);

                    setBanks(sort);

                }
                setLoading(false)
            }).catch((err) => {
                console.log(err.response.data.errors)
                setLoading(false)
            });


    }

    const searchBank = (e) => {
        if (e.target.value !== '') {
            let currList = banks
            let newList = currList.filter((b) => {
                const searchResult = e.target.value.toLowerCase()
                const bnk = b.name.toLowerCase()

                if (bnk.includes(searchResult)) {
                    return bnk.includes(searchResult)
                }
            })

            if (newList.length > 0) {
                setNewBanks(newList)
            } else {
                setNewBanks(currList)
            }
        } else {
            setNewBanks([])
        }
    }


    useEffect(() => {
        getBanks()
    }, [])

    return (
        <>
            <div className="bank-box">

                <Container>

                    <Row className="justify-content-center align-items-center">
                        {
                            loading &&
                            <>
                                <h1 className='text-center'>Loading...</h1>
                            </>
                        }

                        {
                            !loading && allBanks.length <= 0 &&
                            <><h1 className="text-center">Sorry No banks available</h1></>
                        }

                        {
                            !loading && allBanks.length > 0 &&

                            <>
                                <Row className="justify-content-center align-items-center">
                                    <Col md={2}>
                                        <h1>Search</h1>
                                    </Col>
                                    <Col md={5}>
                                        <div className='form' onSubmit={(e) => e.preventDefault()}>
                                            <input type="text" className='form-control' placeholder='find bank' onChange={(e) => searchBank(e)} />
                                        </div>
                                    </Col>
                                </Row>


                                <Card className="bank-box">
                                    <Table striped border hover>
                                        <thead className='bg-secondary text-white'>
                                            <tr>
                                                <th>#</th>
                                                <th>Code</th>
                                                <th>Country</th>
                                                <th>Name</th>
                                                <th>Currency</th>
                                                <th>Type</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                newBanks.length > 0 && (banks.length > 0 || banks.length <= 0) &&
                                                newBanks.map((b, i) => (
                                                    <>
                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{b.code}</td>
                                                            <td>{b.country}</td>
                                                            <td>{b.name}</td>
                                                            <td>{b.currency}</td>
                                                            <td>{b.type}</td>
                                                        </tr>
                                                    </>
                                                ))
                                            }

                                            {
                                                newBanks.length <= 0 &&
                                                banks.map((b, i) => (
                                                    <>
                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{b.code}</td>
                                                            <td>{b.country}</td>
                                                            <td>{b.name}</td>
                                                            <td>{b.currency}</td>
                                                            <td>{b.type}</td>
                                                        </tr>
                                                    </>
                                                ))
                                            }
                                            <tr>

                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card>

                            </>
                        }

                    </Row>

                </Container>
            </div>

        </>
    )
}

export default Bank


