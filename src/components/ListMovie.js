import { useEffect, useState } from "react";
import { Button, Card, Col, Dropdown, Input, Modal, Row } from "antd";
import { fetching } from "./api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion"
import { movieGenreFilter, shortdesc } from "./commonFunc";


export const ListMovie = () => {
    //List & Card Module
    const { Meta } = Card;
    const url = "https://api.themoviedb.org/3/"

    const [posts, setPosts] = useState([]);
    const [count, setCount] = useState(2);
    const [onSearch, setOnSearch] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    useEffect(() => {
        async function fetchData() {
            try {
                await fetching(url + "discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc")
                    .then((data) => {
                        return setPosts(data.results);
                    })
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    const loadMore = () => {
        if (!onSearch) {
            async function fetchData() {
                try {
                    await fetching(url + `discover/movie?include_adult=false&include_video=false&language=en-US&page=${count}&sort_by=popularity.desc`)
                        .then((data) => {
                            const newArr = posts.concat(data.results);
                            return setPosts(newArr)
                        })
                } catch (err) {
                    console.log(err);
                }
            }
            fetchData();
            setCount(count + 1)
        }
        else {
            //load more searched movies
            async function fetchData() {
                try {
                    await fetching(url + `search/movie?query=" + ${searchValue} + "&include_adult=false&language=en-US&page=${count}`)
                        .then((data) => {
                            const newArr = posts.concat(data.results);
                            return setPosts(newArr)
                        })
                } catch (err) {
                    console.log(err);
                }
            }
            fetchData();
            setCount(count + 1)
        }
    }


    //Search Module
    const OnSearch = (value) => {
        setSearchValue(value)
        setPosts([])
        if (value !== "") {
            setCount(2)
            setOnSearch(true)
            async function fetchData() {
                try {
                    await fetching(url + "search/movie?query=" + value + "&include_adult=false&language=en-US&page=1")
                        .then((data) => {
                            return setPosts(data.results);
                        })
                } catch (err) {
                    console.log(err);
                }
            }
            fetchData();
        }
        else {
            setCount(2)
            setOnSearch(false)
            async function fetchData() {
                try {
                    await fetching(url + "discover/movie")
                        .then((data) => {
                            return setPosts(data.results);
                        })
                } catch (err) {
                    console.log(err);
                }
            }
            fetchData();
        }

    };

    //Modal Module
    const [detail, setDetail] = useState({})
    const [open, setOpen] = useState(false);

    const handleCancel = () => {
        setOpen(false);
    };

    const openModal = (param) => {
        setDetail(param);
        setOpen(true)
    }

    const sortYear = (param) => {
        switch (param) {
            case "asc": return setPosts(posts.sort((a, b) => a.year - b.year));
            case "desc": return setPosts(posts.sort((a, b) => b.year - a.year));
            default: break;
        }
    }

    const onClick = ({ key }) => {
        sortYear(key)
    };
    const items = [
        {
            label: 'Ascending',
            key: 'asc',
        },
        {
            label: 'Descending',
            key: 'desc',
        },
    ];

    return (
        <div>
            <Modal
                centered
                open={open}
                onCancel={() => handleCancel(false)}
                style={{ top: -80 }}
                width={window.innerWidth < 450 ? "300px" : "600px"}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Close
                    </Button>,
                ]}
            >
                <div style={{
                    margin: "auto",
                    width: window.innerWidth > 600 ? "40%" : "80%"
                }}>
                    <LazyLoadImage alt="no img" src={detail.backdrop_path} />
                </div>
                <div style={{ textAlign: "center" }}>
                    <h3>{detail.title} <br /><strong>({detail.year})<br /></strong> </h3>

                    <span>Genre: {detail.genre}</span> <br />
                    <span>Rating: {detail.vote_average}</span>
                </div>
                <h3 dir="auto">Overview</h3>
                <p>{detail.overview}</p>
            </Modal>

            <div style={{ padding: "1rem 5rem", }}>
                <Row between="xs">
                    <Col xs={24} lg={8} />
                    <Col xs={24} lg={8} />
                    <Col xs={24} lg={8}>

                        <Row style={{ justifyContent: "flex-end", display: "flex" }}>
                            <Input.Search
                                placeholder="search movies"
                                onSearch={OnSearch}
                                enterButton
                                style={{ width: "200px", padding: "12px 0" }}
                            />
                        </Row>
                        <Row style={{ justifyContent: "flex-end", display: "flex" }} >
                            <Dropdown
                                menu={{
                                    items,
                                    onClick,
                                }}
                            >
                                <Button onClick={(e) => e.preventDefault()}>
                                    Filter Year by
                                </Button>
                            </Dropdown>
                        </Row></Col>
                </Row>
            </div>
            <div style={{ padding: "0 8rem", }}>

                <h3 style={{ textAlign: "left" }}>{onSearch ? "Search Result : " : "Discover"}</h3>
                <Row gutter={[24, 24]}
                    align="middle"
                    style={{
                        marginLeft: "2vw",
                        marginRight: "auto"
                    }}
                >
                    {posts && posts.map((data, i) => {
                        data.year = data.release_date.substring(0, 4);
                        if (data.vote_average === 0) {
                            data.vote_average = "no rating"
                        }

                        data.genre = movieGenreFilter(data)
                        if (data.backdrop_path === null || data.backdrop_path === "") { data.backdrop_path = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png" }
                        else {
                            data.backdrop_path = `https://www.themoviedb.org/t/p/w220_and_h330_face/${data.backdrop_path}`
                        }

                        const containedData = data
                        return (
                            <Col key={i}>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ ease: "easeIn" }}
                                    animate={{ opacity: [0, 1], x: [-100, 0] }}
                                    viewport={{ once: true }}
                                >
                                    <Card
                                        hoverable
                                        style={{
                                            width: "240px",
                                            minHeight: "499px"
                                        }}
                                        cover=
                                        {<LazyLoadImage alt="no image" src={data.backdrop_path} onClick={() => { openModal(containedData) }} />}

                                    // {data.backdrop_path !== null ?
                                    //     <LazyLoadImage alt="no image" src={"https://www.themoviedb.org/t/p/w220_and_h330_face/" + data.backdrop_path} onClick={() => { openModal(containedData) }} />
                                    //     : <LazyLoadImage alt="no image" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png"} onClick={() => { openModal(containedData) }} />}
                                    >
                                        <Meta title={data.title} />
                                        <Meta title={data.year} description={shortdesc(data) + " ..."} />
                                    </Card>
                                </motion.div>
                            </Col>)
                    })}
                </Row>

                <motion.div
                    whileHover={{ opacity: 0.8 }}
                >
                    {posts && (<Button onClick={() => { loadMore() }}>Load more</Button>)}
                </motion.div>
            </div>

        </div>);
}

export default ListMovie;